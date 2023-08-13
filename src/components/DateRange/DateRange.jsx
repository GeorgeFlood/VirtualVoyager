import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRange({startDate, setStartDate, endDate, setEndDate, locationDetails}) {

    if(!locationDetails) return;

console.log(locationDetails);

  return (
    <>
    <h1>When are you traveling to {locationDetails.country}?</h1>
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
    </>
  );
}

export default DateRange;
