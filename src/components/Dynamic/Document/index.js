import React from 'react'
import PropTypes from 'prop-types'

import Individual from './Individual'
import Cooperative from './Cooperative'

const components = {
  compA: Individual,
  compB: Cooperative
}

const DynamicDocument = ({ document, digitalFarmerFarms }) => {
  const SelectedCard = components[document]
  return <SelectedCard digitalFarmerFarms={digitalFarmerFarms} />
}

DynamicDocument.propTypes = {
  document: PropTypes.string.isRequired,
  digitalFarmerFarms: PropTypes.array.isRequired
}

export default DynamicDocument
