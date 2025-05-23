import  { useState } from 'react';
import { bookSlot } from '../services/api';
import { format } from 'date-fns';

const BookingForm = ({ slot, venueId, venueName, date, onBookingSuccess, sports }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sport: sports.length > 0 ? sports[0] : '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.sport) {
      newErrors.sport = 'Sport is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        venueId,
        slotId: slot.id,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        registerEmail : JSON.parse(localStorage.getItem('user'))?.email,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        sport: formData.sport,
        bookedAt: new Date().toISOString()
      };
      
      await bookSlot(bookingData);
      setBookingSuccess(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        sport: sports.length > 0 ? sports[0] : '',
      });
      
      setTimeout(() => {
        onBookingSuccess();
      }, 10000);
      
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({
        submit: 'Booking failed. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (bookingSuccess) {
    return (
      <div className="booking-success card slide-in-up">
        <h3>Booking Confirmed!</h3>
        <p>Your booking at {venueName} on {format(new Date(date), 'MMMM d, yyyy')} from {formatTime(slot.startTime)} to {formatTime(slot.endTime)} has been confirmed.</p>
        <p>A confirmation email has been sent to {formData.email}.</p>
      </div>
    );
  }
  
  return (
    <div className="booking-form-wrapper card">
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="booking-summary mb-3">
          <p>
            <strong>Venue:</strong> {venueName}<br />
            <strong>Date:</strong> {format(new Date(date), 'MMMM d, yyyy')}<br />
            <strong>Time:</strong> {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </p>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="sport">Sport</label>
          <select
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleInputChange}
            disabled={isSubmitting}
          >
            {sports.map(sport => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
          {errors.sport && <div className="error-message">{errors.sport}</div>}
        </div>
        
        {errors.submit && (
          <div className="error-message mb-3">{errors.submit}</div>
        )}
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;