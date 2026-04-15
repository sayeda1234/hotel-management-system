import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookRoom.css';
import axios from 'axios';

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  if (!room) {
    return (
      <div style={{ padding: "60px" }}>
        <h2>No room selected</h2>
        <button onClick={() => navigate("/rooms")}>
          Go Back to Rooms
        </button>
      </div>
    );
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Select dates");
      return;
    }

  const bookingData = {
  name: name,
  phone: phone,
  roomName: room.name,
  checkInDate: checkInDate,
  checkOutDate: checkOutDate
};

    console.log("Sending:", bookingData);

    try {
      await axios.post(
        "https://hotel-management-system-e9sm.onrender.com/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Booking Confirmed ✅");
      navigate("/my-bookings");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Booking for {room.name}</h2>

        <form onSubmit={handleBooking} className="booking-form">
          <label>Your Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <label>Phone Number:</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />

          <label>Check-in Date:</label>
          <input 
            type="date" 
            value={checkInDate} 
            onChange={(e) => setCheckInDate(e.target.value)} 
            required 
          />

          <label>Check-out Date:</label>
          <input 
            type="date" 
            value={checkOutDate} 
            onChange={(e) => setCheckOutDate(e.target.value)} 
            required 
          />

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookRoom;