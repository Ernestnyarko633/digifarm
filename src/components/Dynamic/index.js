import React from 'react'
import { Box, Spinner, Text } from '@chakra-ui/react'
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
  return (
    <React.Fragment>
      {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}
      {loading === 'done' && (
        <SelectedFarm
          onOpen={onOpen}
          digitalFarmerFarms={digitalFarmerFarms}
          farmfeeds={farmfeeds}
          farms={farms}
        />
      )}
      {loading === 'done' && error && (
        <Box>
          <Text fontSize='md' ml={2} color='cf.400'>
            Something went wrong
          </Text>
        </Box>
      )}
    </React.Fragment>
  )
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  farms: PropTypes.any,
  digitalFarmerFarms: PropTypes.any,
  farmfeeds: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any
}

export default DynamicFarm
