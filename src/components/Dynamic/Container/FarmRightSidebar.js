import { Box, Skeleton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
import useApi from 'context/api'

export default function FarmRightSidebar({ state, farms }) {
  const [scheduledTasks, setScheduledTasks] = React.useState([])
  const [farmfeeds, setFarmFeeds] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { getMyScheduledTasks, getMyFarmFeeds } = useApi()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getMyScheduledTasks({ farm: farms })
        setScheduledTasks(res.data)

        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [farms, getMyScheduledTasks])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        const res = await getMyFarmFeeds({ farm: farms })
        setFarmFeeds(res.data)

        setLoading('done')
      } catch (error) {
        setLoading('done')
        setError(error)
      }
    }
    fetchData()
  }, [farms, getMyFarmFeeds])

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
        farmfeeds={farmfeeds}
        farms={farms}
      />
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string,
  farms: PropTypes.any,
  farmfeeds: PropTypes.any
}
