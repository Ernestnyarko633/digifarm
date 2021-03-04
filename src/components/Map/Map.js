import React from 'react'
import useMap from '../../hooks/useMap'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import configs from '../../utils/configs'
//import { getRedisClusterClient } from '../../helpers/misc'
import './Map.css'

const Map = ({
  center,
  viewID,
  loading,
  error,
  digitalFarmerFarms,
  results,
  _error,
  reloads,
  ...rest
}) => {
  const { EOS_API, EOS_API_KEY } = configs()
  const BAND = 'MSAVI'
  // console.log(
  //   'testing',
  //   viewID,
  //   center,
  //   loading,
  //   `${EOS_API}/render/${viewID}/${BAND}/{z}/{x}/{y}?api_key=${EOS_API_KEY}`
  // )
  const onInitHandler = map => {
    // Add data and events here
    map.on('load', function () {
      map.addSource('tms-source', {
        type: 'raster',
        tiles: [
          `${EOS_API}/render/${viewID}/${BAND}/{z}/{x}/{y}?api_key=${EOS_API_KEY}`
        ],

        // tiles: [
        //   `${EOS_API}/render/${viewID}/NDVI/{z}/{x}/{y}?api_key=${EOS_API_KEY}`
        // ],
        tileSize: 256
        /* "bounds": [3.38, 50.73, 7.2432, 53.5455] */
      })
      map.addLayer(
        {
          id: 'tms-layer',
          type: 'raster',
          source: 'tms-source'
        },
        'aeroway-line'
      )
    })
  }

  const { ref } = useMap({
    center: center,
    onInit: onInitHandler,
    zoom: 14,
    height: 1000
  })

  return (
    <React.Fragment>{viewID && <Box {...rest} ref={ref} />}</React.Fragment>
  )
}

Map.propTypes = {
  center: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  viewID: PropTypes.any,
  digitalFarmerFarms: PropTypes.any,
  results: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.any
}

export default Map
