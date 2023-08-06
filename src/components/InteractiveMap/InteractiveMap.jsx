import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './InteractiveMap.css';

function InteractiveMap({isLoading, viewport, locationDetails, selectedLocation, onMapClick}) {

    function MapClickHandler() {
        const map = useMapEvents({
          click: (e) => {
            onMapClick(e.latlng); 
          },
        });
        return null;
      }

function getLocationDescription(details){
    if(details.city) return `the city ${details.city}`;
    if(details.state) return `the state ${details.state}`;
      return details.country;
      }
  
if(isLoading) return <div>Loading your location.. </div>;

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
          Selected {locationDetails?.country} <br /> Plan your visit to {getLocationDescription(locationDetails)}!
        </Popup>
      </Marker>}
      <MapClickHandler />
    </MapContainer>
  );
}

export default InteractiveMap;
