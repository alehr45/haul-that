import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
<<<<<<< HEAD
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'

var origin;
var destination;

const center = {
  lat: 0,
  lng: -180,
}

function ExampleDirections({ job, loading }) {
  console.log(
    job.dropoff.address)
  const [response, setResponse] = React.useState(null)
  const travelMode = "DRIVING"
  // origin = toString(job.pickup.lat + " " + job.pickup.lng)
  // destination = toString(job.dropoff.lat + " " + job.dropoff.lng)
  
  // origin = { lat: parseFloat(job.pickup.lat), lng: parseFloat(job.pickup.lng) };
  // destination = { lat: parseFloat(job.dropoff.lat), lng: parseFloat(job.dropoff.lng) };

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
=======
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const DetailsMap = () => {
  const [selected, setSelected] = useState({});

  const origin = { lat: 40.756795, lng: -73.954298 };
  const destination = { lat: 41.756795, lng: -78.954298 };

  //   const onSelect = (job) => {

  //     setSelected(job[0]);

  //   };

  const handleMapRender = () => {
    return (
      <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
        {/* {locations.map((item) => {
            return (
              <Marker
              icon="http://maps.google.com/mapfiles/ms/micons/truck.png"
                key={item[0].name}
                position={item[0].location}
                onClick={() => onSelect(item)}
              />
            );
          })}
          <Marker
            icon="http://maps.google.com/mapfiles/ms/micons/blue-dot.png"
            className="your-location"
            key={"you are here"}
            position={currentLocation}
          />
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p className="map-info">
                <h4>Job #{selected.id}</h4>
                {parseInt(selected.distance)} miles from A to B<br></br>
                <Link to={'/details/'+jobSelected}>Link</Link>
                
              </p>
            </InfoWindow>
          )} */}
      </GoogleMap>
    );
>>>>>>> 393cb630d49fa8fe6c67edc19038b9f1f1aba38c
  };

  const [position, setPosition] = useState({
    lat: 36.1627,
    lng: 86.7816,
  });

<<<<<<< HEAD
=======
  const mapStyles = {
    height: "50vh",
    width: "80%",
  };

>>>>>>> 393cb630d49fa8fe6c67edc19038b9f1f1aba38c
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
<<<<<<< HEAD
    <div className='map'>
    
      <div className='map-container'>
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
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyB_c7GFN8Edf79UFOfpLna7LNX4X7MALHM">
        {handleMapRender(defaultCenter)}
      </LoadScript>
    </div>
  );
};
export default DetailsMap;
>>>>>>> 393cb630d49fa8fe6c67edc19038b9f1f1aba38c
