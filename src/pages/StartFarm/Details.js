import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/core';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

const Details = () => {
  return (
    <Box>
      <Flex
        align='center'
        w='100vw'
        h={{ md: 20 }}
        pos='fixed'
        top={0}
        bg='white'
        shadow='md'
        px={{ md: 20 }}
      >
        <Box h={{ md: 12 }}>
          <Image
            h='100%'
            src={require('../../assets/images/logo.png').default}
          />
        </Box>
      </Flex>
      <Box mt={{ md: 48 }} w='90%' mx='auto'>
        <Box textAlign='center' mb={10}>
          <Heading as='h4' size='xl'>
            Which Farm is right for you.
          </Heading>
        </Box>
        <Grid templateColumns={{ md: '20% 30% 50%' }}>
          <GridItem bg='gray.100'>
            <Box bg='cf.400' color='white' p={6} w={{ md: 48 }} h={{ md: 16 }}>
              <Text>Top-selling farm</Text>
            </Box>
          </GridItem>
          <GridItem py={6}>
            <Box>
              <Heading as='h5' size='md'>
                Ginger Farm
              </Heading>
            </Box>
          </GridItem>
          <GridItem bg='green.500'>hi</GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details;
