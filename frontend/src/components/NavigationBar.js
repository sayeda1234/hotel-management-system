import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">BlissStay Hotel</h2>

      <ul className="navbar-links">
        {token ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/my-bookings">My Bookings</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* 🔥 ADMIN */}
            {role === "admin" && (
              <li>
                <Link to="/admin" className="admin-btn">
                  Admin Portal
                </Link>
              </li>
            )}

            {/* 🔥 STAFF */}
            {role === "staff" && (
              <li>
                <Link to="/staff" className="staff-btn">
                  Staff Portal
                </Link>
              </li>
            )}

            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;