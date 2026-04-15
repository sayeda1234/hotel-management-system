const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const {verifyToken} = require('../middleware/authmiddleware');
const isAdmin = require('../middleware/adminMiddleware');


// ===============================
// ✅ Create Booking
// ===============================
router.post('/', verifyToken, async (req, res) => {
  try {
    const { roomName, checkInDate, checkOutDate, name,phone} = req.body;

    // ✅ Proper validation
    if (!roomName || !name || !phone || !checkInDate || !checkOutDate ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Prevent double booking
    const existing = await Booking.findOne({
      roomName,
      checkIn: { $lte: new Date(checkOutDate) },
      checkOut: { $gte: new Date(checkInDate) }
    });

    if (existing) {
      return res.status(400).json({
        message: "Room already booked for selected dates"
      });
    }

    // ✅ Save booking
    const booking = new Booking({
      user: req.user.id,
      roomName,   // ✅ FIXED
      checkInDate,
      checkOutDate,
      name,
      phone,
      bookingId: "BK" + Date.now()
    });

    await booking.save();

    res.status(201).json({ message: "Booking confirmed", booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
});


// ===============================
// ✅ My Bookings
// ===============================
router.get('/my', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


// ===============================
// ✅ Booked Dates
// ===============================
router.get('/dates/:roomName', async (req, res) => {
  try {
    const bookings = await Booking.find({ roomName: req.params.roomName });

    let bookedDates = [];

    bookings.forEach(b => {
      let start = new Date(b.checkIn);
      let end = new Date(b.checkOut);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        bookedDates.push(new Date(d).toISOString().split("T")[0]);
      }
    });

    res.json(bookedDates);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching dates" });
  }
});


// ===============================
// ❌ Cancel Booking
// ===============================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});
router.get('/admin/all', verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings=await Booking.find().set({createdAt:-1});
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all bookings" });
  }
});

router.delete('/admin/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
});

module.exports = router;