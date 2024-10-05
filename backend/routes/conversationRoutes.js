import express from "express";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

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

// Route to get all messages of a conversation by conversation ID
router.get("/conversationMsg/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Find messages associated with the provided conversation ID
    const messages = await Message.find({ conversation_id: conversationId })
      .populate("sender_id", "address") // Assuming you want to populate sender info, change as needed
      .populate("reply_to") // Populate the reply message if needed
      .sort({ sent_at: 1 }); // Sort messages by sent time in ascending order

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
});

export default router;
