import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookings.css";
import AdminLayout from "./AdminLayout";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [staffList, setStaffList] = useState([]);

  // 🔥 FETCH BOOKINGS + STAFF
  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://hotel-management-system-e9sm.onrender.com/api/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("https://hotel-management-system-e9sm.onrender.com/api/admin/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchBookings();
  fetchStaff();
}, []);
  // 🔥 DELETE BOOKING
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure to delete this booking?")) return;

    try {
      await axios.delete(
        `https://hotel-management-system-e9sm.onrender.com/api/admin/bookings/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookings(prev => prev.filter(b => b._id !== id));
      alert("Deleted ✅");

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // 🔥 ASSIGN STAFF
  const assignStaff = async (bookingId, staffId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://hotel-management-system-e9sm.onrender.com/api/admin/assign-staff/${bookingId}`,
        { staffId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Staff Assigned ✅");

      // update UI instantly
      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId ? { ...b, assignedStaff: staffId } : b
        )
      );

  } catch (err) {
    alert("Assignment failed ❌");
  }
};

return (
    <AdminLayout>
      <div className="admin-container">

        <h2 className="admin-title">All Bookings</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Phone</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Assign Staff</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.name}</td>
                  <td>{b.roomName}</td>
                  <td>{b.phone}</td>
                  <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>

                  {/* 🔥 STAFF DROPDOWN */}
                  <td>
  <select
    onChange={(e) => assignStaff(b._id, e.target.value)}
  >
    <option value="">Select</option>

    {staffList.map((staff) => (
      <option key={staff._id} value={staff._id}>
        {staff.name}
      </option>
    ))}
  </select>
</td>

                  {/* 🔥 DELETE BUTTON */}
                  <td>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminBookings;