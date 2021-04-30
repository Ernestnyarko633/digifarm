import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
const FarmWalletEmptyState = ({ children, farms }) => {
  return (
    <Box w='100%' py={{ base: 10, md: 'auto' }}>
      {children}
    </Box>
  )
}

FarmWalletEmptyState.propTypes = {
  children: PropTypes.node,
  farms: PropTypes.array
}
export default FarmWalletEmptyState
