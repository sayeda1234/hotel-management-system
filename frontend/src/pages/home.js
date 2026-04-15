import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero">
        <h1>Welcome to BlissStay Hotel</h1>
        <p>Relax, unwind, and enjoy luxury like never before.</p>
        
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <div className="card">
          <h3>Rooms</h3>
          <p>Explore our range of deluxe, executive, and family rooms.</p>
          <Link to="/rooms"><button>View Rooms</button></Link>
        </div>

        <div className="card">
          <h3>Services</h3>
          <p>We provide 24/7 room service, spa, gym, and more!</p>
          <Link to="/services"><button>Our Services</button></Link>
        </div>

        <div className="card">
          <h3>Contact Us</h3>
          <p>Need help? Get in touch with our support team.</p>
          <Link to="/contact"><button>Contact</button></Link>
        </div>
      </section>

      {/* About Us */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          BlissStay Hotel offers a luxurious and comfortable experience with top-notch amenities and excellent hospitality.
          We are located in the heart of the city, providing a peaceful oasis for travelers and guests.
        </p>
      </section>
    </div>
  );
};

export default Home;
