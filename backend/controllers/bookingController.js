const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const { v4: uuidv4 } = require("uuid");

// Get room bookings (single clean version)
const getRoomBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ roomId: req.params.roomId });
    const bookedDates = [];

    bookings.forEach(booking => {
      const current = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      while (current < end) {
        bookedDates.push(new Date(current).toISOString().split("T")[0]); // format: YYYY-MM-DD
        current.setDate(current.getDate() + 1);
      }
    });

    res.json({ bookedDates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Book a room
const bookRoom = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body;
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    if (days < 1) return res.status(400).json({ message: "Invalid date range" });

    const totalPrice = room.price * days;

    const booking = await Booking.create({
      userId: req.user.id,
      roomId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      bookingId: uuidv4().split("-")[0]
    });

    res.status(201).json({ bookingId: booking.bookingId, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createBooking = (req, res) => {
  res.json({ message: "createBooking works" });
};

const cancelBooking = (req, res) => {
  res.json({ message: "cancelBooking works" });
};


// Export all functions cleanly
module.exports = {
  getRoomBookings,
  bookRoom,
  createBooking,
  cancelBooking
};
