import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    bookings: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://hotel-management-system-e9sm.onrender.com/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
  <div className="dashboard-wrapper">

    <div className="dashboard-header">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="subtitle">Overview of your hotel operations</p>
    </div>

    <div className="admin-cards">
      <div className="card" onClick={() => navigate("/admin/bookings")}>
        <h4>📦 Bookings</h4>
        <p className="value">{stats.bookings}</p>
      </div>

      <div className="card">
        <h4>👥 Users</h4>
        <p className="value">{stats.users}</p>
      </div>

      <div className="card">
        <h4>💰 Revenue</h4>
        <p className="value">₹ {stats.revenue}</p>
      </div>
    </div>

  </div>
</AdminLayout>
  );
};

export default AdminDashboard;