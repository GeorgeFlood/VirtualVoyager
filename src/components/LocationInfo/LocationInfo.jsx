
import React, { useEffect, useState } from 'react';
import './locationInfo.css'

const LocationInfo = ({ selectedLocation, details }) => {
const [imageUrls, setImageUrls] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState('');
  const {country, state, city} = details || {};

const key = 'e13f3ca2ff4d8ec8068ea28ad8950e47';
let tags = city ? `${city}` : state ? `${state}` : `${country}`;
console.log(tags);
const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tags}&format=json&nojsoncallback=1`;

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
      const urls = data.photos.photo.map(photo => {
        const { farm, server, id, secret } = photo;
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
      });
      const selectedUrls = shuffleArray(urls).slice(0, 49);
      setImageUrls(selectedUrls);
    })
    .catch(error => {
      // Only log the error if it was not an abort error
      if (error.name !== 'AbortError') {
        setErrorMsg('There was an error fetching the photo:', error);
      }
    });
   setIsLoading(false);
  // Return the cleanup function
  return () => {
    controller.abort();
    let tags;
  };
}, [selectedLocation, details]);



console.log(tags)

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
