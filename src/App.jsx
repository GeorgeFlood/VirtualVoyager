import { useState, useEffect } from "react";
import InteractiveMap from "./components/InteractiveMap/InteractiveMap"
import InteractiveSideBar from './components/InteractiveSideBar/InteractiveSideBar'
import LocationInfo from './components/LocationInfo/LocationInfo'
import DateRange from "./components/DateRange/DateRange";

import './app.css';

function App() {

  const [viewport, setViewport] = useState({
    latitude: 55.7577, 
    longitude: -122.4376,
    zoom: 8
  });
  const [isLoading, setIsLoading] = useState(true);
  const [locationDetails, setLocationDetails] = useState({
    country: null,
    city: null,
    state: null
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 11
      });
      setIsLoading(false)
    });
  }, []);
  
console.log(startDate, endDate)

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        setLocationDetails({
          country: data.address.country,
          city: data.address.city,
          state: data.address.state
        });
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  };



  
  return (
    <div>
      <div className="map-and-sidebar">
      <InteractiveMap isLoading={isLoading} onMapClick={handleMapClick} viewport={viewport} locationDetails={locationDetails} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
     {selectedLocation && <InteractiveSideBar details={locationDetails}/>}
      </div>

      <div>
            <LocationInfo selectedLocation={selectedLocation} details={locationDetails}/>
        <DateRange startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} locationDetails={locationDetails} selectedLocation={selectedLocation}/>
      </div>
    </div>
  );
}

export default App
