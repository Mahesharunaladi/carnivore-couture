import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority',
      tls: false, // Temporarily set to false for testing
      // Remove tlsAllowInvalidCertificates and tlsAllowInvalidHostnames
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Detailed MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;