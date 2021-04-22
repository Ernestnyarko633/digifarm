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
  height,
  reloads,
  zoom,
  ...rest
}) => {
  const ENV = process.env.REACT_APP_ENVIRONMENT
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
        tileSize: 256
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
    center,
    zoom,
    height,
    onInit: onInitHandler
  })
  return <>{viewID && ENV === 'PROD' && <Box {...rest} ref={ref} />}</>
}

Map.propTypes = {
  center: PropTypes.array,
  loading: PropTypes.any,
  error: PropTypes.any,
  viewID: PropTypes.string,
  reloads: PropTypes.array,
  zoom: PropTypes.number,
  band: PropTypes.string,
  height: PropTypes.any
}

export default Map
