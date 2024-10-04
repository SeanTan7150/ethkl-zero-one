// models/conversation.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Conversation schema
const conversationSchema = new Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  is_group: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

// Model creation
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; // Export the Conversation model
