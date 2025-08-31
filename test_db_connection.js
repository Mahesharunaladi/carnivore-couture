import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

testConnection();