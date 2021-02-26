import { Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
import useApi from 'context/api'
import useEosApi from 'context/eosApi'

export default function FarmRightSidebar({
  state,
  digitalFarmerFarm,
  eosStats,
  location
}) {
  const [scheduledTasks, setScheduledTasks] = React.useState([])
  const [farmfeeds, setFarmFeeds] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { getMyScheduledTasks, getMyFarmFeeds } = useApi()
  const { getEOSWeatherForeCast } = useEosApi()
  const [weatherForeCasts, setWeatherForeCasts] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getMyFarmFeeds({
          farm: digitalFarmerFarm?.order?.product?._id
        })
        setFarmFeeds(res.data)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [digitalFarmerFarm, getMyFarmFeeds])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getMyScheduledTasks({
          farm: digitalFarmerFarm?.order?.product?._id
        })
        setScheduledTasks(res.data)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [digitalFarmerFarm, getMyScheduledTasks])

  React.useEffect(() => {
    let _payload = {
      geometry: {
        type: 'Polygon',
        coordinates: [location]
      }
    }
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getEOSWeatherForeCast(_payload)
        setWeatherForeCasts(res)

        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    location && fetchData()
  }, [getEOSWeatherForeCast, digitalFarmerFarm, location])

  if (loading) {
    return (
      <Stack p={10} mt={24} spacing={4}>
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
      </Stack>
    )
  }

  if (error) {
    return (
      <Box>
        <Text fontSize='md' ml={2} color='cf.400'>
          Something went wrong
        </Text>
      </Box>
    )
  }

  return (
    <Box
      py={8}
      right={0}
      bg='white'
      as='rightsidebar'
      bottom={0}
      pos='fixed'
      px={{ md: 8 }}
      h={{ lg: '84vh' }}
      w={{ md: '30%' }}
      shadow='md'
      overflowY='scroll'
    >
      <DynamicCard
        card={state}
        scheduledTasks={scheduledTasks}
        weatherForeCasts={weatherForeCasts}
        farmfeeds={farmfeeds}
        farm={digitalFarmerFarm}
        loading={loading}
        error={error}
        eosStats={eosStats}
      />
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string,
  digitalFarmerFarm: PropTypes.string.isRequired,
  eosStats: PropTypes.any,
  location: PropTypes.any
}
