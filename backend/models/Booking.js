const mongoose = require("mongoose");

mongoose.models = {}; // 🔥 ADD THIS

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  phone: String,
  roomName: String,
  checkInDate: Date,
  checkOutDate: Date,

  status: {
    type: String,
    default: "pending"
  },

  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema); 