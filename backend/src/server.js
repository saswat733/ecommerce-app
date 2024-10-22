import express from 'express';
import cors from 'cors';

const app = express();

// List of allowed origins (Vercel frontend and localhost for testing)
const allowedOrigins = [
  'https://ecommerce-31v5v2ne6-saswatsinghs-projects.vercel.app/',  // Replace with your actual Vercel URL
  'http://localhost:5173'  // For local development
];

// Enable CORS with the appropriate options
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allows cookies and headers to be sent
  })
);

// Parse incoming requests with JSON payloads
app.use(express.json());

export { app };
