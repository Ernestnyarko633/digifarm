import { Button as ChakraButton, Icon } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

const Button = ({
  btntitle,
  rounded = '30px',
  colorScheme = 'linear',
  width = 32,
  fontSize = 'xs',
  icon,
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
    {btntitle} {icon && <Icon as={icon} ml={2} boxSize={4} />}
  </ChakraButton>
)

Button.propTypes = {
  btntitle: PropTypes.string,
  rounded: PropTypes.any,
  colorScheme: PropTypes.string,
  width: PropTypes.any,
  fontSize: PropTypes.any,
  icon: PropTypes.object,
  rest: PropTypes.any
}

export default Button
