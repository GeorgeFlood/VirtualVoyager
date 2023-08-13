
import React from 'react';

const LocationInfo = ({ selectedLocation }) => {
  // Early return if no location is selected
  if (!selectedLocation) return;

  const { lat, lng } = selectedLocation;

const key = '50B4C183803C44C7992C00D13A74AF9A'

const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=48.84087654039132%2C2.271729383423429&key=50B4C183803C44C7992C00D13A74AF9A&category=attractions&language=en', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  return (
    <div>HELLO</div>
  );
};

export default LocationInfo;
