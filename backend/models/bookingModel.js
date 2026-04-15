const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  phone: String,
  roomName: String,
  checkInDate: Date,
  checkOutDate: Date,

  status: {
    type: String,
    default: "pending"
  },

  assignedStaff: {   // 🔥 THIS WAS MISSING
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
