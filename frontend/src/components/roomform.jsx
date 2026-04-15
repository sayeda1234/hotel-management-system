import React, { useState } from "react";
import axios from "axios";

const RoomForm = () => {
  const [room, setRoom] = useState({
    name: "",
    type: "",
    price: 0,
    maxGuests: 1,
    amenities: "",
    photos: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/rooms", {
        ...room,
        amenities: room.amenities.split(","),
        photos: room.photos.split(",")
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Room added!");
    } catch (err) {
      alert("Error adding room");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Room Name" onChange={e => setRoom({ ...room, name: e.target.value })} />
      <input type="text" placeholder="Type (e.g. Single)" onChange={e => setRoom({ ...room, type: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setRoom({ ...room, price: e.target.value })} />
      <input type="number" placeholder="Max Guests" onChange={e => setRoom({ ...room, maxGuests: e.target.value })} />
      <input type="text" placeholder="Amenities (comma-separated)" onChange={e => setRoom({ ...room, amenities: e.target.value })} />
      <input type="text" placeholder="Photo URLs (comma-separated)" onChange={e => setRoom({ ...room, photos: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setRoom({ ...room, description: e.target.value })} />
      <button type="submit">Add Room</button>
    </form>
  );
};

export default RoomForm;
