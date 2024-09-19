import mongoose from "mongoose";
import validator from 'validator';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Provide UserName"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Provide emailaddress"],
        validate:{
            validator:(value)=>validator.isEmail(value),
            message:"please provide valid email"
        }
    },
    password:{
        type:String,
        required:[true,"Provide password"],
        validate:{
            validator:(value)=>/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
            message:"Password must contain at least 8 characters, including at least one letter and one number"
        }
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

})
const User=mongoose.model.users || mongoose.model("users",userSchema);
export default User;