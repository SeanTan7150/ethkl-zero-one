import mongoose from "mongoose";

const { Schema } = mongoose;

// Message schema
const messageSchema = new Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message_content: { type: String, required: true },
  sent_at: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false },
  is_p2r: { type: Boolean, default: false },
  reply_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null,
  },
  p2r_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "P2RRecord", // Reference to P2R Record
    required: true,
  },
});

// Model creation
const Message = mongoose.model("Message", messageSchema);

export default Message;
