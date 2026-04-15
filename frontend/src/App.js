import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./components/NavigationBar";
import RoomsPage from "./pages/Room";
import ContactPage from "./pages/Contact";
import ServicesPage from "./pages/Services";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import BookRoom from "./pages/BookRoom";
import RoomDetail from "./pages/RoomDetail";
import ScrollToTop from "./ScrollToTop";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import ProtectedRoute from "./components/ProtectRoute";
import AdminBookings from "./pages/AdminBookings";
import AdminRooms from "./pages/AdminRooms";
import AdminStaff from "./pages/AdminStaff";
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
    <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book-room" element={<BookRoom />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/staff" element={<ProtectedRoute roleRequired="staff"><StaffDashboard /></ProtectedRoute>} />
      </Routes>
    </>

  );
}

export default App;