import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getVenues, getSlots } from '../services/api';
import VenueSelector from './VenueSelector';
import DateSelector from './DateSelector';
import TimeSlots from './TimeSlots';
import BookingForm from './BookingForm';
import RegisterForm from './RegisterForm';

const VenueBooking = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isregister,setRegister] = useState(false);


  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
        if (data.length > 0 && !selectedVenue) {
          setSelectedVenue(data[0].id);
        }
      } catch (err) {
        setError('Failed to load venues. Please try again later.');
        console.error(err);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    if (selectedVenue && selectedDate) {
      fetchSlots();
    }
  }, [selectedVenue, selectedDate, refreshKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedVenue && selectedDate) {
        setRefreshKey(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [selectedVenue, selectedDate]);

  useEffect(()=>{
     const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.username || user?.email || user?.password) {
        setRegister(true);
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
    }
  }
  },[])

  const fetchSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSlots(selectedVenue, selectedDate);
      setAvailableSlots(data);
    } catch (err) {
      setError('Failed to load time slots. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVenueChange = (venueId) => {
    setSelectedVenue(venueId);
    setSelectedSlot(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingSuccess = () => {
    setSelectedSlot(null);
    setRefreshKey(prev => prev + 1);
  };

  const venueDetails = venues.find(venue => venue.id === selectedVenue);

  return (
    <div className="venue-booking slide-in-up container">
      <h2 className="mb-4">Book Your Sports Venue</h2>
      
      <div className="booking-container">
        <div className="booking-selectors mb-4">
          <div className="grid grid-2 gap-3">
            <VenueSelector 
              venues={venues} 
              selectedVenue={selectedVenue} 
              onVenueChange={handleVenueChange}
            />
            <DateSelector 
              selectedDate={selectedDate} 
              onDateChange={handleDateChange}
            />
          </div>
        </div>
        
        {error && (
          <div className="error-banner mb-3">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading available slots...</div>
        ) : (
          <>
            {venueDetails && (
              <div className="venue-details mb-4 card">
                <h3>{venueDetails.name}</h3>
                <p>Available sports: {venueDetails.sports.join(', ')}</p>
              </div>
            )}
            
            <h3 className="mb-3">Available Time Slots</h3>
            <TimeSlots 
              slots={availableSlots} 
              selectedSlot={selectedSlot}
              onSelectSlot={handleSlotSelect}
            />
           

            {selectedSlot && ( 
              <div className="booking-form-container mt-4">
                {!isregister ? (
                  <RegisterForm onRegisterSuccess={() => setRegister(true)} />
                ) : (
                  <>
                <h3>Complete Your Booking</h3>
                <BookingForm 
                  slot={selectedSlot} 
                  venueId={selectedVenue} 
                  venueName={venueDetails?.name}
                  date={selectedDate}
                  onBookingSuccess={handleBookingSuccess}
                  sports={venueDetails?.sports || []}
                />
                </>
                )}
              </div>
            )} 
        
          </>
        )}
      </div>
    </div>
  );
};

export default VenueBooking;