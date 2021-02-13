import React from 'react'
import PropTypes from 'prop-types'

import Individual from './Individual'
import Cooperative from './Cooperative'

const components = {
  compA: Individual,
  compB: Cooperative
}

const DynamicDocument = ({ document }) => {
  const SelectedCard = components[document]
  return <SelectedCard />
}

DynamicDocument.propTypes = {
  document: PropTypes.string.isRequired
}

export default DynamicDocument
