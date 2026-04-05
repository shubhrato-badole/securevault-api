// import express from "express";
// import bodyParser from "body-parser";
// import pg from "pg";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import helmet from "helmet";
// import {z} from "zod" ;



// dotenv.config();
//  const port = 3000;
//  const app = express();
//  const saltRound= 10;
// app.use(helmet());
 
// app.use(cookieParser());

//  app.use(cors({
//     origin : "http://localhost:5173",
//     credentials: true
//  }));

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// const db = new pg.Client ({
// user: "postgres",
// host:"localhost",
// database:"keeper",
// password:"782090@Sb",
// port:5432,
// });

// // db.connect();
// await db.connect();
//  console.log("✅ DB CONNECTED")

//  await db.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     email TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     refreshToken TEXT
//   );
// `);
    


// async function creatingAccessTokenAndRefreshToken (user){

// const accessToken = jwt.sign({userId: user } ,
//    process.env.ACCESS_JWT_SECRET,
//     {expiresIn: "7d"}
// )

// const refreshToken = jwt.sign({userId: user } ,
//    process.env.REFRESH_JWT_SECRET,
//     {expiresIn: "7d"}
// )

// await db.query(
//   "UPDATE users SET refreshToken = $1 WHERE id = $2",
//   [refreshToken, user] )

//  return {refreshToken, accessToken};
// }


// //mideleware for rate limitign 


//     const rateLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // limit each IP to 100 requests per windowMs
//     handler : (req, res) => 
//         res.status(429).json({
//             success: false,                 
//     message: "Too many requests from this IP, please try again later."
//         })
// });



// // middelware to verify token





// async function AuthenticateToken(req ,res, next){
//     const accessToken = req.cookies.accessToken

//     if (!accessToken){
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized"
//         })
//     }

// try{
//     const decode = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
//    req.user = decode.userId;
//     next();
// }catch (err){       
     
//     const refreshToken = req.cookies.refereshtoken;
//     if (!refreshToken){
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized"
//         })
//     }

//     try{
//         const decode= jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
//         const userId = decode.userId;

// const result = await db.query("SELECT refreshToken FROM users WHERE id = $1",
//   [userId]);
      
//   const storedRefreshToken = result.rows[0]?.refreshtoken;


//        if (storedRefreshToken.rows.refreshToken !== refreshToken){
//         return res.status(401).json({
//             success: false,
//             message: "the refresh token is expired or invalid login again"
//         })
//        }

//         const accessToken = jwt.sign({userId: userId} ,
//          process.env.ACCESS_JWT_SECRET,
//         {expiresIn: "1h"}
// )

// res.cookie("accessToken" , accessToken ,{
//     httpOnly: true,
//     secure: false, // Set to true in production with HTTPS
//     sameSite: "lax",
// })

// req.user = userId;
// next();


//     } catch(err){
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized"
//         })
// }
 
// }
// }



// // midelware input validation 
// const inputValidation = z.object({
//     email: z.string().trim().email({message:"entere valid eamil"}).max(100),
//    password : z.string().trim().min(4 , {message:"the password should be min 8 character"} ).max(100),

// });


// // register 




// app.post("/api/register",rateLimiter, async(req, res) =>{

//     const result =inputValidation.safeParse(req.body)

//     if (!result.success){
//         const message = result.error?.errors?.[0]?.message
//         return res.status(401).json ({
//             success: false,
//          message :message
//         })
//     }

//     const { email ,password }= result.data;
   
// try{
//     const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

//     if (result.rows.length > 0){
//        return  res.status(400).json({
//         success: false,
//         message: "user alredy exists"
//         })
//     } else {
//         bcrypt.hash(password, saltRound , async (err, hash) =>{
//             if (err){
//                console.error("Error hashing password:", err);
//             }
//             else{
//                const result = await db.query( "INSERT INTO users ( email ,password) VALUES ($1 , $2 )",[email, hash])
//                res.status(200).json({
//                 success: true,
//                 message: "user registered successfully"
//                })
//             }
//         })
//     }
// } catch (err){
//     console.log(err)
//      res.status(500).json({ message: "Server error" });

// }
// });



// // login 



// app.post("/api/login", rateLimiter, async (req, res) => {

//     const result =inputValidation.safeParse(req.body)

//     if (!result.success){
//         const message = result.error?.errors?.[0]?.message
//         return res.status(401).json ({
//             sucess: false,
//          message :message
//         })
//     }

//     const { email ,password }= result.data;
//      console.log(result.data);

//     try{
//    const result = await db.query("SELECT * FROM users WHERE email = $1", [email])

//    if (result.rows.length === 0){
//     return res.status(404).json({
//         success: false,
//         message: "user not found"
//     })
//    }
//     const user = result.rows[0]; 
    
//     if(user.lockuntil && user.lockuntil > new Date()){
//         return res.status(403).json({
//             success: false,
//             message: "Account is locked. Please try again later."
//         })
//     }


//     const valid= await bcrypt.compare(password, user.password);


//     if (!valid){
//         const failedAttempts = user.failedattempts + 1;
//         let lockUntil = null;

//         if (failedAttempts >= 5){
//             lockUntil = new Date(Date.now() + 15 * 60 * 1000);
//         }

//         await db.query("UPDATE users SET failedAttempts = $1, lockUntil = $2 WHERE id = $3",
//          [failedAttempts, lockUntil, user.id]); 

//         return res.status(401).json({
//             success: false,
//             message: "Incorrect password"
//         })
//     }

//     await db.query("UPDATE users SET failedAttempts = 0, lockUntil = null WHERE id = $1", [user.id]);

//     // if (!valid){
//     //     return res.status(401).json({
//     //         success: false,
//     //         message: "Incorrect password"
//     //     })
//     // } 

//     // creating jwt 
// const {refreshToken, accessToken} = await creatingAccessTokenAndRefreshToken(user.id)
//     // creating jwt 

// res.cookie("accessToken" , accessToken ,{
//     httpOnly: true,
//     secure: false, // Set to true in production with HTTPS
//     sameSite: "lax",
// })

// res.cookie("refreshToken" , refreshToken ,{
//     httpOnly: true,
//     secure: false, // Set to true in production with HTTPS
//     sameSite: "lax",
// })


// return res.status(200).json({
//   success: true,
//   message: "Login successful"
// })
// } catch (err){
//     console.log(err);
//      res.status(500).json({ message: "Server error" });
// }
// })

// // logout 

// app.post("/api/logout", async (req, res) => {
//   res.clearCookie("accessToken"); 
//   res.clearCookie("refreshToken");

//   // or accessToken if you rename it

//   return res.status(200).json({
//     success: true,
//     message: "Logged out successfully"
//   });
// });


// // checking if user have an token and for authetication for secure route 

// app.get("/api/me" , AuthenticateToken, (req, res) => {
//     return res.status(200).json({
//         success: true,
//         message: "User is authenticated"
//     })
// })

// app.get("/api/notes/", AuthenticateToken, async (req, res) => {
//    const userid = req.user;
//     try{
//         const result = await db.query("SELECT * FROM notes where  user_id = $1 ", [userid]);
//         return res.status(200).json(result.rows);
//     }catch(err){
//         console.error("Error fetching notes:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// });




// app.post("/api/notes" , AuthenticateToken,async (req ,res) => {
// const {title, content } =req.body;
//  const userId = req.user;

//     try{
//         const result = await db.query("INSERT INTO notes (title, content , user_id) VALUES ($1 , $2 ,$3) RETURNING *" ,[title , content , userId]);
//         return res.status(200).json(result.rows[0]);

//     } catch(err){
//         console.error("Error creating note:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// })





// app.delete("/api/notes/:id", AuthenticateToken, async (req, res) => {
//     const {id}= req.params;

//     try{
//         const result = await db.query("DELETE FROM notes WHERE id =$1", [id]);
//         return res.status(200).json({ message: "Note deleted successfully" });

//     }catch(err){
//         console.error("Error deleting note:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// })







// app.get("/api/todo", AuthenticateToken,async (req, res) => {
//     const userid = req.user;

//     try{
//         const result = await db.query("SELECT * FROM list WHERE user_id = $1" , [userid]);
//         return res.status(200).json(result.rows);
//     } catch (err){
//         console.error("Error fetching todo list:", err);
//         return res.status(500).json({ message: "Server error" });
//     }
// })






// app.post("/api/todo" ,AuthenticateToken, async(req ,res)=>{
//     const {item } =req.body;
//     const userId = req.user;
  
//     try{
//         const result = await db.query("INSERT INTO list (item , user_id) vALUES ($1 ,$2) RETURNING *",[item, userId]);
// return res.status(200).json(result.rows[0]);
//     } catch(err){
//         console.error("Error creating todo item:", err);
//         return res.status(500).json({ message: "Server error" });
//      }
// }); 




// app.delete("/api/todo/:id", AuthenticateToken, async (req, res)=>{
//    const {id } = req.params;
//    try{
//     const result = await db.query("DELETE FROM list WHERE id=$1", [id]);
//     return res.status(200).json({ message: "Todo item deleted successfully" });     
//    } catch(err){
//     console.error("Error deleting todo item:", err);
//     return res.status(500).json({ message: "Server error" });
// }
// })





// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });