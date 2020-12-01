import { Box, Heading, Image, Text } from '@chakra-ui/core';
import React from 'react';
import IllustrationImage from '../../assets/images/home/illustration.png';

const Greetings = () => {
  return (
    <Box pos='relative'>
      <Image
        src={IllustrationImage}
        h={{ md: 115 }}
        w='100%'
        objectFit='cover'
      />
      <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
        <Heading as='h3' fontSize={{ md: '4xl' }}>
          Welcome, Farmer Kwasi
        </Heading>
        <Text>Get started by farming individually or with a group.</Text>
      </Box>
    </Box>
  );
};

export default Greetings;
