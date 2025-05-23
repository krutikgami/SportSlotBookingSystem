import { useState,useEffect } from "react";
import {getBookings} from '../services/api'


export function MyBooking() {
    const [slots, setSlots] = useState([]);
    

    useEffect(()=>{
        getBookings(JSON.parse(localStorage.getItem('user')).email).then((res)=> setSlots(res))
        .catch((error) => console.error('Error fetching bookings:', error));
    },[])
     console.log(slots);
     

    return (
        <>
    <div className="time-slots-container container">
        {slots.length === 0 ? (
             <div className="no-slots-message">
                <h2>No Bookings Found</h2>
                <p>You have not booked any time slots yet.</p>
                <p>Please check back later or make a new booking.</p>
             </div>
        ) : (
    <div className="time-slots-grid">
      {slots.map((slot) => (
        <div key={slot.id} className="slot-card">
          <h3>{slot.sport}</h3>
          <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
          <p><strong>Date:</strong> {slot.date}</p>
          <p><strong>User:</strong> {slot.userName}</p>
          <p><strong>Email:</strong> {slot.userEmail}</p>
          <p><strong>Phone:</strong> {slot.userPhone}</p>
          <p><strong>Booked At:</strong> {new Date(slot.bookedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )}
</div>

        </>
    )
}
