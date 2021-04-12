/* eslint-disable no-console */
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Icon,
  Spinner,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { Crop, Updates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import WeatherCards from '../Cards/WeatherCards'
import PropTypes from 'prop-types'

export default function Tasks({
  scheduledTasks,
  farmfeeds,
  loading,
  error,
  _error,
  farm,
  weatherForeCasts,
  eosStats
}) {
  const [feeds, setFeeds] = React.useState([])

  React.useEffect(() => {
    const getFeeds = () =>
      farmfeeds?.forEach(feed => {
        setFeeds(p => [...p, ...feed.data])
      })

    getFeeds()
  }, [farmfeeds])

  const getTodaysTasks = (scheduledTasks, type) => {
    let today = new Date().toLocaleDateString()

    let comparant = value => new Date(value).toLocaleDateString()

    if (scheduledTasks) {
      if (type === 'today') {
        const res = scheduledTasks?.filter(
          task => today === comparant(task?.startDate)
        )

        return res
      }

      if (type === 'scheduled') {
        const res = scheduledTasks?.filter(
          task => today !== comparant(task?.startDate)
        )

        return res
      }
    }

    return []
  }

  const mapKey = index => index

  const health = value => {
    if (value >= 0.2 && value <= 1.0) return true
    return false
  }

  if (loading) {
    return <Spinner size='lg' color='cf.400' />
  }

  return (
    <Box mb={8}>
      {scheduledTasks.length > 0 && (
        <>
          {getTodaysTasks(scheduledTasks, 'today').map((today, index) => (
            <FarmUpdateCard
              key={mapKey(index)}
              title='TODAY’S TASK'
              duration={today?.task?.duration}
              subtitle={today?.task?.name}
              text={today[0]?.description?.replace(/<[^>]*>/g, '')}
              icon={BiTime}
            />
          ))}
        </>
      )}
      <WeatherCards
        farmfeeds={feeds}
        loading={loading}
        error={error}
        weatherForeCasts={weatherForeCasts}
      />
      <Grid gap={8}>
        {scheduledTasks.length > 0 &&
          getTodaysTasks(scheduledTasks, 'scheduled') && (
            <React.Fragment>
              <FarmUpdateCard
                title='SCHEDULED TASK'
                duration={
                  getTodaysTasks(scheduledTasks, 'scheduled')[0]?.task?.duration
                }
                subtitle={
                  getTodaysTasks(scheduledTasks, 'scheduled')[0]?.task?.title
                }
                text={getTodaysTasks(
                  scheduledTasks,
                  'scheduled'
                )[0]?.description.replace(/<[^>]*>/g, '')}
                icon={BiTime}
              />
            </React.Fragment>
          )}
        {feeds.length && (
          <FarmUpdateCard
            title='FARM MANAGER UPDATE'
            duration={feeds[0]?.task?.duration}
            subtitle={feeds[0]?.task?.title}
            text={feeds[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
            icon={Updates}
          />
        )}
        {eosStats?.length > 0 && !_error && (
          <Box
            bg='white'
            w='100%'
            rounded='20px'
            filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
            p={8}
          >
            <Flex
              align='center'
              justify='space-between'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              pb={3}
            >
              <Text fontWeight={900}>
                <Icon as={Crop} mr={1} />
                CROP HEALTH
              </Text>
              <Text color='gray.500' fontSize='sm'>
                3m ago
              </Text>
            </Flex>

            {eosStats?.length > 0 && (
              <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6} mt={5}>
                <Box>
                  <Text mb={4} fontSize='sm'>
                    Plant health
                  </Text>
                  <CircularProgress
                    value={(
                      eosStats[eosStats?.length - 1]?.indexes?.EVI?.average *
                      100
                    )?.toFixed(0)}
                    size='100px'
                    color={
                      health(
                        eosStats[eosStats?.length - 1]?.indexes?.EVI?.average
                      )
                        ? 'cf.400'
                        : '#ff0000'
                    }
                  >
                    <CircularProgressLabel rounded='lg'>
                      {eosStats[
                        eosStats?.length - 1
                      ]?.indexes?.EVI?.average?.toFixed(2)}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Box>
                  <Text fontSize='xs' fontWeight={300}>
                    Crop productivity
                  </Text>

                  <CircularProgress
                    value={(
                      eosStats[eosStats?.length - 1]?.indexes?.NDVI?.average *
                      100
                    )?.toFixed(0)}
                    size='100px'
                    color='cf.400'
                    mt={2}
                  >
                    <CircularProgressLabel rounded='lg'>
                      {eosStats[
                        eosStats?.length - 1
                      ]?.indexes?.NDVI?.average?.toFixed(2)}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Box>
                  <Text fontSize='xs' fontWeight={300}>
                    Chlorophyl index
                  </Text>

                  <CircularProgress
                    value={(
                      eosStats[eosStats?.length - 1]?.indexes?.CCCI?.average *
                      100
                    )?.toFixed(0)}
                    size='100px'
                    color='cf.400'
                    mt={2}
                  >
                    <CircularProgressLabel rounded='lg'>
                      {eosStats[
                        eosStats?.length - 1
                      ]?.indexes?.CCCI?.average?.toFixed(2)}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Grid>
            )}
          </Box>
        )}
      </Grid>
    </Box>
  )
}

Tasks.propTypes = {
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  _error: PropTypes.any,
  farm: PropTypes.any,
  weatherForeCasts: PropTypes.any,
  eosStats: PropTypes.any
}
