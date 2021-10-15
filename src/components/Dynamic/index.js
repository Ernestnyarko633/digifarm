/* eslint-disable no-console */
import React from 'react'
import useFarm from 'context/farm'

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

const DynamicFarm = () => {
  const { component, farm } = useFarm()
  const SelectedFarm = components[component]

  return <SelectedFarm digitalFarmerFarm={farm} />
}

export default DynamicFarm
