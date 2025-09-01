import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true, // Remove this line
      // useUnifiedTopology: true, // Remove this line
      retryWrites: true,
      w: 'majority',
      tls: true, // Change to true for MongoDB Atlas
      // Remove tlsAllowInvalidCertificates and tlsAllowInvalidHostnames
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Detailed MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;