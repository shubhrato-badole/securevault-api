import bcrypt from "bcrypt"
import db from "../datbase.js"
import {generateTokens} from "../utils/token.js"


export const register = async (req, res) =>{
    const { email ,password }= req.body;
   
try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0){
       return  res.status(400).json({
        success: false,
        message: "user alredy exists"
        })
    } else {
        bcrypt.hash(password, 10 , async (err, hash) =>{
            if (err){
               console.error("Error hashing password:", err);
            }
            else{
               const result = await db.query( "INSERT INTO users ( email ,password) VALUES ($1 , $2 )",[email, hash])
               res.status(200).json({
                success: true,
                message: "user registered successfully"
               })
            }
        })
    }
} catch (err){
    console.log(err)
     res.status(500).json({ message: "Server error" });

}
};







export const login = async (req, res) => {

    const { email ,password }= req.body;
     

    try{
   const result = await db.query("SELECT * FROM users WHERE email = $1", [email])

   if (result.rows.length === 0){
    return res.status(404).json({
        success: false,
        message: "user not found"
    })
   }
    const user = result.rows[0]; 
    
    if(user.lockuntil && user.lockuntil > new Date()){
        return res.status(403).json({
            success: false,
            message: "Account is locked. Please try again later."
        })
    }


    const valid= await bcrypt.compare(password, user.password);


    if (!valid){
        const failedAttempts = user.failedattempts + 1;
        let lockUntil = null;

        if (failedAttempts >= 5){
            lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        }

        await db.query("UPDATE users SET failedAttempts = $1, lockUntil = $2 WHERE id = $3",
         [failedAttempts, lockUntil, user.id]); 

        return res.status(401).json({
            success: false,
            message: "Incorrect password"
        })
    }

    await db.query("UPDATE users SET failedAttempts = 0, lockUntil = null WHERE id = $1", [user.id]);

    // if (!valid){
    //     return res.status(401).json({
    //         success: false,
    //         message: "Incorrect password"
    //     })
    // } 

    // creating jwt 
const {refreshToken, accessToken} = await generateTokens(user.id)    // creating jwt 

res.cookie("accessToken" , accessToken ,{
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
})

res.cookie("refreshToken" , refreshToken ,{
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
})


return res.status(200).json({
  success: true,
  message: "Login successful"
})
} catch (err){
    console.log(err);
     res.status(500).json({ message: "Server error" });
}
}


export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ message: "Logged out" });
};



export const me = (req, res , next ) => {
    const userId = req.userId;
  res.json({ message: "User authenticated" });
};