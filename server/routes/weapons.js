import express from "express";

import { getWeapons } from "../helperFunctions/helperFunctions.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const weapons = await getWeapons();
    res.json(weapons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weapons." });
  }
});

export default router;
