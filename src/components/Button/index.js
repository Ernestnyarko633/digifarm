import { Button as ChakraButton, Icon } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'

const Button = ({
  btntitle,
  rounded = '30px',
  colorScheme = 'linear',
  width = 32,
  fontSize = 'xs',
  fontWeight,
  icon,
  ...rest
}) => (
  <ChakraButton
    colorScheme={colorScheme}
    rounded={rounded}
    fontSize={fontSize}
    w={width}
    fontWeight={fontWeight || 400}
    filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
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
  icon: PropTypes.any,
  rest: PropTypes.any,
  fontWeight: PropTypes.any
}

export default Button
