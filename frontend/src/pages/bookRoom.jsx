import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // assuming roomId is passed via URL
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1
  });
  const [price, setPrice] = useState(0);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms`)
      .then(res => {
        const selectedRoom = res.data.find(r => r._id === roomId);
        setRoom(selectedRoom);
      });
  }, [roomId]);

  const calculatePrice = () => {
    const d1 = new Date(form.checkIn);
    const d2 = new Date(form.checkOut);
    const days = (d2 - d1) / (1000 * 60 * 60 * 24);
    return days * (room?.price || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/bookings", {
        ...form,
        roomId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfirmation(res.data);
    } catch (err) {
      alert("Booking failed");
    }
  };

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      setPrice(calculatePrice());
    }
  }, [form, room]);

  if (confirmation) {
    return (
      <div>
        <h2>Booking Confirmed!</h2>
        <p>Booking ID: {confirmation.bookingId}</p>
        <p>Total Price: ₹{confirmation.totalPrice}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Book Room: {room?.name}</h2>
      <form onSubmit={handleSubmit}>
  <label>Check-in Date:</label>
  <DatePicker
    selected={form.checkIn}
    onChange={(date) => setForm({ ...form, checkIn: date })}
    excludeDates={bookedDates}
    placeholderText="Select check-in date"
    dateFormat="yyyy-MM-dd"
    minDate={new Date()}
  />

  <label>Check-out Date:</label>
  <DatePicker
    selected={form.checkOut}
    onChange={(date) => setForm({ ...form, checkOut: date })}
    excludeDates={bookedDates}
    placeholderText="Select check-out date"
    dateFormat="yyyy-MM-dd"
    minDate={form.checkIn || new Date()}
  />

  <label>Guests:</label>
  <input
    type="number"
    min="1"
    value={form.guests}
    onChange={(e) => setForm({ ...form, guests: e.target.value })}
    required
  />

  <p>Total Price: ₹{price}</p>

  <button type="submit">Book Now</button>
</form>

    </div>
  );
};

export default BookRoom;
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const [bookedDates, setBookedDates] = useState([]);

useEffect(() => {
  axios.get(`http://localhost:5000/api/bookings/room/${roomId}/dates`)
    .then(res => setBookedDates(res.data.bookedDates.map(date => new Date(date))));
}, [roomId]);
