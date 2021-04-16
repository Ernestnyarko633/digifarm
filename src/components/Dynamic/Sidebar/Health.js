import React from 'react'
import PropTypes from 'prop-types'
import { Text, Flex, Box } from '@chakra-ui/react'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({ farm, eosStats, _error }) {
  return (
    <Box>
      {!_error &&
        eosStats &&
        eosStats?.length > 0 &&
        eosStats?.map(stat => (
          <CropHealthCard
            key={stat?.date}
            date={stat?.date}
            eosStat={stat}
            _error={_error}
          />
        ))}

      {!_error && !eosStats?.length && (
        <Flex>
          <Text textTransform='capitalize'>
            CROP HEALTH IS CURRENTLY UNAVAILABLE, IT WOULD BE UPDATED AS SOON AS
            POSSIBLE
          </Text>
        </Flex>
      )}
    </Box>
  )
}

Health.propTypes = {
  farm: PropTypes.any,
  eosStats: PropTypes.any,
  _error: PropTypes.any
}
