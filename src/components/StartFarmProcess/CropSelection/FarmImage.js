import { Box, Heading, Image } from '@chakra-ui/core';
import React from 'react';

const FarmImage = () => {
  return (
    <Box>
      <Box>
        <Heading as='h5' size='md' mb={4}>
          Ginger Farm
        </Heading>
      </Box>

      <Box>
        <Image src={require('../../../assets/images/farm.png').default} />
      </Box>
    </Box>
  );
};

export default FarmImage;
