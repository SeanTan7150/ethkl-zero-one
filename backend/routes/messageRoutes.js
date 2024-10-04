import express from "express";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import P2RRecord from "../models/p2rRecord.js";

const router = express.Router();

// Function to update P2R Record field
const updateP2RField = async (p2rRecordID, field) => {
  const updateData = { $inc: { [field]: 1 } };
  return await P2RRecord.findOneAndUpdate({ _id: p2rRecordID }, updateData, {
    new: true,
  });
};

// POST API to send a message
router.post("/sendMsg", async (req, res) => {
  const { sender_id, fanAddress, artistAddress, content, isP2R, p2rRecordID } =
    req.body;

  try {
    if (
      !sender_id ||
      !fanAddress ||
      !artistAddress ||
      !content ||
      !p2rRecordID
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find or create the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [fanAddress, artistAddress] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [fanAddress, artistAddress],
      });
      await conversation.save();
    }

    // Create the message
    const newMessage = new Message({
      conversation_id: conversation._id,
      sender_id,
      message_content: content,
      is_read: false,
      is_p2r: isP2R,
      p2r_id: p2rRecordID,
    });

    // Save the message
    await newMessage.save();

    // Update the P2R Record (increment 'sent' field)
    const updatedP2RRecord = await updateP2RField(p2rRecordID, "sent");
    if (!updatedP2RRecord) {
      return res
        .status(404)
        .json({ success: false, message: "P2R record not found" });
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully and P2R record updated",
      messageId: newMessage._id,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
});

// POST API to reply to a message
router.post("/replyMsg", async (req, res) => {
  const {
    sender_id,
    fanAddress,
    artistAddress,
    content,
    isP2R,
    reply_to,
    p2rRecordID,
  } = req.body;

  try {
    if (
      !sender_id ||
      !fanAddress ||
      !artistAddress ||
      !content ||
      !reply_to ||
      !p2rRecordID
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [fanAddress, artistAddress] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [fanAddress, artistAddress],
      });
      await conversation.save();
    }

    // Check if the replied message exists
    const repliedMessage = await Message.findById(reply_to);
    if (!repliedMessage) {
      return res
        .status(400)
        .json({ success: false, message: "Replied message not found" });
    }

    // Create the reply message
    const newMessage = new Message({
      conversation_id: conversation._id,
      sender_id,
      message_content: content,
      is_read: false,
      is_p2r: isP2R,
      reply_to,
      p2r_id: p2rRecordID,
    });

    // Save the reply message
    await newMessage.save();

    // Update the P2R Record (increment 'replied' field)
    const updatedP2RRecord = await updateP2RField(p2rRecordID, "replied");
    if (!updatedP2RRecord) {
      return res
        .status(404)
        .json({ success: false, message: "P2R record not found" });
    }

    return res.status(201).json({
      success: true,
      message: "Reply sent successfully and P2R record updated",
      messageId: newMessage._id,
    });
  } catch (error) {
    console.error("Error replying to message:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send reply" });
  }
});

export default router;
