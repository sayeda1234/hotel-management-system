import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Invalid email format");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      console.log("Backend response:", res.data);
      alert("Registered successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
      />
      <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "green", color: "#fff" }}>
        Register
      </button>
    </form>
  );
};

export default Register;