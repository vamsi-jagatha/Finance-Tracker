import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new error("Mongo URI is not found");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("CONNECTED TO MONGODB!");
  } catch (error) {
    console.error("Failed to connect to mongoDB", error);
  }
};
