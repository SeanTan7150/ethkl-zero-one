import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Create User API
router.post("/createUser", async (req, res) => {
  const { address, username, profile_pic_url, bio, worldCoinStatus, isArtist } =
    req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const newUser = new User({
      address,
      username,
      profile_pic_url,
      bio,
      worldCoinStatus,
      isArtist,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating user", details: error.message });
  }
});

// Update User API
router.put("/updateUser/:address", async (req, res) => {
  const { address } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ address }, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
});

// Get User Details API
router.get("/getUser/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const user = await User.findOne({ address });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching user details", details: error.message });
  }
});

export default router;
