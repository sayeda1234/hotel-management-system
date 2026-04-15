import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import "./AdminRooms.css";

const roomsData = [
  { number: 101, floor: 1, type: "Standard", capacity: 2, rate: 150, status: "available" },
  { number: 102, floor: 1, type: "Standard", capacity: 2, rate: 150, status: "occupied" },
    { number: 103, floor: 1, type: "Deluxe", capacity: 2, rate: 150, status: "reserved" },
  { number: 201, floor: 2, type: "Deluxe", capacity: 3, rate: 280, status: "occupied" },
  { number: 202, floor: 2, type: "Deluxe", capacity: 3, rate: 280, status: "available" },
  { number: 203, floor: 2, type: "Deluxe", capacity: 3, rate: 280, status: "reserved" },
  { number: 301, floor: 3, type: "Royal Suite", capacity: 4, rate: 520, status: "occupied" },
    { number: 302, floor: 3, type: "Royal Suite", capacity: 4, rate: 520, status: "available" },
    { number: 303, floor: 3, type: "Royal Suite", capacity: 4, rate: 520, status: "reserved" }
];

const AdminRooms = () => {
  const [filter, setFilter] = useState("all");

  const filteredRooms =
    filter === "all"
      ? roomsData
      : roomsData.filter((r) => r.status === filter);

  return (
    <AdminLayout>
      <div className="rooms-page">

        {/* HEADER */}
        <div className="rooms-header">
          <div>
            <h2>Rooms</h2>
            <p>Manage all hotel rooms</p>
          </div>

          <input
            className="search"
            placeholder="Search room number..."
          />
        </div>

        {/* FILTERS */}
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("available")}>Available</button>
          <button onClick={() => setFilter("occupied")}>Occupied</button>
          <button onClick={() => setFilter("reserved")}>Reserved</button>
        </div>

        {/* GRID */}
        <div className="room-grid">
          {filteredRooms.map((room) => (
            <div key={room.number} className="room-card">

              <div className="room-top">
                <h3>Room {room.number}</h3>
                <span className={`status ${room.status}`}>
                  {room.status}
                </span>
              </div>

              <p className="floor">Floor {room.floor}</p>

              <div className="details">
                <p><b>Type:</b> {room.type}</p>
                <p><b>Capacity:</b> {room.capacity} guests</p>
                <p className="rate"><b>Rate:</b> ${room.rate}/night</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminRooms;