import React from 'react'
import { Box } from '@chakra-ui/react'
import { getCurrentDayParting } from 'helpers/misc'
import Greetings from 'components/Utils/Greetings'
import useAuth from 'context/auth'
import PropTypes from 'prop-types'
const FarmWalletEmptyState = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { message } = getCurrentDayParting()

  return (
    <Box>
      <Greetings
        title={`${message} Farmer ${user?.firstName}`}
        text={"Click on the card below to view your farm's wallet"}
      />
      {children}
    </Box>
  )
}

FarmWalletEmptyState.propTypes = {
  children: PropTypes.node
}
export default FarmWalletEmptyState
