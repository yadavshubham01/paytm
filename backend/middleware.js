
const { JWT_SECRET } =require("./confiq");
const jwt=require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
    const authHeader=req.headers.authorization;

 
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(411).json({
            msg:'authorization failed'
        });
    }

    const token=authHeader.split(' ')[1];

    try{
        const decoded =jwt.verify(token,JWT_SECRET);

        req.userId= decoded.userId;

       next();

    }catch(err){
        return res.status(403).json({
             msg:"authorization is failed"
        });
    }
};


module.exports ={
    authMiddleware
}