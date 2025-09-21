const express=require('express');
const { authMiddleware } = require('../middleware');
const { Account  } = require('../db');
const { Transfer } = require('../db')
const { default: mongoose } = require('mongoose');

const router=express.Router();

router.get("/balance",authMiddleware,async(req,res) => {
    try{
    const account=await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })}catch(e){
        console.log(e)
    }
});

router.get("/history",authMiddleware, async(req,res)=> {
  
     const userId = req.userId;
   try{
     const transaction=await Transfer.find({
        $or:[{senderId:userId},{ recivedId: userId}]
     })
      .populate("senderId","username")
      .populate("recivedId", "username")
      .sort({createdAt:-1})

      res.status(200).json({
        transaction,
      })
  }catch(e){
     res.status(403).json({ msg: `Somthing went wrong user of ${userId}`, error:e.message});
  }
})


router.post("/transfer",authMiddleware,async(req,res) =>{
    const session=await mongoose.startSession();

    session.startTransaction();
    try{
    const { amount , to }=req.body;

    const account=await Account.findOne({userId:req.userId}).session(session);


    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Insufficient balance"
        });
    }

    const toAccount =await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Invaild account"
        });
    }

    const transaction = new Transfer({
        senderId: req.userId,
        recivedId: to,
        amount,
        status:"SUCCESS"
    })

    await transaction.save({session});

    // await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
    // await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        msg:"Transfer successful",
        transaction: transaction._id
    });
   }catch(e){
     await session.abortTransaction();
     res.status(500).json({ msg :"transcation failed" , err: e.message})
   } finally{
    session.endSession();
   }
});

module.exports=router;