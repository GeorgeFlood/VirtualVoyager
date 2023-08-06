import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './InteractiveMap.css';

function InteractiveMap({viewport, locationDetails, selectedLocation, onMapClick}) {

    function MapClickHandler() {
        const map = useMapEvents({
          click: (e) => {
            onMapClick(e.latlng); // Call the function passed as a prop
          },
        });
        return null;
      }
  
  return (
    <MapContainer className="map-container" center={[viewport.latitude, viewport.longitude]} zoom={4}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[viewport.latitude, viewport.longitude]}>
        <Popup>
         You are here!
        </Popup>
      </Marker>
      {selectedLocation && <Marker position={selectedLocation}>
        <Popup>
          Selected {locationDetails?.country} <br /> Plan your visit {locationDetails?.city ? locationDetails.city : locationDetails.state}!
        </Popup>
      </Marker>}
      <MapClickHandler />
    </MapContainer>
  );
}

export default InteractiveMap;
