import React from "react";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>👑 BlissStay</h2>

        <ul>
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/bookings">Bookings</a></li>
          <li><a href="/admin/rooms">Rooms</a></li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="content">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;