import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './InteractiveMap.css';

function InteractiveMap() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577, // Default location
    longitude: -122.4376,
    zoom: 8
  });
  
  const [selectedLocation, setSelectedLocation] = useState(null);



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: viewport.zoom // or set a specific zoom level like 4
      });
    });
  }, []); 
  
  

  // A component to capture click events on the map
  function MapClickHandler() {
    const map = useMapEvents({
      click: (e) => {
        setSelectedLocation(e.latlng);
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
          .then((response) => response.json())
          .then((data) => {
            const country = data.address.country;
           const city = data.address.city;
           const state = data.address.state;
            console.log('Country:', country);
            console.log('City', city);
            console.log('State', state)
          })
          .catch((error) => {
            console.error('Error fetching country:', error);
          });
      },
    });
    return null;
  }
  
  

  return (
    <MapContainer className="map-container" center={[viewport.latitude, viewport.longitude]} zoom={4}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[viewport.latitude, viewport.longitude]}>
        <Popup>
          Your current location <br /> Easily customizable.
        </Popup>
      </Marker>
      {selectedLocation && <Marker position={selectedLocation}>
        <Popup>
          Selected destination <br /> Plan your visit here!
        </Popup>
      </Marker>}
      <MapClickHandler />
    </MapContainer>
  );
}

export default InteractiveMap;
