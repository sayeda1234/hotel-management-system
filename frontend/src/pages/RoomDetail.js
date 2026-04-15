import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const roomData = [
  { id: "1", name: "Deluxe Suite", price: 299,
   images: [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd"
],
    description: "Spacious luxury suite with premium interiors, king-size bed, and city view.",
    amenities: ["Free WiFi","AC","TV","Mini Bar","Room Service"]
  },
  { id: "2", name: "Standard Room", price: 199,
   images: [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
],
    description: "Comfortable room perfect for business and short stays.",
    amenities: ["Free WiFi","AC","TV","Work Desk"]
  },
  { id: "3", name: "Executive King Room", price: 349,
    images: [
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
],
    description: "Elegant executive room with king bed and premium facilities.",
    amenities: ["Free WiFi","AC","Smart TV","Coffee Maker","City View"]
  }
];

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ensure string comparison
  const room = roomData.find(r => r.id === String(id));

  // ✅ Prevent crash
  if (!room) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Room not found</h2>
        <button onClick={() => navigate("/rooms")}>Back to Rooms</button>
      </div>
    );
  }

  return (
    <div className="details-container">
    <div className="slider-wrapper">
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={20}
    slidesPerView={1}
  >
    {room.images && room.images.map((img, index) => (
      <SwiperSlide key={index}>
        <img src={img} alt={room.name} className="details-image" />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      <div className="details-info">
        <h1>{room.name}</h1>
        <p className="price">${room.price} / night</p>
        <p className="desc">{room.description}</p>

        <h3>Amenities</h3>
        <ul>
          {room.amenities?.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>

       <button
  className="book-btn"
  onClick={() => navigate("/book-room", { state: { room } })}
>
  Book Now
</button>
      </div>
    </div>
  );
};

export default RoomDetails;