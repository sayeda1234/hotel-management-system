const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g. Single, Double, Suite
  price: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  amenities: [String],
  photos: [String], // image URLs
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);

