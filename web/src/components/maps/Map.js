import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const mapKey = process.env.YOUR_GOOGLE_MAPS_API_KEY

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: 40.416775,
  lng: -3.703790
};

function PostMap({ posts }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { posts }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(PostMap)