import mongoose from "mongoose";


const otpSchema=new mongoose.Schema({
    email:String,
    otp:Number,
    createdAt: { type: Date, expires: '5m', default: Date.now }
})

export const Otp=mongoose.model('Otp',otpSchema);
