import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

const Headings = ({ title }) => {
  return (
    <Box>
      <Box
        p={10}
        rounded='md'
        bg='white'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      >
        <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
          {title}
        </Heading>
        <Flex align='center'>
          <Text fontSize='md'>
            Set your login preferences, help us personalize your <br />
            experience and make big account changes here
          </Text>
          {/* <Flex align='center' ml={10}>
            <Button rounded='30px' w={40} h={12} shadow='sm'>
              Cancel
            </Button>
            <Button
              colorScheme='linear'
              rounded='30px'
              w={40}
              h={12}
              shadow='sm'
              ml={4}
              type='submit'
            >
              Save
            </Button>
          </Flex> */}
        </Flex>
      </Box>
    </Box>
  )
}
Headings.propTypes = {
  title: PropTypes.string.isRequired
}

export default Headings
