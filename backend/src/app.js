import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './db/index.js';

const app = express();

// List of allowed origins (Vercel frontend and localhost for testing)
const allowedOrigins = [
  'https://ecommerce-app-rust-nine.vercel.app/',
  'http://localhost:5173'  // For local development
];

// Enable CORS with the appropriate options
app.use(
  cors({
    origin: (origin, callback) => {
        console.log('origin',origin)
      if (!origin || allowedOrigins.includes(origin) || origin === null) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// // Connect to the database
// connectDB().then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
//   process.exit(1); // Exit the process if DB connection fails
// });

// Parse incoming requests with JSON payloads
app.use(cookieParser());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);

export { app };
