/* eslint-disable*/
import React from 'react'
import useMap from '../../hooks/useMap'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import useEosApi from 'context/eosApi'
import configs from '../../utils/configs'
import { getRedisClusterClient } from '../../helpers/misc'
import './Map.css'

const Map = ({ center, coords, ...rest }) => {
   const { EOS_API, EOS_API_KEY } = configs()
  //   const VIEW_ID = 'S2/30/N/XM/2021/2/5/0'
  const BAND = 'NDVI'
  
  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const [viewID, setViewID] = React.useState('')
  const { getEOSViewID } = useEosApi()


  React.useEffect(() => {
    let redisClient = getRedisClusterClient()
    let _payload = {
      fields: ['sceneID', 'cloudCoverage'],
      limit: 1,
      page: 1,
      search: {
        date: {
          from: '2021-01-01',
          to: '2021-02-08'
        },
        cloudCoverage: {
          from: 0,
          to: 60
        },
        shape: {
          type: 'Polygon',
          coordinates: [
            [
              [-1.531048, 5.578849],
              [-1.530683, 5.575411],
              [-1.521606, 5.576286],
              [-1.522036, 5.579767],
              [-1.531048, 5.578849]
            ]
          ]
        }
      },
      sort: {
        date: 'desc'
      }
    }

    const fetchData = async payload => {
      try {
        setLoading('fetching')
        const res = await getEOSViewID(payload)
        console.log(res, 'myresults')
        setViewID(res.results[0].view_id)
        console.log(res.results, "results")
        redisClient.setex(redisKey, 86400, JSON.stringify(res.results[0].view_id))
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData(_payload)
  }, [BAND])
  const onInitHandler = map => {
    // Add data and events here
    map.on('load', function () {
        map.addSource('tms-source', {
          type: 'raster',
          tiles: [
            `${EOS_API}/render/${viewID}/${BAND}/{z}/{x}/{y}?api_key=${EOS_API_KEY}`
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
    center: [-1.521606, 5.576286] || center,
    onInit: onInitHandler,
    zoom: 9,
    height: 1000
  })

  return (
    <React.Fragment>
      { <Box {...rest} ref={ref} />}
    </React.Fragment>
  )
}

Map.propTypes = {
  coords: PropTypes.any,
  center: PropTypes.any
}

export default Map
