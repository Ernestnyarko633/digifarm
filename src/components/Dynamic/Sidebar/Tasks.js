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
import { Status } from 'helpers/misc'
import { usePrismic } from 'hooks/useFarmBoard'
import useFarm from 'context/farm'
export default function Tasks() {
  const [feeds, setFeeds] = React.useState([])
  const { comments, loading, error, refetch } = usePrismic()
  const {
    ScheduledTasks: scheduledTasks,
    farmFeeds: farmfeeds,
    EOSStatistics: eosStats,
    ScheduledTasksHasError,
    triggerEosStatsReload,
    ScheduledTasksIsLoading,
    triggerScheduledTasksReload,
    farmFeedsIsLoading,
    farmFeedsHasError,
    farmFeedsRefetch,
    EOSStatisticsIsLoading,
    EOSStatisticsHasError,
    eosTaskHasError,
    eosTaskIsLoading,
    triggerEosTaskReload
  } = useFarm()

  //let _comments = comments.filter((c) => c?.data?.farm_id[0]?.text === )
  React.useEffect(() => {
    const getFeeds = () =>
      farmfeeds?.forEach(feed => {
        setFeeds(p => [...p, ...feed.data])
      })

    getFeeds()
  }, [farmfeeds])

  //sort to current to startDate
  const sortedScheduledTasks = scheduledTasks
    ?.slice()
    ?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    ?.filter(task => task.status !== Status.COMPLETED)
    .filter(
      (task, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(task)
        ) === index
    )

  const sortedFeeds = feeds
    ?.slice()
    ?.sort((a, b) => new Date(b.feed?.updatedAt) - new Date(a.feed?.updatedAt))
    .filter(
      (feed, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(feed)
        ) === index
    )
  //get Todays task
  const getTodaysTasks = (task, type) => {
    let today = new Date().toLocaleDateString()

    let comparant = value => new Date(value).toLocaleDateString()

    if (task) {
      if (type === 'today') {
        const res = task?.filter(
          filteredTask => today === comparant(filteredTask?.startDate)
        )

        return res
      }

      if (type === 'scheduled') {
        const res = task?.filter(
          filteredTask => today !== comparant(filteredTask?.startDate)
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
    <Box mx={8} mb={8}>
      {ScheduledTasksIsLoading || ScheduledTasksHasError ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => triggerScheduledTasksReload()}
            loading={ScheduledTasksIsLoading}
            error={ScheduledTasksHasError}
            text={"Standby as we load your farm's scheduled tasks"}
          />
        </Box>
      ) : (
        <>
          {scheduledTasks.length > 0 && (
            <>
              {getTodaysTasks(sortedScheduledTasks, 'today').map(
                (today, index) => (
                  <>
                    <FarmUpdateCard
                      key={mapKey(index)}
                      title='TODAY’S TASK'
                      duration={new Date(today?.startDate).toLocaleDateString()}
                      subtitle={today?.task?.title}
                      text={today?.description?.replace(/<[^>]*>/g, '')}
                      icon={BiTime}
                    />
                  </>
                )
              )}
            </>
          )}
        </>
      )}

      <WeatherCards farmfeeds={feeds} />
      <Grid gap={8}>
        {ScheduledTasksIsLoading || ScheduledTasksHasError ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => triggerScheduledTasksReload()}
              loading={ScheduledTasksIsLoading}
              error={ScheduledTasksHasError}
              text={"Standby as we load your farm's scheduled tasks"}
            />
          </Box>
        ) : (
          <>
            {sortedScheduledTasks.length > 0 && (
              <FarmUpdateCard
                title='SCHEDULED TASK'
                duration={new Date(
                  sortedScheduledTasks[0]?.startDate
                ).toLocaleDateString()}
                subtitle={sortedScheduledTasks[0]?.task?.title}
                text={sortedScheduledTasks[0]?.description?.replace(
                  /<[^>]*>/g,
                  ''
                )}
                icon={BiTime}
              />
            )}
          </>
        )}

        {farmFeedsIsLoading || loading || farmFeedsHasError || error ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => {
                error && refetch()
                farmFeedsHasError && farmFeedsRefetch()
              }}
              loading={farmFeedsIsLoading || loading}
              error={farmFeedsHasError || error}
              text={"Standby as we load your farm's feed"}
            />
          </Box>
        ) : (
          <>
            {sortedFeeds.length > 0 && (
              <FarmUpdateCard
                title='FARM MANAGER UPDATE'
                duration={new Date(
                  feeds[0]?.feed?.updatedAt
                ).toLocaleDateString()}
                subtitle={feeds[0]?.task?.title}
                text={feeds[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
                icon={Updates}
              />
            )}
            {comments.length > 0 && (
              <FarmUpdateCard
                title='FARM MANAGER UPDATE'
                duration={null}
                subtitle='GENERAL UPDATE'
                text={comments[0]?.data?.comments[0]?.text?.replace(
                  /<[^>]*>/g,
                  ''
                )}
                icon={Updates}
              />
            )}
          </>
        )}

        {EOSStatisticsIsLoading ||
        EOSStatisticsHasError ||
        eosTaskHasError ||
        eosTaskIsLoading ? (
          <Box pt={{ md: 10 }}>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              w='100%'
              mx='auto'
              reload={() => {
                eosTaskHasError && triggerEosTaskReload()
                EOSStatisticsHasError && triggerEosStatsReload()
              }}
              loading={EOSStatisticsIsLoading || eosTaskIsLoading}
              error={EOSStatisticsHasError || eosTaskHasError}
              text={"Standby as we load your farm's stats"}
            />
          </Box>
        ) : (
          <>
            {eosStats?.length > 0 && (
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
                        fontFamily='num'
                        fontWeight={600}
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
                            ? 'cf.green'
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
                        fontFamily='num'
                        fontWeight={600}
                        value={(
                          eosStats[eosStats?.length - 1]?.indexes?.NDVI
                            ?.average * 100
                        )?.toFixed(0)}
                        size='100px'
                        color='cf.green'
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
                        fontFamily='num'
                        fontWeight={600}
                        value={(
                          eosStats[eosStats?.length - 1]?.indexes?.CCCI
                            ?.average * 100
                        )?.toFixed(0)}
                        size='100px'
                        color='cf.green'
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
  EOSStatisticsHasError: PropTypes.any,
  eosTaskIsLoading: PropTypes.bool,
  eosTaskHasError: PropTypes.any,
  reloads: PropTypes.array
}
