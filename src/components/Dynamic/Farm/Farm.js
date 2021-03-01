import { Box, Flex } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import FarmLayout from './FarmLayout'
import Map from 'components/Map/Map'
import useEosApi from 'context/eosApi'
import { getRedisClusterClient } from '../../../helpers/misc'

export default function Farm({ onOpen, digitalFarmerFarms }) {
  let redisClient = getRedisClusterClient()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [viewID, setViewID] = React.useState('')
  const [results, setResults] = React.useState([])
  const { getEOSViewID, createEOSTaskForStats, getEOSStatistics } = useEosApi()
  const [eosTaskID, setEosTaskID] = React.useState('')
  const [location, setLocation] = React.useState([])

  React.useEffect(() => {
    let location_ = []
    digitalFarmerFarms?.forEach(farm => {
      let _location = farm?.order?.product?.location

      _location?.coords?.forEach(coordinate => {
        location_?.push(
          coordinate.split(',').map(item => {
            return parseFloat(item, 10)
          })
        )
      })
    })
    setLocation(location_)
  }, [digitalFarmerFarms])

  React.useEffect(() => {
    let redisKey = 'viewID'
    let _payload = {
      fields: ['sceneID', 'cloudCoverage'],
      limit: 1,
      page: 1,
      search: {
        satellites: ['sentinel2', 'landsat8'],
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
          coordinates: [location]
        }
      },
      sort: {
        date: 'desc'
      }
    }
    const fetchData = async payload => {
      try {
        setLoading(true)
        const res = await getEOSViewID(payload, 'multi')
        setViewID(res?.results[0]?.view_id)
        setResults(res?.results)

        redisClient.setex(
          redisKey,
          86400,
          JSON.stringify(res.results[0].view_id)
        )
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    redisClient.get(redisKey, function (err, data) {
      if (data) {
        return setViewID(data)
      }
      if (err) {
        //   console.log(err)
        return location && fetchData(_payload)
      }

      return location && fetchData(_payload)
    })
    //  location && fetchData(_payload)
  }, [getEOSViewID, digitalFarmerFarms, location, redisClient])

  React.useEffect(() => {
    let redisKey = 'statsTask'
    let _payload = {
      type: 'lbe',
      params: {
        view_id: viewID,
        bands: ['B02', 'B03', 'B04'],
        geometry: {
          type: 'Polygon',
          coordinates: [location]
        },
        merge: true,

        reference: 'ref_datetime'
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
        //console.log(err)
        return location && fetchData()
      }

      return location && fetchData()
    })
    //  location && fetchData()
  }, [createEOSTaskForStats, viewID, location, redisClient])

  const DownloadVisual = async downloadTaskID => {
    try {
      setLoading(true)
      await getEOSStatistics(downloadTaskID)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  // console.log(location, 'my location')
  return (
    <FarmLayout>
      <Box h={{ md: 128 }} w='100%'>
        <Box
          h='100%'
          w='100%'
          objectFit='cover'
          as={Map}
          viewID={viewID}
          loading={loading}
          error={error}
          center={[-1.531048, 5.578849]}
          results={results}
        />
      </Box>
      <Flex align='center' justify='flex-end' my={{ md: 6 }} px={{ md: 6 }}>
        <Button
          btntitle='Download'
          bg='white'
          borderWidth={2}
          borderColor='cf.400'
          rounded='30px'
          mr={6}
          _hover={{ bg: 'white' }}
          color='cf.400'
          h={12}
          w={{ md: 40 }}
          shadow='none'
          isLoading={loading}
          isDisabled={loading}
          onClick={() => DownloadVisual(eosTaskID)}
        />
        <Button
          btntitle='Share'
          rounded='30px'
          h={12}
          w={{ md: 40 }}
          onClick={onOpen}
        />
      </Flex>
    </FarmLayout>
  )
}

Farm.propTypes = {
  onOpen: PropTypes.func,
  digitalFarmerFarms: PropTypes.any
}
