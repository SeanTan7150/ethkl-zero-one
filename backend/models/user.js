// models/user.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// User schema
const userSchema = new Schema({
  address: { type: String, required: true, unique: true },
  username: { type: String },
  profile_pic_url: { type: String },
  bio: { type: String },
  worldcoin_status: { type: Boolean, default: false },
  is_artist: { type: Boolean, default: false },
});

// Model creation
const User = mongoose.model("User", userSchema);

export default User; // Export the User model
