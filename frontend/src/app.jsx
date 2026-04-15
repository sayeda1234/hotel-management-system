import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-600">Welcome to the Hotel Management System</h1>
      <p className="mt-2">This is the home page. Navigation works!</p>
    </div>
  );
}

function About() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-green-600">About Us</h2>
      <p className="mt-2">We're building a full-stack hotel booking app.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 p-4 shadow-md flex gap-4">
        <Link to="/" className="text-blue-700">Home</Link>
        <Link to="/about" className="text-blue-700">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
