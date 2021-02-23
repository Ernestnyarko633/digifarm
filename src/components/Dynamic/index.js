import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'

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

const DynamicFarm = ({
  farm,
  onOpen,
  digitalFarmerFarms,
  farms,
  farmfeeds,
  loading,
  error
}) => {
  const SelectedFarm = components[farm]

  if (error) {
    ;<Box>
      <Text fontSize='md' ml={2} color='cf.400'>
        Something went wrong
      </Text>
    </Box>
  }

  return (
    <React.Fragment>
      <SelectedFarm
        onOpen={onOpen}
        digitalFarmerFarms={digitalFarmerFarms}
        farmfeeds={farmfeeds}
        farms={farms}
        loading={loading}
        error={error}
      />
    </React.Fragment>
  )
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  farms: PropTypes.any,
  digitalFarmerFarms: PropTypes.array.isRequired,
  farmfeeds: PropTypes.array.isRequired,
  error: PropTypes.any,
  loading: PropTypes.any
}

export default DynamicFarm
