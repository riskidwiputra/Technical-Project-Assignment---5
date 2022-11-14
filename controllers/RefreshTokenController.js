 import jwt from "jsonwebtoken"
 import cookieParser from "cookie-parser";
 import Users from "../model/userModel.js";


 export const RefreshToken = async (req,res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.find({where : {refresh_token : refreshToken}});
        if(!user) return res.sendStatus(403)
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,decode) => {
            if(err) return res.sendStatus(403)
            const user_id   = user.id;
            const email     = user.email;
            const name      = user.name; 
            const accessToken = jwt.sign({user_id,email,name},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn : '60s'
            })
            res.json(accessToken);
        });    
     } catch (error) {
        console.log(error)
        
     }
 }
