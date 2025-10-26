import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    console.log('MONGO_URI:', uri);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Detailed MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;