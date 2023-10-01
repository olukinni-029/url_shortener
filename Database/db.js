import mongoose from 'mongoose';

const connectDB = (MONGODB_URL) => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(MONGODB_URL)
  }
export default connectDB;