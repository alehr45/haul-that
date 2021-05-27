import React, { useState } from "react";
import { GoogleMap, LoadScript} from "@react-google-maps/api";


const Map = () => {

  const [position, setPosition] = useState({
    lat: 36.1627,
    lng: 86.7816,
  });

  // locations passed in as props from mutation called on page before
  //   const locations = locations.map((location) => {
  //       return [
  //         {
  //           name: "Location 1",
  //           location: {
  //             // lat: {location.lat},
  //             // lng: {location.long},
  //           },
  //         },
  //       ]
  //   })

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
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {/* {locations.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default Map;
