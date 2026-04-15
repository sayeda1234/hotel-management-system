import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://hotel-management-system-e9sm.onrender.com/api/users/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if(res.data.role === "admin") {
        navigate("/admin");
      } else if(res.data.role === "staff") {
        navigate("/staff");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>

      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue booking your stay</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="extra-links">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;