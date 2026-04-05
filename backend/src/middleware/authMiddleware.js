import jwt from "jsonwebtoken"
import db from "../datbase.js"



  export const AuthenticateToken = async  (req ,res, next) =>{
    const accessToken = req.cookies.accessToken;
  
    if (!accessToken){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

try{
    const decode = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
   req.userId = decode.userId;
    next();
}catch (err){       
     
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try{
        const decode= jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
        const userId = decode.userId;

const result = await db.query("SELECT refreshToken FROM users WHERE id = $1",
  [userId]);
      
  const storedRefreshToken = result.rows[0]?.refreshtoken;


       if (storedRefreshToken !== refreshToken){
        return res.status(401).json({
            success: false,
            message: "the refresh token is expired or invalid login again"
        })
       }

        const accessToken = jwt.sign({userId: userId} ,
         process.env.ACCESS_JWT_SECRET,
        {expiresIn: "1h"}
)

res.cookie("accessToken" , accessToken ,{
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
})

req.user = userId;
next();


    } catch(err){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
}
 
}
}