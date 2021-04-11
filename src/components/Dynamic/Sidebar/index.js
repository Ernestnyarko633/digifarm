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
  loading,
  error,
  farm,
  eosStats,
  _error
}) => {
  const SelectedCard = components[card]
  return (
    <SelectedCard
      scheduledTasks={scheduledTasks}
      weatherForeCasts={weatherForeCasts}
      farmfeeds={farmfeeds}
      loading={loading}
      error={error}
      _error={_error}
      farm={farm}
      eosStats={eosStats}
    />
  )
}

DynamicCard.propTypes = {
  card: PropTypes.string.isRequired,
  scheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  farm: PropTypes.any,
  weatherForeCasts: PropTypes.any,
  eosStats: PropTypes.any,
  _error: PropTypes.any
}

export default DynamicCard
