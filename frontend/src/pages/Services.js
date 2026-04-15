import React from 'react';
import './Service.css';
import {
  FaConciergeBell,
  FaUtensils,
  FaSwimmingPool,
  FaShuttleVan,
  FaSpa,
  FaWifi,
  FaDumbbell,
  FaCocktail,
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaConciergeBell size={40} />,
      title: '24/7 Concierge',
      description: 'Always available to assist you with anything you need.',
    },
    {
      icon: <FaUtensils size={40} />,
      title: 'Room Service',
      description: 'Enjoy delicious meals delivered directly to your room.',
    },
    {
      icon: <FaSwimmingPool size={40} />,
      title: 'Swimming Pool',
      description: 'Relax and unwind in our luxury pool area.',
    },
    {
      icon: <FaShuttleVan size={40} />,
      title: 'Airport Shuttle',
      description: 'Free shuttle to and from the airport for our guests.',
    },
    {
      icon: <FaSpa size={40} />,
      title: 'Luxury Spa',
      description: 'Rejuvenate with a range of treatments and massages.',
    },
    {
      icon: <FaWifi size={40} />,
      title: 'Free Wi-Fi',
      description: 'High-speed internet throughout the hotel.',
    },
    {
      icon: <FaDumbbell size={40} />,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment available 24/7.',
    },
    {
      icon: <FaCocktail size={40} />,
      title: 'Bar & Lounge',
      description: 'Enjoy exotic drinks and live music every evening.',
    },
  ];

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
