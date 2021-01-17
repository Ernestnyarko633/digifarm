import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'
import Loader from 'react-loader-spinner'

const Splash = ({ text }) => (
  <Flex bg='white' h='100vh' align='center' justify='center'>
    <Loader type='Oval' color='#417505' height={40} width={40} />
    {text && <Text className='loading-text'>{text}</Text>}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
