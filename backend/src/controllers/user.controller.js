import { z } from 'zod';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Zod schema for validation
const UserSignUpCheck = z.object({
    firstname: z.string().min(1).trim().toLowerCase(),
    lastname: z.string().min(1).trim().toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(6) // Minimum password length
});

const UserLoginCheck = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(6)
});



export const registerUser = async (req, res) => {
    // Validate request data
    const { success, error, data } = UserSignUpCheck.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: 'Invalid input data',
            errors: error.issues, // Provide validation errors
        });
    }

    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create new user
        const newUser = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: hashedPassword, // Store hashed password
        });

        // Save new user to the database
        await newUser.save();

        // Generate a JWT token
        const userId = newUser._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set token expiration
        });

        // Return response with token, and user details without the password
        return res.status(201).json({
            message: 'User created successfully',
            token: token,
            user: {
                _id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                // Do not include password in the response
            },
        });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: 'An error occurred during registration',
        });
    }
};



export const loginUser = async (req, res) => {
        const {success, error, data} = UserLoginCheck.safeParse(req.body);
        console.log(success)
        
        if (!success) {
            return res.status(400).json({
                message: 'Invalid input data',
                errors: error.issues, // Provide validation errors
            });
        }
    
        try {
            const existingUser=await User.findOne({email:data.email});
            if(!existingUser){
                return res.status(404).json({message:'User not found'});
            }
            const isValidPassword=await bcrypt.compare(data.password,existingUser.password);
            if(!isValidPassword){
                return res.status(401).json({message:'Invalid password'});
            }
            const userId=existingUser._id;
            console.log(existingUser)

            const token=jwt.sign({userId},process.env.JWT_SECRET,{
                expiresIn:'1h',
            });
            return res.status(200).json({
                message:'User logged in successfully',
                token:token,
                user:{
                    _id:existingUser._id,
                    firstname:existingUser.firstname,
                    lastname:existingUser.lastname,
                    email:existingUser.email,
                },
            });

        } catch (error) {
            // Handle any errors that occurred during the process
            console.error('Error logging in user:', error);
            return res.status(500).json({
                message: 'An error occurred during login',
            });
        }
}