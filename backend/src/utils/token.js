import jwt from "jsonwebtoken"
import db from "../datbase.js"



export const generateTokens = async (user) => {

const accessToken = jwt.sign({userId: user } ,
   process.env.ACCESS_JWT_SECRET,
    {expiresIn: "7d"}
)

const refreshToken = jwt.sign({userId: user } ,
   process.env.REFRESH_JWT_SECRET,
    {expiresIn: "7d"}
)

await db.query(
  "UPDATE users SET refreshToken = $1 WHERE id = $2",
  [refreshToken, user] )

 return {refreshToken, accessToken};
}


