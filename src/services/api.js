import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVenues = async () => {
  try {
    const response = await api.get('/venues');
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

export const getSlots = async (venueId, date) => {
  try {
    const response = await api.get(`/slots?venueId=${venueId}&date=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slots:', error);
    throw error;
  }
};

export const bookSlot = async (bookingData) => {
  try {
    const bookingResponse = await api.post('/bookings', bookingData);
    
    const slotResponse = await api.patch(`/slots/${bookingData.slotId}`, {
      isBooked: true
    });
    
    return {
      booking: bookingResponse.data,
      slot: slotResponse.data
    };
  } catch (error) {
    console.error('Error booking slot:', error);
    throw error;
  }
};

export const getVenueById = async (venueId) => {
  try {
    const response = await api.get(`/venues/${venueId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching venue:', error);
    throw error;
  }
};

export const getBookings = async (userEmail) => {
  try {
    const response = await api.get(`/bookings?registerEmail=${userEmail}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export default api;
