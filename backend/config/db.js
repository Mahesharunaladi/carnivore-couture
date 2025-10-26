import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const uri = process.env.MONGODB_URI; // Changed to MONGODB_URI as per .env file
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    console.log('MONGODB_URI:', uri);
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Detailed MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;