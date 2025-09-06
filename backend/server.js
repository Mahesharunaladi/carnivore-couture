// This line should be the very first line in the file
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use('/api/auth', rateLimiter, authRoutes);

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
console.log('MONGODB_URI:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Mask password
mongoose
  .connect(process.env.MONGODB_URI, {
    retryWrites: true,
    w: 'majority',
    tls: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));