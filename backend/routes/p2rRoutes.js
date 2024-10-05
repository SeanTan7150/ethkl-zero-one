import express from "express";
import P2RRecord from "../models/p2rRecord.js";

const router = express.Router();

// POST API to create a P2R Record
router.post("/createP2RRecord", async (req, res) => {
  const { p2rRecordID, user_address, artist_address, credit, type } = req.body;

  try {
    if (!p2rRecordID || !user_address || !artist_address || !credit || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    const existingRecord = await P2RRecord.findOne({ p2rRecordID });
    if (existingRecord) {
      return res
        .status(400)
        .json({ success: false, message: "P2R record already exists" });
    }

    const newP2RRecord = new P2RRecord({
      p2rRecordID,
      user_address,
      artist_address,
      credit,
      type,
      sent: 0,
      replied: 0,
      creditCompleted: 0,
    });

    await newP2RRecord.save();
    return res.status(201).json({
      success: true,
      message: "P2R record created successfully",
      p2rRecord: newP2RRecord,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create P2R record" });
  }
});

// PUT API to update 'sent', 'replied', or 'creditCompleted' of a P2R Record
router.put("/updateField/:p2r_id", async (req, res) => {
  const { p2r_id } = req.params;
  const { field } = req.body; // Expecting 'sent', 'replied', or 'creditCompleted'

  const validFields = ["sent", "replied", "creditCompleted"];

  if (!validFields.includes(field)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid field provided" });
  }

  try {
    // Create dynamic update object
    const updateData = { $inc: { [field]: 1 } };

    // Find the P2R Record by p2r_id and increment the selected field
    const updatedRecord = await P2RRecord.findOneAndUpdate(
      { p2r_id },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res
        .status(404)
        .json({ success: false, message: "P2R record not found" });
    }

    return res.status(200).json({
      success: true,
      message: `P2R record's ${field} field updated successfully`,
      p2rRecord: updatedRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update P2R record",
      details: error.message,
    });
  }
});

// GET API to fetch all P2R Records that match user_address and artist_address
router.get("/getP2RRecords/:user_address/:artist_address", async (req, res) => {
  const { user_address, artist_address } = req.params;

  try {
    if (!user_address || !artist_address) {
      return res
        .status(400)
        .json({ success: false, message: "User or artist address is missing" });
    }

    // Find all records that match both user_address and artist_address
    const records = await P2RRecord.find({
      user_address,
      artist_address,
    });

    if (records.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No matching records found" });
    }

    return res.status(200).json({
      success: true,
      message: "P2R records fetched successfully",
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch P2R records",
      details: error.message,
    });
  }
});

export default router;
