import React from 'react'
import PropTypes from 'prop-types'

const { default: Document } = require('./Farm/Document')
const { default: Farm } = require('./Farm/Farm')
const { default: Gallery } = require('./Farm/Gallery')
const { default: Warehouse } = require('./Farm/Warehouse')

const components = {
  compA: Farm,
  compB: Document,
  compC: Gallery,
  compD: Warehouse
}

const DynamicFarm = ({ farm }) => {
  const SelectedFarm = components[farm]
  return <SelectedFarm />
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired
}

export default DynamicFarm
