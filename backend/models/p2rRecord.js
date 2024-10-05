// models/p2rReach.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// P2R Record schema
const p2rRecordSchema = new Schema({
  p2rRecordID: { type: String, required: true, unique: true },
  user_address: { type: String, required: true },
  artist_address: { type: String, required: true },
  credit: { type: Number, default: 0, required: true },
  type: {
    type: String,
    enum: ["slow", "average", "fast"],
    required: true,
  },
  sent: { type: Number, default: 0 },
  replied: { type: Number, default: 0 },
  creditCompleted: { type: Number, default: 0 },
});

// Model creation
const P2RRecord = mongoose.model("P2RRecord", p2rRecordSchema);

export default P2RRecord; // Export the P2RRecord model
