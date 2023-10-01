import mongoose from 'mongoose';

const connectDB = (URL) => {
    mongoose.set('strictQuery', true);
    return mongoose.connect(URL)
  }
export default connectDB;