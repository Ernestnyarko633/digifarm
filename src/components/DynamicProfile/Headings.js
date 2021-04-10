import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

const Headings = ({ title }) => {
  return (
    <Box w={{ base: 82, md: '100%' }}>
      <Box
        p={{ base: 5, md: 10 }}
        rounded='md'
        bg='white'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      >
        <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
          {title}
        </Heading>
        <Flex align='center'>
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            Help us personalize your <br />
            experience and make big account changes here
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
Headings.propTypes = {
  title: PropTypes.string.isRequired
}

export default Headings
