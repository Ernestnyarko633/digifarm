/* eslint-disable no-console */
import React from 'react'
import useMap from '../../hooks/useMap'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import configs from '../../utils/configs'
import './Map.css'

const Map = ({
  center,
  viewID,
  loading,
  error,
  band,
  digitalFarmerFarms,
  results,
  height,
  _error,
  reloads,
  zoom,
  ...rest
}) => {
  const { EOS_API, EOS_API_KEY } = configs()
  const BAND = 'B11,B8A,B02'
  const onInitHandler = map => {
    // Add data and events here
    map.on('load', function () {
      map.addSource('tms-source', {
        type: 'raster',
        tiles: [
          `${EOS_API}/render/${viewID}/${
            band || BAND
          }/{z}/{x}/{y}?api_key=${EOS_API_KEY}`
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
    zoom: zoom,
    height: height
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
  digitalFarmerFarms: PropTypes.array,
  results: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.array,
  zoom: PropTypes.number.isRequired,
  band: PropTypes.string.isRequired,
  height: PropTypes.any
}

export default Map
