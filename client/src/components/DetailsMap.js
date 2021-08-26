import * as React from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

const mapStyles = {
  height: "50vh",
  width: "80%",
};

const ExampleDirections = ({ start, end }) => {
  const [response, setResponse] = React.useState(null);
  const [origin, setOrigin] = React.useState(start);
  const [destination, setDestination] = React.useState(end);
  const defaultCenter = {
    lat: start.lat,
    lng: start.lng,
  };

  // running multiple times
  const directionsServiceOptions = React.useMemo(() => {
    return {
      destination: destination,
      origin: origin,
      travelMode: 'DRIVING',
    }
  })

  // running multiple times
  const directionsCallback = React.useCallback((res) => {
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

  // running multiple times
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
        <div className='map-container' id="map">
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