import React, { useEffect, useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const LiveTracking = ({ destination }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Watch position
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(coords);
        },
        (error) => console.error('Geolocation error:', error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert('Geolocation not supported.');
    }
  }, []);

  // Get directions only after Google Maps script is loaded
  useEffect(() => {
    if (isGoogleLoaded && currentPosition && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: currentPosition,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error('Directions error:', status);
          }
        }
      );
    }
  }, [isGoogleLoaded, currentPosition, destination]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      onLoad={() => setIsGoogleLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: 28.6139, lng: 77.2090 }}
        zoom={currentPosition ? 14 : 2}
      >
        {currentPosition && <Marker position={currentPosition} />}
        {destination && <Marker position={destination} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
