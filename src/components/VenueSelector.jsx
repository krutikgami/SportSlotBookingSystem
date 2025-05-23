const VenueSelector = ({ venues, selectedVenue, onVenueChange }) => {
  const handleChange = (e) => {
    onVenueChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="form-group">
      <label htmlFor="venue-select">Select Venue</label>
      <select
        id="venue-select"
        value={selectedVenue || ''}
        onChange={handleChange}
        className="venue-select"
      >
        <option value="" disabled>Select a venue</option>
        {venues.map(venue => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VenueSelector;