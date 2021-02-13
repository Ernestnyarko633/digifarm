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

const DynamicFarm = ({ farm, onOpen }) => {
  const SelectedFarm = components[farm]
  return <SelectedFarm onOpen={onOpen} />
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired,
  onOpen: PropTypes.func
}

export default DynamicFarm
