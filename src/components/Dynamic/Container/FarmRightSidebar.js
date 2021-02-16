import { Box, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
import useApi from 'context/api'

export default function FarmRightSidebar({ state, digitalFarmerFarm }) {
  const [scheduledTasks, setScheduledTasks] = React.useState([])
  const [farmfeeds, setFarmFeeds] = React.useState([])
  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const { getMyScheduledTasks, getMyFarmFeeds } = useApi()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        const res = await getMyScheduledTasks({ farm: digitalFarmerFarm })
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
        const res = await getMyFarmFeeds({ farm: digitalFarmerFarm })
        setFarmFeeds(res.data)

        setLoading('done')
      } catch (error) {
        setLoading('done')
        setError(error)
      }
    }
    fetchData()
  }, [digitalFarmerFarm, getMyFarmFeeds])
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
          farmfeeds={farmfeeds}
          farm={digitalFarmerFarm}
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
  digitalFarmerFarm: PropTypes.string.isRequired,
  farmfeeds: PropTypes.array.isRequired
}
