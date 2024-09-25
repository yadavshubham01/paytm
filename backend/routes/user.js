const express =require('express');
const zod=require('zod');
const { User, Account } =require("../db");
const { JWT_SECRET } = require('../confiq');
const jwt =require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const router=express.Router();


const signupSchema=zod.object({
     username: zod.string().email(),
     password:zod.string(),
     firstname:zod.string(),
     lastname:zod.string(),
});

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

const updateBody=zod.object({
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
});
router.post('/signup', async(req,res) =>{
    
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"Email already taken / Incorrect inputs"
        })
    }

    const existindUser=await User.findOne({
        username: req.body.username
    })


    if(existindUser){
        return res.status(411).json({
            msg:"Email already taken/Incorrect inputs"
        })
    }

    const user=await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
    })

    const userId=user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
 
    const token =jwt.sign({
        userId
    },JWT_SECRET);


    res.json({
        msg:"User created successfully",
        token
    })
})


router.post("/signin",async(req,res) => {
    

    const { success }=signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Incorrect inputs"
        })
    }

    const user =await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token
        })

        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})


router.put("/user", authMiddleware ,async(req,res) =>{
   const { success }=updateBody.safeParse(req.body);

   if(!success){
    res.status(411).json({
        msg:"Error while udating inforamtion"
    })
   }

   await User.updateOne(req.body,{
    _id:req.userId
   })

   res.json({
    msg:"Update Successfully"
   })
})

router.get("/bulk",async(req,res) => {
    const filter =req.query.filter || "";

    const users =await User.find({
        $or: [{
            firstname:{
                "$regex":filter
            }
        },{
            lastname: {
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user =>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id,
        }))
    })
})

module.exports=router;



//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmNmNWFmMjc1NWE3Y2RmNWU1OTQ2NzIiLCJpYXQiOjE3MjQ4NjUyNjZ9.eRbp0lzWE6AybsR4_LWcE27R2O9iAlnWyHdKZlUM8YY"
