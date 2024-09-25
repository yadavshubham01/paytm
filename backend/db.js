const mongoose=require("mongoose");



mongoose.connect("mongodb+srv://shubhamyaadav:zEkHMtxOKHLitQS5@cluster0.pi86b7o.mongodb.net/paytm");


const paytmSchema=new mongoose.Schema({
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


const User=mongoose.model('paytm',paytmSchema);
const Account=mongoose.model('Account',accountSchema);
module.exports={
    User,
    Account,
};