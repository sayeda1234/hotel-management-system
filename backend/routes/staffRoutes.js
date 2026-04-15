const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { verifyToken, isStaff } = require("../middleware/authmiddleware");

router.get("/tasks", async (req, res) => {
  try {
    console.log("STAFF ROUTE HIT ✅");

    const tasks = await Booking.find();

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// 📌 Get all bookings for staff
const mongoose = require("mongoose");

router.put("/assign-staff/:bookingId", async (req, res) => {
  try {
    const { staffId } = req.body;

    console.log("BODY:", req.body);

    // ❌ VALIDATION
    if (!staffId || !mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({ message: "Invalid staffId ❌" });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      {
        $set: {
          assignedStaff: staffId   // 🔥 DON'T convert manually
        }
      },
      { new: true }
    );

    console.log("UPDATED:", updated);

    res.json(updated);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// 📌 Update room status
router.put("/room-status/:id", verifyToken, isStaff, async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("PARAM ID:", req.params.id);

    const { status } = req.body;

    if (!status) {
      console.log("❌ STATUS MISSING");
      return res.status(400).json({ message: "Status missing" });
    }

    if (!["pending", "cleaning", "done"].includes(status)) {
      console.log("❌ INVALID STATUS:", status);
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      console.log("❌ BOOKING NOT FOUND");
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    console.log("✅ UPDATED:", booking);

    res.json({ message: "Updated", booking });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;