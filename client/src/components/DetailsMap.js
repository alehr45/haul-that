import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

var origin;
var destination;

const center = {
  lat: 0,
  lng: -180,
}

function ExampleDirections({ job }) {
  console.log(
    job.dropoff.address)
  const [response, setResponse] = React.useState(null)
  const travelMode = "DRIVING"
  // origin = toString(job.pickup.lat + " " + job.pickup.lng)
  // destination = toString(job.dropoff.lat + " " + job.dropoff.lng)
  
  origin = { lat: parseFloat(job.pickup.lat), lng: parseFloat(job.pickup.lng) };
  destination = { lat: parseFloat(job.dropoff.lat), lng: parseFloat(job.dropoff.lng) };

  const directionsCallback = React.useCallback((res) => {
    console.log(res)

    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res)
      } else {
        console.log('response: ', res)
      }
    }
  }, [])

  const directionsServiceOptions = React.useMemo(() => {
    return {
      destination: destination,
      origin: origin,
      travelMode: travelMode,
    }
  }, [])

  const directionsRendererOptions = React.useMemo(() => {
    return {
      directions: response,
    }
  }, [])

  const mapStyles = {
    height: "50vh",
    width: "80%",
  };

  const [position, setPosition] = useState({
    lat: 36.1627,
    lng: 86.7816,
  });

  // Get users location and set
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setPosition(pos);
  });

  const defaultCenter = {
    lat: position.lat,
    lng: position.lng,
  };

  

  return (
    <div className='map'>
    
      <div className='map-container'>
        <LoadScript googleMapsApiKey="AIzaSyB_c7GFN8Edf79UFOfpLna7LNX4X7MALHM">
          <GoogleMap
            id='direction-example'
            mapContainerStyle={mapStyles}
            zoom={12}
            center={origin} 
          >
            {destination !== '' && origin !== '' && (
              <DirectionsService
                options={directionsServiceOptions}
                callback={directionsCallback}
              />
            )}

            {response !== null && (
              <DirectionsRenderer options={directionsRendererOptions} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
   
  )
  
}

export default React.memo(ExampleDirections)