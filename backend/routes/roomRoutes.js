// In routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const { getAllRooms } = require("../controllers/roomController");
const Room = require("../models/Room"); // adjust path if needed
router.get('/', getAllRooms);

router.get("/available", async (req, res) => {
  try {
    const rooms = await Room.find({}); // or filter by availability if needed
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms", error: err.message });
  }
});

module.exports = router;