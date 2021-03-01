import React from 'react'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import useApi from 'context/api'
import useEosApi from 'context/eosApi'
import { getRedisClusterClient } from 'helpers/misc'

import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'

export default function FarmLayout({ children, ...rest }) {
  let redisClient = getRedisClusterClient()
  const [state, setState] = React.useState('compA')
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [digitalFarmerFarm, setDigitalFarmerFarm] = React.useState([])
  const [eosTaskID, setEosTaskID] = React.useState('')
  const [eosStats, setEosStats] = React.useState([])
  const { getMyFarm } = useApi()
  const { createEOSTaskForStats, getEOSStatistics } = useEosApi()
  const [location, setLocation] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getMyFarm(id)
        setDigitalFarmerFarm(res.data)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    id && fetchData()
  }, [getMyFarm, id, setLoading])

  React.useEffect(() => {
    let location_ = []
    let _location = digitalFarmerFarm?.order?.product?.location
    const getCoords = () =>
      _location?.coords?.forEach(coordinate => {
        return location_?.push(
          coordinate.split(',').map(item => {
            return parseFloat(item, 10)
          })
        )
      })
    getCoords()
    setLocation(location_)
  }, [digitalFarmerFarm])

  React.useEffect(() => {
    let redisKey = 'healthStatsTask'
    let _payload = {
      type: 'mt_stats',
      params: {
        bm_type: '(B08-B04)/(B08+B04)',
        date_start: '2020-12-01',
        date_end: '2020-12-31',
        geometry: {
          coordinates: [[location]],
          type: 'Polygon'
        },
        reference: 'ref_20210208-00-00',
        sensors: ['sentinel2'],
        max_cloud_cover_in_aoi: 0,
        limit: 5
      }
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await createEOSTaskForStats(_payload)
        setEosTaskID(res?.task_id)
        redisClient.setex(redisKey, 86400, JSON.stringify(res?.task_id))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    redisClient.get(redisKey, function (err, data) {
      if (data) {
        return setEosTaskID(data)
      }
      if (err) {
        // console.log(err)
        return location && fetchData()
      }

      return location && fetchData()
    })
    // location && fetchData()
  }, [createEOSTaskForStats, location, redisClient])

  React.useEffect(() => {
    let redisKey = 'healthStats'
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getEOSStatistics(eosTaskID)
        setEosStats(res?.result)
        redisClient.setex(redisKey, 86400, JSON.stringify(res?.result))
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    redisClient.get(redisKey, function (err, data) {
      if (data) {
        return setEosStats(data)
      }
      if (err) {
        // console.log(err)
        return fetchData()
      }

      return fetchData()
    })
    //fetchData()
  }, [eosTaskID, getEOSStatistics, redisClient])
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='17% 53% 30%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem shadow='xl'>
        <FarmLeftSideBar state={state} setState={setState} />
      </GridItem>
      <GridItem>
        <Box
          minW={{ lg: '53%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow='xl'>
        {error && (
          <Box>
            <Text fontSize='md' ml={2} color='cf.400'>
              Something went wrong
            </Text>
          </Box>
        )}

        {!loading && !error && (
          <FarmRightSidebar
            state={state}
            eosStats={eosStats}
            digitalFarmerFarm={digitalFarmerFarm}
            location={location}
          />
        )}
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.any
}
