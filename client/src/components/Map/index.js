import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = ({ jobs, loading }) => {
  const [selected, setSelected] = useState({});

  const onSelect = (job) => {
    console.log(job);
    setSelected(job[0]);
  };

  const handleMapRender = (currentLocation) => {
    if (!loading) {
      const locations = jobs[0].map((location) => {

        return [
          {
            name: location._id,
            location: {
              lat: parseFloat(location.pickup.lat),
              lng: parseFloat(location.pickup.lng),
            },
            distance: location.distance,
            id: location.id,
          },
        ];
      });

      return (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={defaultCenter}
        >
          {locations.map((item) => {
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
                {parseInt(selected.distance)} miles from A to B
              </p>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    }
  };

  const [position, setPosition] = useState({
    lat: 36.1627,
    lng: 86.7816,
  });

  const mapStyles = {
    height: "50vh",
    width: "80%",
  };

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
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyB_c7GFN8Edf79UFOfpLna7LNX4X7MALHM">
        {handleMapRender(defaultCenter)}
      </LoadScript>
    </div>
  );
};
export default Map;
