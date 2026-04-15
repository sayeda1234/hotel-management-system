import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://hotel-management-system-e9sm.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // send the data!
    });

    if (res.ok) {
      alert('Message sent successfully');
      setFormData({ name: '', email: '', message: '' }); // reset form
    } else {
      alert('Failed to send message.');
    }
  } catch (error) {
    alert('An error occurred while sending the message.');
    console.error(error);
  }
};

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We’re here to help! Fill out the form and we’ll get back to you shortly.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
