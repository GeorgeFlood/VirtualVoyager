import { useState, useEffect } from "react";
import InteractiveMap from "./components/InteractiveMap/InteractiveMap"

function App() {

  const [viewport, setViewport] = useState({
    latitude: 55.7577, // Default location
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



  return <div>
    <InteractiveMap isLoading={isLoading} onMapClick={handleMapClick} viewport={viewport} locationDetails={locationDetails} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
  </div>
}

export default App
