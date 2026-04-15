import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Room.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRooms([
          {
            id: "1",
            name: "Deluxe Suite",
            price: 299,
            images: [
              "https://www.grandlordhotel.com/medias/room/big/78/deluxe02.jpg",
            ],
          },
          {
            id: "2",
            name: "Standard Room",
            price: 199,
            images: [
              "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
            ],
          },
           {
    id: "3",
    name: "Executive King Room",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    ],
  },
        ]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms", err);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div className="loading">Loading BlissStay Rooms...</div>;
  }

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <Link key={room.id} to={`/rooms/${room.id}`} className="room-link">
          <div className="room-card">
            <img
              src={room.images[0]}
              alt={room.name}
              className="room-image"
            />

            <div className="room-info">
              <h3>{room.name}</h3>
              <p>
                ${room.price} <span>/ night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Rooms;