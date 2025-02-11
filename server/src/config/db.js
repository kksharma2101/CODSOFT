import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/app');
    if (connect) {
      console.log("DB connected...");
    }
  } catch (e) {
    console.log(`${e.message}`.red);
    console.log("error")
  }
};
export default connectDb;