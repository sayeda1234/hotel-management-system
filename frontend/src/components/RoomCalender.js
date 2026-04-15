import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function RoomCalendar({ roomId }) {
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/${roomId}`)
      .then(res => {
        setBookedDates(res.data);
      })
      .catch(err => console.log(err));
  }, [roomId]);

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (bookedDates.includes(formattedDate)) {
      return "booked-date";
    }
  };

  return (
    <div>
      <h3>Room Availability</h3>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

export default RoomCalendar;