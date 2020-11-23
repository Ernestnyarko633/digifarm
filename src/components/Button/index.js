import { Button as ChakraButton } from '@chakra-ui/core';
import React from 'react';

const Button = ({
  btntitle,
  rounded = '30px',
  colorScheme = 'linear',
  width = 32,
  fontSize = 'xs',
  ...rest
}) => {
  return (
    <ChakraButton
      colorScheme={colorScheme}
      rounded={rounded}
      fontSize={fontSize}
      w={width}
      fontWeight={400}
      {...rest}
    >
      {btntitle}
    </ChakraButton>
  );
};

export default Button;
