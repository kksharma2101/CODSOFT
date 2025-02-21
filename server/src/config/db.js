import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = await mongoose.connect("mongodb://127.0.0.1:27017" || process.env.MONGODB_URL);

    if (dbUrl) {
      console.log("DB connected...");
    }
  } catch (e) {
    console.log(`${e.message}`.red);
    console.log("error in connect DB");
  }
};
export default connectDb;
