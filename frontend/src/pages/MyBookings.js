import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(' https://hotel-management-system-8vbt.onrender.com/api/bookings/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert('Failed to load bookings');
      }
    };

    fetchBookings();
  }, [navigate]);

  // ❌ Cancel Booking
  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem('token');

    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(` https://hotel-management-system-8vbt.onrender.com/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Booking Cancelled ❌");

      // remove from UI
      setBookings(prev => prev.filter(b => b._id !== bookingId));

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="mybookings-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map(b => (
            <div key={b._id} className="booking-card">
              <h3>{b.roomName}</h3>
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Phone:</strong> {b.phone}</p>
              <p>
  <strong>Check-in:</strong>{" "}
  {b.checkInDate
    ? new Date(b.checkInDate).toLocaleDateString()
    : "N/A"}
</p>

<p>
  <strong>Check-out:</strong>{" "}
  {b.checkOutDate
    ? new Date(b.checkOutDate).toLocaleDateString()
    : "N/A"}
</p>

              {/* ❌ Cancel Button */}
              <button
                className="cancel-btn"
                onClick={() => handleCancel(b._id)}
              >
                Cancel Booking
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;





