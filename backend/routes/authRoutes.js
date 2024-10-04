import express from "express";
import { verifyCloudProof } from "@worldcoin/idkit";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Route to verify proof
router.post("/verify", async (req, res) => {
  const proof = req.body;
  const app_id = process.env.VITE_REACT_APP_APP_ID;
  const action = process.env.VITE_REACT_APP_ACTION_ID;

  if (!app_id || !action) {
    return res.status(500).send({ error: "APP_ID is not defined" });
  }

  const verifyRes = await verifyCloudProof(proof, app_id, action);

  if (verifyRes.success) {
    return res.status(200).send(verifyRes);
  } else {
    return res.status(400).send(verifyRes);
  }
});

export default router;
