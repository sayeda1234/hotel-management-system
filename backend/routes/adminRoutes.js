const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/userModel");

// 📊 STATS
router.get("/stats", async (req, res) => {
  try {
    const bookingsData = await Booking.find();

    const totalBookings = bookingsData.length;
    const totalUsers = await User.countDocuments();

    let revenue = 0;

    bookingsData.forEach((b) => {
      const days =
        (new Date(b.checkOutDate) - new Date(b.checkInDate)) /
        (1000 * 60 * 60 * 24);

      revenue += days * 2000;
    });

    res.json({
      bookings: totalBookings,
      users: totalUsers,
      revenue
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

// 📦 GET BOOKINGS
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// ❌ DELETE BOOKING
router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// 👷 ASSIGN STAFF
// ASSIGN STAFF
const mongoose = require("mongoose");

router.put("/assign-staff/:bookingId", async (req, res) => {
  try {
    const { staffId } = req.body;

    console.log("Incoming:", staffId);

    const updated = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      {
        $set: {
          assignedStaff: new mongoose.Types.ObjectId(staffId)
        }
      },
      { new: true }
    );

    console.log("UPDATED BOOKING:", updated);

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assign failed" });
  }
});
// 👥 GET STAFF
router.get("/staff", async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" });
    res.json(staff);
  } catch {
    res.status(500).json({ message: "Error fetching staff" });
  }
});

module.exports = router;