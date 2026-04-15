import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id}>
          <h3>{room.name} - {room.type}</h3>
          <p>₹{room.price} / night | Max Guests: {room.maxGuests}</p>
          <p>{room.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
