import React from 'react'
import { Box } from '@chakra-ui/react'
import Greetings from 'components/Utils/Greetings'
import useAuth from 'context/auth'
import PropTypes from 'prop-types'
const FarmWalletEmptyState = ({ children, farms }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  return (
    <Box w='100%'>
      <Greetings
        title={`Welcome </br> Farmer ${user?.firstName} `}
        text={`Total farms <br/> ${farms?.length}`}
      />
      {children}
    </Box>
  )
}

FarmWalletEmptyState.propTypes = {
  children: PropTypes.node,
  farms: PropTypes.array
}
export default FarmWalletEmptyState
