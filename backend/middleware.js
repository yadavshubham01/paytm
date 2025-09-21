
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

    // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startwith('Bearer ')){
    //    return res.status(411).json({
    //      msg:'authorization failed'
    //    })
    // }

    // const token = authHeader.spilt('')[1];
    // try{
    //     const decoded = jwt.verify(token,JWT_SECRET);
        
    //     req.userId = decoded.userId;
    //     next();
    // }catch(e){
    //    return res.status(403).json({
    //      msg:"authorization is failed"
    //    })
    // }
};


module.exports ={
    authMiddleware
}