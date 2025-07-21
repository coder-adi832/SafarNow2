import React, { useEffect, useState } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => console.error('Geolocation error:', error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}, [])


  return (
    <LoadScript googleMapsApiKey ={import.meta.env.VITE_GOOGLE_MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: 28.6139, lng: 77.2090 }}
        zoom={currentPosition ? 15 : 2}
      >
        {currentPosition && (
          <Marker position={currentPosition} />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking
