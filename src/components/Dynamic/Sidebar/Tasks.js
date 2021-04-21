import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Icon,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import { Crop, Updates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import WeatherCards from '../Cards/WeatherCards'
import PropTypes from 'prop-types'
import FetchCard from 'components/FetchCard'

export default function Tasks({
  scheduledTasks,
  farmfeeds,
  weatherForeCasts,
  eosStats,
  //loading
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  WeatherForeCastsIsLoading,
  EOSStatisticsIsLoading,
  //errors
  WeatherForeCastsHasError,
  farmFeedsHasError,
  ScheduledTasksHasError,
  EOSStatisticsHasError
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

  return (
    <Box mb={8}>
      {ScheduledTasksIsLoading || ScheduledTasksHasError ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => null}
            loading={ScheduledTasksIsLoading}
            error={ScheduledTasksHasError}
            text={"Standby as we load your farm's scheduled tasks"}
          />
        </Box>
      ) : (
        <>
          {scheduledTasks.length > 0 && (
            <>
              {getTodaysTasks(scheduledTasks, 'today').map((today, index) => (
                <>
                  <FarmUpdateCard
                    key={mapKey(index)}
                    title='TODAY’S TASK'
                    duration={today?.task?.duration}
                    subtitle={today?.task?.title}
                    text={today?.task?.description?.replace(/<[^>]*>/g, '')}
                    icon={BiTime}
                  />
                </>
              ))}
            </>
          )}
        </>
      )}

      <WeatherCards
        farmfeeds={feeds}
        weatherForeCasts={weatherForeCasts}
        WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
        farmFeedsIsLoading={farmFeedsIsLoading}
        WeatherForeCastsHasError={WeatherForeCastsHasError}
        farmFeedsHasError={farmFeedsHasError}
      />
      <Grid gap={8}>
        {ScheduledTasksIsLoading || ScheduledTasksHasError ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => null}
              loading={ScheduledTasksIsLoading}
              error={ScheduledTasksHasError}
              text={"Standby as we load your farm's scheduled tasks"}
            />
          </Box>
        ) : (
          <>
            {scheduledTasks.length > 0 &&
              getTodaysTasks(scheduledTasks, 'scheduled').length > 0 &&
              getTodaysTasks(
                scheduledTasks,
                'scheduled'
              )?.map((today, index) => (
                <React.Fragment key={mapKey(index)}>
                  {index === 0 && (
                    <FarmUpdateCard
                      title='SCHEDULED TASK'
                      duration={today?.task?.duration}
                      subtitle={today?.task?.title}
                      text={today?.task?.description.replace(/<[^>]*>/g, '')}
                      icon={BiTime}
                    />
                  )}
                </React.Fragment>
              ))}
          </>
        )}

        {farmFeedsIsLoading || farmFeedsHasError ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => null}
              loading={farmFeedsIsLoading}
              error={farmFeedsHasError}
              text={"Standby as we load your farm's feed"}
            />
          </Box>
        ) : (
          <>
            {feeds.length > 0 && (
              <FarmUpdateCard
                title='FARM MANAGER UPDATE'
                duration={feeds[0]?.task?.duration}
                subtitle={feeds[0]?.task?.title}
                text={feeds[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
                icon={Updates}
              />
            )}
          </>
        )}

        {EOSStatisticsIsLoading || EOSStatisticsHasError ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => null}
              loading={EOSStatisticsIsLoading}
              error={EOSStatisticsHasError}
              text={"Standby as we load your farm's stats"}
            />
          </Box>
        ) : (
          <>
            {eosStats?.length >
              0(
                <Box
                  bg='white'
                  w='100%'
                  rounded='20px'
                  filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
                  p={8}
                  mt={{ base: 4, md: 0 }}
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
                    <Grid
                      templateColumns={{
                        base: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                      }}
                      gap={6}
                      mt={5}
                    >
                      <Box>
                        <Text mb={4} fontSize='sm'>
                          Plant health
                        </Text>
                        <CircularProgress
                          value={(
                            eosStats[eosStats?.length - 1]?.indexes?.EVI
                              ?.average * 100
                          )?.toFixed(0)}
                          size='100px'
                          color={
                            health(
                              eosStats[eosStats?.length - 1]?.indexes?.EVI
                                ?.average
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
                            eosStats[eosStats?.length - 1]?.indexes?.NDVI
                              ?.average * 100
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
                            eosStats[eosStats?.length - 1]?.indexes?.CCCI
                              ?.average * 100
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
          </>
        )}
      </Grid>
    </Box>
  )
}

Tasks.propTypes = {
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  weatherForeCasts: PropTypes.any,
  eosStats: PropTypes.any,
  farmFeedsIsLoading: PropTypes.bool,
  EOSStatisticsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  EOSStatisticsHasError: PropTypes.any
}
