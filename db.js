import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("Error While connecting to DB", err.message);
  }
};
