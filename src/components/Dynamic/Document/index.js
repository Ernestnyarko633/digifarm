import React from 'react'
import PropTypes from 'prop-types'

import Individual from './Individual'
import Cooperative from './Cooperative'

const components = {
  compA: Individual,
  compB: Cooperative
}

const DynamicDocument = ({ document, digitalFarmerFarm }) => {
  const SelectedCard = components[document]
  return <SelectedCard digitalFarmerFarm={digitalFarmerFarm} />
}

DynamicDocument.propTypes = {
  document: PropTypes.string.isRequired,
  digitalFarmerFarm: PropTypes.any
}

export default DynamicDocument
