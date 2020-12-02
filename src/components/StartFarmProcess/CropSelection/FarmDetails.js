import { Box, Grid, GridItem } from '@chakra-ui/core';
import { Button } from 'components';
import React from 'react';
import AboutFarm from './AboutFarm';
import FarmImage from './FarmImage';

const FarmDetails = ({ handleNext }) => (
  <Grid templateColumns={{ md: '35% 55%' }} gap={{ md: '10%' }}>
    <GridItem p={{ md: 10 }}>
      <FarmImage />
    </GridItem>
    <GridItem
      overflowY='scroll'
      borderLeftWidth={1}
      borderLeftColor='gray.300'
      p={{ md: 10 }}
      css={{
        direction: 'rtl',
        scrollbarColor: 'rebeccapurple',
        scrollBehavior: 'smooth',
      }}
    >
      <AboutFarm />
      <Box my={10}>
        <Button
          btntitle='Start this farm'
          w={80}
          h={14}
          fontSize='md'
          onClick={handleNext}
        />
      </Box>
    </GridItem>
  </Grid>
);

export default FarmDetails;
