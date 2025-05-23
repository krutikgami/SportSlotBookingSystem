
const TimeSlots = ({ slots, selectedSlot, onSelectSlot }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const renderSlot = (slot) => {
    const isSelected = selectedSlot && selectedSlot.id === slot.id;
    const isBooked = slot.isBooked;
    
    return (
      <div
        key={slot.id}
        className={`time-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
        onClick={() => !isBooked && onSelectSlot(slot)}
      >
        <div className="time-slot-content">
          <div className="time-slot-time">
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </div>
          <div className="time-slot-status">
            {isBooked ? (
              <span className="status-booked">Booked</span>
            ) : (
              <span className="status-available">Available</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="time-slots-container">
      {slots.length === 0 ? (
        <div className="no-slots-message">
          No time slots available for the selected date and venue.
        </div>
      ) : (
        <div className="time-slots-grid">
          {slots.map(renderSlot)}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;