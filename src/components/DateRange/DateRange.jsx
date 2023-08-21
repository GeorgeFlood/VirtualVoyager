import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRange.css';

 

function DateRange({ startDate, setStartDate, endDate, setEndDate, locationDetails, selectedLocation }) {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  if (!selectedLocation) return null;
  const { country, state, city } = locationDetails || {};
  const location = city ? `${city}` : state ? `${state}` : `${country}`;



const handleFetchClick = async (prompt) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint
   const API_KEY = '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';

  try {
    const result = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Specify the model
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const data = await result.json();
    console.log("API Response:", data);

    if (!result.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    if (result.ok) {
      setResponse(data.choices[0].message.content); // Adjust as needed based on response structure
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
};



  const getGPTres = () => {
    const prompt = `A brief overview of ${location} with things to do, perhaps places to eat. overview of night life, crime rate and if it's suitable for families.`;
    setInputText(prompt); // Set the input text in state if you want to display it
    handleFetchClick(prompt); // Call the fetch function with the prompt
  };


  console.log(response);
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
    <div>
     
      <button onClick={getGPTres}>Info on {location}</button>
      <div>
        <strong>{location} Info</strong>
        <p className='GPTresp'>{response}</p>
      </div>
    </div>
 </div>
  );
}

export default DateRange;
