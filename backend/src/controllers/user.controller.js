import { z } from 'zod';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Zod schema for validation
const UserCheck = z.object({
    firstname: z.string().min(1).trim().toLowerCase(),
    lastname: z.string().min(1).trim().toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(6) // Minimum password length
});

// Register user function
export const registerUser = async (req, res) => {
    // Validate request data
    const { success, error, data } = UserCheck.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: 'Invalid input data',
            errors: error.issues, // Provide validation errors
        });
    }
    
    console.log(data)
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
            password: hashedPassword,
        });

        // Save new user to the database
        await newUser.save();
        
        // Generate a JWT token
        const userId = newUser._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set token expiration
        });

        // Return response with token
        return res.status(201).json({
            message: 'User created successfully',
            token: token,
        });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error('Error registering user:', error);
        return res.status(500).json({
            message: 'An error occurred during registration',
        });
    }
};
