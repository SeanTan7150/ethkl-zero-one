import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.VITE_REACT_APP_DB_USERNAME}:${process.env.VITE_REACT_APP_DB_PASSWORD}@p2reach.vjwlc.mongodb.net/?retryWrites=true&w=majority&appName=P2Reach`,
      {}
    );

    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};
