import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRange.css';

function DateRange({startDate, setStartDate, endDate, setEndDate, locationDetails, selectedLocation}) {

    if(!selectedLocation) return;

console.log(locationDetails);

  return (
    <div className='container'>
    <h1>When are you traveling to {locationDetails.city ? locationDetails.city : locationDetails.country}? <span className='info' title='Date info so we can search for flights'>i</span></h1>
      <div className='calender'>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      dateFormat="dd/MM/yyyy"
    />
    <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
    dateFormat="dd/MM/yyyy"
    />
 </div>
 </div>
  );
}

export default DateRange;
