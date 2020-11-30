import { Box, Heading, Image } from '@chakra-ui/core';
import React from 'react';

const FarmImage = () => (
  <Box>
    <Box>
      <Heading as='h5' size='md' mb={4}>
        Ginger Farm
      </Heading>
    </Box>

    <Box w='424px' h='449px' backgroundColor='#cccc'>
      <Image
        h='100%'
        w='100%'
        objectFit='cover'
        rounded='md'
        src={require('../../../assets/images/farm.png').default}
        alt='crop'
      />
    </Box>
  </Box>
);

export default FarmImage;
