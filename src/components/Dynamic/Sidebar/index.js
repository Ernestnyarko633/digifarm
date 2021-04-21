import React from 'react'
import PropTypes from 'prop-types'

import Tasks from './Tasks'
import Weather from './Weather'
import Health from './Health'
import Events from './Events'
import Updates from './Updates'

const components = {
  compA: Tasks,
  compB: Weather,
  compC: Health,
  compD: Events,
  compE: Updates
}

const DynamicCard = ({
  card,
  scheduledTasks,
  weatherForeCasts,
  farmfeeds,
  farm,
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
}) => {
  const SelectedCard = components[card]
  return (
    <SelectedCard
      scheduledTasks={scheduledTasks}
      weatherForeCasts={weatherForeCasts}
      farmfeeds={farmfeeds}
      farm={farm}
      eosStats={eosStats}
      //loadings
      farmFeedsIsLoading={farmFeedsIsLoading}
      WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
      ScheduledTasksIsLoading={ScheduledTasksIsLoading}
      EOSStatisticsIsLoading={EOSStatisticsIsLoading}
      //errors
      WeatherForeCastsHasError={WeatherForeCastsHasError}
      farmFeedsHasError={farmFeedsHasError}
      ScheduledTasksHasError={ScheduledTasksHasError}
      EOSStatisticsHasError={EOSStatisticsHasError}
    />
  )
}

DynamicCard.propTypes = {
  card: PropTypes.string.isRequired,
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  farm: PropTypes.any,
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

export default DynamicCard
