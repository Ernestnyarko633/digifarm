import React from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
const FarmWalletEmptyState = ({ children }) => {
  return <Box w='100%'>{children}</Box>
}

FarmWalletEmptyState.propTypes = {
  children: PropTypes.node
}
export default FarmWalletEmptyState
