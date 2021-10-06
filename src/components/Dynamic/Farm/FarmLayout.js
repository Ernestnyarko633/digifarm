/* eslint-disable no-console */
import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'
import useApi from 'context/api'
import useComponent from 'context/component'
import { useQuery } from 'react-query'
export default function FarmLayout({
  children,
  digitalFarmerFarm,
  eosTask,
  WeatherForeCasts,
  ScheduledTasks,
  location,
  farmfeeds,
  reloads,
  //loading
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  WeatherForeCastsIsLoading,
  //errors
  WeatherForeCastsHasError,
  farmFeedsHasError,
  ScheduledTasksHasError,
  eosTaskIsLoading,
  eosTaskHasError,
  ...rest
}) {
  const { compState, setCompState } = useComponent()
  const { eosStats } = useApi()

  // for health card stats
  const {
    data: EOSStatistics,
    isLoading: EOSStatisticsIsLoading,
    error: EOSStatisticsHasError,
    refetch: EOSStatisticsRefetch
  } = useQuery(
    [`${eosTask?.task_id}_stats`, eosTask?.task_id],
    () =>
      eosTask?.task_id &&
      eosStats({
        task: eosTask?.task_id
      })
  )

  const triggerEosStatsReload = () => EOSStatisticsRefetch()
  return (
    <Grid
      templateRows={{ md: 'repeat(1 1fr)' }}
      templateColumns={{ md: '17% 53% 30%' }}
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
      px={{ base: 4, md: 0 }}
    >
      <GridItem shadow='xl' d={{ base: 'none', md: 'block' }}>
        <FarmLeftSideBar state={compState} setState={setCompState} />
      </GridItem>
      <GridItem>
        <Box
          minW={{ base: '100%', lg: '53%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          minH={{ md: '100vh' }}
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow={{ md: 'xl' }}>
        <FarmRightSidebar
          // data
          farmfeeds={farmfeeds}
          WeatherForeCasts={WeatherForeCasts}
          ScheduledTasks={ScheduledTasks}
          eosStats={EOSStatistics?.data}
          digitalFarmerFarm={digitalFarmerFarm}
          location={location}
          state={compState}
          //extras
          reloads={[...reloads, triggerEosStatsReload]}
          //loadings
          farmFeedsIsLoading={farmFeedsIsLoading}
          WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
          ScheduledTasksIsLoading={ScheduledTasksIsLoading}
          EOSStatisticsIsLoading={EOSStatisticsIsLoading}
          eosTaskIsLoading={eosTaskIsLoading}
          //errors
          WeatherForeCastsHasError={WeatherForeCastsHasError}
          farmFeedsHasError={farmFeedsHasError}
          ScheduledTasksHasError={ScheduledTasksHasError}
          EOSStatisticsHasError={EOSStatisticsHasError}
          eosTaskHasError={eosTaskHasError}
        />
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  digitalFarmerFarm: PropTypes.any,
  eosTask: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  location: PropTypes.any,
  rest: PropTypes.any,
  farmfeeds: PropTypes.array,
  reloads: PropTypes.array,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  eosTaskIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  eosTaskHasError: PropTypes.any
}
