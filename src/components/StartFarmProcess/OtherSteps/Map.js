import React from 'react'
import { Box } from '@chakra-ui/react'
import ReactMapGL, {
  // Layer,
  // Source,
  ScaleControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl
} from 'react-map-gl'
// import { dataJS, layer } from 'assets/data/mapdata'

import getConfig from 'utils/configs'

const Map = () => {
  const { MAPBOX_API } = getConfig()

  // const sourceRef = React.useRef(null)
  const [viewport, setViewport] = React.useState({
    latitude: 6.840278,
    longitude: -0.398889,
    width: '36vw',
    height: '70vh',
    zoom: 15.9
  })

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_API}
      onViewportChange={_viewport => {
        setViewport(_viewport)
      }}
    >
      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <ScaleControl maxWidth={100} unit='metric' />
      </Box>
      <Box style={{ position: 'absolute', top: 5, left: 5 }}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
      </Box>
      <Box style={{ position: 'absolute', top: 35, left: 5 }}>
        <FullscreenControl />
      </Box>
      <Box style={{ position: 'absolute', top: 65, left: 5 }}>
        <NavigationControl />
      </Box>
      {/* <Source type='geojson' data={dataJS} ref={sourceRef} cluster={false}>
        <Layer {...layer} />
        Type
      </Source> */}
    </ReactMapGL>
  )
}

export default Map
