import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Spinner } from '@chakra-ui/react'

const Splash = ({ text }) => (
  <Flex bg='white' h='100vh' align='center' justify='center'>
    <Spinner
      size='lg'
      speed='0.65s'
      color='cf.green'
      thickness='4px'
      emptyColor='gray.200'
    />
    {text && <Text className='loading-text'>{text}</Text>}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
