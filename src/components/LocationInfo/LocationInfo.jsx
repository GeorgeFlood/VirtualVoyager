
import React, { useEffect, useState } from 'react';
import './locationInfo.css'

const LocationInfo = ({ selectedLocation, details }) => {
const [imageUrls, setImageUrls] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');
  const {country, state, city} = details || {};

const key = 'ai5o6ctoDBjsLfyEXNxOeHEikQyxi_W82VTHzZM0QoI';
let tags = city ? `${city}` : state ? `${state}` : `${country}`;
console.log(tags);
const url = `https://api.unsplash.com/search/photos?query=${tags}&client_id=${key}`;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

useEffect(() => {
   if (!selectedLocation) return;
  setIsLoading(true);

  // Create a new AbortController
  const controller = new AbortController();
  const { signal } = controller;

 fetch(url, { signal }) // Pass the signal to the fetch call
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const urls = data.results.map(photo => photo.urls.regular);
      const selectedUrls = shuffleArray(urls).slice(0, 8);
      setImageUrls(selectedUrls);
      setIsLoading(false); // Move this inside the then block
    })
    .catch(error => {
      // Only log the error if it was not an abort error
      if (error.name !== 'AbortError') {
        setErrorMsg('There was an error fetching the photo:', error);
      }
      setIsLoading(false); // Move this here in case of an error
    });

  return () => {
    controller.abort();
  };
}, [selectedLocation, details]);



console.log(imageUrls)

return (
  isLoading ? (
    <div>Loading...</div>
  ) : errorMsg ? (
    <div>{errorMsg}</div>
  ) : (
<div className="brochure-container">
  <h1>Brochure</h1>
  <div className="brochure-grid">
    {imageUrls.map((url, index) => (
      <div key={index} className="brochure-item">
        <img src={url} alt={`Image ${index}`} />
      </div>
    ))}
  </div>
</div>


  
  )
);

      }
export default LocationInfo;
