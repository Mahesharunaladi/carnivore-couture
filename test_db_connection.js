import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the .env file.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection successful!');
    mongoose.connection.close(); // Close connection after successful test
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });