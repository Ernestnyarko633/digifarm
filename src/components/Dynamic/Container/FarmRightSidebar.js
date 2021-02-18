import { Box, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
import useApi from 'context/api'
import useEosApi from 'context/eosApi'

export default function FarmRightSidebar({ state, digitalFarmerFarm }) {
  const [scheduledTasks, setScheduledTasks] = React.useState([])
  const [farmfeeds, setFarmFeeds] = React.useState([])
  const [weatherForeCasts, setWeatherForeCasts] = React.useState([])
  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const { getMyScheduledTasks, getMyFarmFeeds } = useApi()
  const { getEOSWeatherForeCast } = useEosApi()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        const res = await getMyScheduledTasks({
          farm: digitalFarmerFarm?.order?.product?._id
        })
        setScheduledTasks(res.data)

        setLoading('done')
      } catch (error) {
        setLoading('done')
        setError(error)
      }
    }
    fetchData()
  }, [digitalFarmerFarm, getMyScheduledTasks])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        const res = await getMyFarmFeeds({
          farm: digitalFarmerFarm?.order?.product?._id
        })
        setFarmFeeds(res.data)

        setLoading('done')
      } catch (error) {
        setLoading('done')
        setError(error)
      }
    }
    fetchData()
  }, [digitalFarmerFarm, getMyFarmFeeds])

  React.useEffect(() => {
    let _payload = {
      geometry: {
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
    }
    const fetchData = async () => {
      try {
        setLoading('fetching')
        const res = await getEOSWeatherForeCast(_payload)
        setWeatherForeCasts(res)

        setLoading('done')
      } catch (error) {
        setLoading('done')
        setError(error)
      }
    }
    fetchData()
  }, [getEOSWeatherForeCast, digitalFarmerFarm])

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
      {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}
      {loading === 'done' && (
        <DynamicCard
          card={state}
          scheduledTasks={scheduledTasks}
          weatherForeCasts={weatherForeCasts}
          farmfeeds={farmfeeds}
          farm={digitalFarmerFarm}
          loading={loading}
          error={error}
        />
      )}
      {loading === 'done' && error && (
        <Box>
          <Text fontSize='md' ml={2} color='cf.400'>
            Something went wrong
          </Text>
        </Box>
      )}
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string,
  digitalFarmerFarm: PropTypes.string.isRequired
}
