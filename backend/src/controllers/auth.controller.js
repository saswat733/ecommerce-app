import { Resend } from 'resend';
import { Otp } from '../models/auth.model.js';
import jwt from 'jsonwebtoken';

const resend = new Resend('re_SeUAsr9N_QALs9mUMrgV4hj9mYE8kjBZc');

function generateOtp() {
    return Math.floor(1000 + Math.random() * 900000).toString();
}

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOtp();

        // Store the OTP in your database
        await Otp.create({ email, otp });

        // Send OTP via Resend
        const response = await resend.emails.send({
            from: 'Your App <sandbox@resend.dev>', // Use verified sender for sandbox or domain
            to: email,
            subject: 'OTP for verification',
            html: `<h1>Your OTP is ${otp}</h1>`,
        });

        console.log('OTP sent successfully:', response);

        // Send success
        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};


export const verifyOTP = async (req, res) => {
  try {
      const {email,otp}=req.body;
  
      const otpRecord=await Otp.findOne({email,otp});
  
     if(!otpRecord){
         return res.status(400).json({message:'Invalid OTP'});
     }
  
     const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'});
  
     res.status(200).json({token});
          
  } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
  }
}