import React from 'react';
import { format, addDays } from 'date-fns';

const DateSelector = ({ selectedDate, onDateChange }) => {
  // Generate dates for next 14 days
  const generateDateOptions = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const displayDate = format(date, 'EEE, MMM d'); // e.g., "Mon, Jan 15"
      
      dates.push({
        value: formattedDate,
        label: i === 0 ? `Today (${displayDate})` : displayDate
      });
    }
    
    return dates;
  };

  const dateOptions = generateDateOptions();

  const handleChange = (e) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="date-select">Select Date</label>
      <select
        id="date-select"
        value={selectedDate}
        onChange={handleChange}
        className="date-select"
      >
        {dateOptions.map(date => (
          <option key={date.value} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;