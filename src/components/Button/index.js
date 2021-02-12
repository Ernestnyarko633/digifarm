import { Button as ChakraButton } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

const Button = ({
  btntitle,
  rounded = '30px',
  colorScheme = 'linear',
  width = 32,
  fontSize = 'xs',
  ...rest
}) => (
  <ChakraButton
    colorScheme={colorScheme}
    rounded={rounded}
    fontSize={fontSize}
    w={width}
    fontWeight={400}
    shadow='0px 10px 20px rgba(97, 111, 57, 0.5)'
    {...rest}
  >
    {btntitle}
  </ChakraButton>
)

Button.propTypes = {
  btntitle: PropTypes.string,
  rounded: PropTypes.any,
  colorScheme: PropTypes.string,
  width: PropTypes.any,
  fontSize: PropTypes.any,
  rest: PropTypes.any
}

export default Button
