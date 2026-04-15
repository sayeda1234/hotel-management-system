import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Staff.css";

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");   // ✅ ADD THIS

      const res = await axios.get(" https://hotel-management-system-8vbt.onrender.com/api/staff/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookings(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

  const updateStatus = async (id, status) => {
  const token = localStorage.getItem("token");   // ✅ ADD THIS

  try {
    await axios.put(
      ` https://hotel-management-system-8vbt.onrender.com/api/staff/room-status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setBookings(prev =>
      prev.map(b => b._id === id ? { ...b, status } : b)
    );

    alert("Updated ✅");

  } catch (err) {
    console.error(err);
    alert("Failed ❌");
  }
};

  return (
    <div className="staff-container">
      <h2>Staff Portal</h2>

      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.roomName}</td>
              <td>{b.name}</td>
              <td>{b.status}</td>

              <td>
                <button onClick={() => updateStatus(b._id, "cleaning")}>
                  Cleaning
                </button>

                <button onClick={() => updateStatus(b._id, "done")}>
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;