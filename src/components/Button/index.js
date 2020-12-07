import { Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

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
    shadow='lg'
    {...rest}
  >
    {btntitle}
  </ChakraButton>
);

export default Button;
