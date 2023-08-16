
import React, { useEffect, useState } from 'react';


const LocationInfo = ({ selectedLocation, details }) => {

  const [imageUrls, setImageUrls] = useState([]);

  const {country, state, city} = details || {};

const key = 'e13f3ca2ff4d8ec8068ea28ad8950e47';
const tags = city || state || country + 'popular';
const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tags}&format=json&nojsoncallback=1`;

useEffect(() => {
   if (!selectedLocation) return;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const urls = data.photos.photo.map(photo => {
        const { farm, server, id, secret } = photo;
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
      });

      setImageUrls(urls);
    })
    .catch(error => console.error('There was an error fetching the photo:', error));
}, [selectedLocation, details]); 




  return (
<div>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default LocationInfo;
