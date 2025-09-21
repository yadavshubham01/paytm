const mongoose=require("mongoose");

require('dotenv').config()

// console.log(process.env)
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);


const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const TransferSchema = new mongoose.Schema({
   senderId :{ 
     type: mongoose.Schema.Types.ObjectId, // Reference to User model
     ref: 'User',
     required: true
   },
   recivedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    require: true,
   },
   amount:{
    type: Number,
    require: true,
    min:1,
   },
   createAt: {
    type: Date,
    default: Date.now,
   },
   status:{
     type: String,
     enum: ["SUCCESS", "FAILED", "PENDING"],
     default: "SUCCESS"
   },
});  


const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountSchema);
const Transfer=mongoose.model('Transfer',TransferSchema);
module.exports={
    User,
    Account,
    Transfer,
};
