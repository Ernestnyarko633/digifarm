import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import Greetings from 'components/Utils/Greetings'
import useAuth from 'context/auth'
import PropTypes from 'prop-types'
const FarmWalletEmptyState = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  return (
    <Box>
      <Box bg='cf.gray.400' w='100%' h={{ md: 80 }}>
        <Box py={{ md: 28 }} px={{ md: 20 }}>
          <Heading
            lineHeight='56px'
            fontWeight='700'
            fontSize='48px'
            dangerouslySetInnerHTML={{
              __html: 'Welcome'
            }}
          />
          <Text
            lineHeight='56px'
            fontWeight='400'
            fontSize='48px'
            dangerouslySetInnerHTML={{ __html: `Farmer ${user?.firstName}` }}
          />
        </Box>
      </Box>
      <Greetings />
      {children}
    </Box>
  )
}

FarmWalletEmptyState.propTypes = {
  children: PropTypes.node
}
export default FarmWalletEmptyState
