// Add this at the top of the file
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' }); // Updated path and ES module syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cartRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
