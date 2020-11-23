import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/core';
import React from 'react';

const OtherSteps = () => {
  return (
    <Box>
      <Flex
        align='center'
        justify='center'
        bg='gray.100'
        w='100%'
        h={20}
        mt={20}
      >
        <Heading as='h5' size='md' mr={{ md: 20 }}>
          Roots / Tubers
        </Heading>

        <Flex align='center' justify='space-between'>
          <Text px={6}>Ginger</Text>
          <Text px={6}>Chilli pepper</Text>
          <Text px={6}>Tiger nut</Text>
          <Text px={6}>Sweet potato</Text>
          <Text px={6}>Sorghum</Text>
        </Flex>
      </Flex>
      <Box
        mt={{ md: 12 }}
        w='70%'
        mx='auto'
        borderWidth={1}
        borderColor='gray.400'
        rounded='md'
        overflow='hidden'
      >
        <Flex h={{ md: 120 }} pos='relative' overflow='hidden'>
          <Box w='50%' pos='fixed' p={{ md: 10 }}>
            Left side
          </Box>
          <Box
            borderLeftWidth={1}
            borderLeftColor='gray.300'
            w='50%'
            overflowY='scroll'
            ml='50%'
            p={{ md: 10 }}
          >
            Right Side
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default OtherSteps;
