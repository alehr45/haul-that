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

  // receives response, updates state with response
  const directionsCallback = React.useCallback((res) => {
    // updates state to prevent multiple rerenders
    setOrigin('')
    setDestination('')

    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res)
      } else {
        console.log('response: ', res)
      }
    }
  })

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