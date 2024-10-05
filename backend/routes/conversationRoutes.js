import express from "express";
import Conversation from "../models/conversation.js";

const router = express.Router();

// GET API to fetch conversation by address
router.get("/getConversation/:address", async (req, res) => {
  const { address } = req.params; // Get address from URL parameters

  try {
    // Find conversations where the participants array contains the given address
    const conversations = await Conversation.find({
      participants: { $in: [address] },
    });

    if (conversations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No conversations found for this address",
      });
    }

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversation",
    });
  }
});

export default router;
