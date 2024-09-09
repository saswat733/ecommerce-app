import dotenv from 'dotenv';
import { app } from './app.js';  // Import your Express app
import connectDB from './db/index.js';  // Import your DB connection

dotenv.config({
  path: './.env',  // Ensure the .env path is correct
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.error('Server error:', error);
      throw error;
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is listening at port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
