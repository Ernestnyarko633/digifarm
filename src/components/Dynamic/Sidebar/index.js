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

const DynamicCard = ({ card }) => {
  const SelectedCard = components[card]
  return <SelectedCard />
}

DynamicCard.propTypes = {
  card: PropTypes.string.isRequired
}

export default DynamicCard
