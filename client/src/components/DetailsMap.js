<<<<<<< HEAD
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
=======
import * as React from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const mapStyles = {
  height: "60vh",
  width: "70%",
};

const ExampleDirections = ({ start, end }) => {
  const [response, setResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState(start);
  const [destination, setDestination] = React.useState(end);
  const defaultCenter = {
    lat: start.lat,
    lng: start.lng,
  };

  // returns object to receive a response
  const directionsServiceOptions = React.useMemo(() => {
    return {
      destination: destination,
      origin: origin,
      travelMode: 'DRIVING',
    }
  })
>>>>>>> 4c65ef3563da2eadbfe48265a98754d241ec01e8

  // receives response, updates state with response
  const directionsCallback = React.useCallback((res) => {
    // updates state to prevent multiple rerenders
    setOrigin('')
    setDestination('')

<<<<<<< HEAD
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
=======
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res)
      } else {
        console.log('response: ', res)
      }
    }
  })
>>>>>>> 4c65ef3563da2eadbfe48265a98754d241ec01e8

  // sets directions with response
  const directionsRendererOptions = React.useMemo(() => {
    if (response !== null) {
      return {
        directions: response,
      }
    }
  })

  

  return (
    <div className='map'>
<<<<<<< HEAD
    
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
=======
      <div className='map-settings'>
        <div className='map-container details-map' id="map">
          <LoadScript googleMapsApiKey="AIzaSyB_c7GFN8Edf79UFOfpLna7LNX4X7MALHM">
            <GoogleMap
              id='direction-example'
              mapContainerStyle={mapStyles}
              zoom={11}
              center={defaultCenter}
            >
              {destination !== '' && origin !== '' && (
                <DirectionsService
                  options={directionsServiceOptions}
                  callback={directionsCallback}
                />
              )}

              {response !== null && (
                <DirectionsRenderer 
                  options={directionsRendererOptions}
                  />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ExampleDirections);
>>>>>>> 4c65ef3563da2eadbfe48265a98754d241ec01e8
