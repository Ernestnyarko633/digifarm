import { Box } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
export default function FarmRightSidebar({
  state,
  digitalFarmerFarm,
  eosStats,
  location,
  ScheduledTasks,
  reloads,
  farmfeeds,
  WeatherForeCasts,
  //loading
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  WeatherForeCastsIsLoading,
  EOSStatisticsIsLoading,
  //errors
  WeatherForeCastsHasError,
  farmFeedsHasError,
  ScheduledTasksHasError,
  EOSStatisticsHasError,
  eosTaskIsLoading,
  eosTaskHasError
}) {
  return (
    <Box
      py={8}
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      as='rightsidebar'
      bottom={0}
      pos={{ md: 'fixed' }}
      px={{ base: 4, md: 8 }}
      h={{ lg: '84vh' }}
      w={{ md: '30%' }}
      my={{ base: 20, md: 0 }}
      shadow={{ md: 'md' }}
      overflowY={{ md: 'scroll' }}
    >
      <DynamicCard
        card={state}
        scheduledTasks={ScheduledTasks}
        weatherForeCasts={WeatherForeCasts}
        farmfeeds={farmfeeds}
        farm={digitalFarmerFarm}
        eosStats={eosStats}
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
        //helpers
        reloads={reloads}
      />
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string,
  digitalFarmerFarm: PropTypes.any.isRequired,
  eosStats: PropTypes.any,
  location: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.any,
  farmFeedsIsLoading: PropTypes.bool,
  EOSStatisticsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  eosTaskIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  EOSStatisticsHasError: PropTypes.any,
  eosTaskHasError: PropTypes.any
}
