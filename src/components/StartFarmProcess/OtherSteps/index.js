import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import PaymentOption from './PaymentOption';

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

      <Flex
        mt={{ md: 12 }}
        w={{ md: 143 }}
        h={{ md: 123 }}
        mx='auto'
        borderWidth={1}
        borderColor='gray.400'
        rounded='md'
        overflow='hidden'
      >
        <PaymentOption />
        {/* <Grid templateColumns={{ md: 'repeat(2, 1fr)' }}>
          <GridItem p={{ md: 10 }}>Left</GridItem>
          <GridItem
            borderLeftWidth={1}
            borderLeftColor='gray.300'
            overflowY='scroll'
            p={{ md: 10 }}
            css={{
              direction: 'rtl',
              scrollbarColor: 'rebeccapurple',
              scrollBehavior: 'smooth',
            }}
          >
            <Box css={{ direction: 'ltr' }}>Right</Box>
          </GridItem>
        </Grid> */}
      </Flex>
    </Box>
  );
};

export default OtherSteps;
