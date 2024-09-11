import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';

const app = express();

// CORS Configuration
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', userRouter);


export { app };
