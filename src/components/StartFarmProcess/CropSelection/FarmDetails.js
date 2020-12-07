import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Button } from 'components';
import React from 'react';
import AboutFarm from './AboutFarm';
import SelectCrop from './SelectCrop';

const crops = [
  { id: 1, title: 'Ginger Farm', acres: '100' },
  { id: 2, title: 'Soy bean Farm' },
  { id: 3, title: 'Sweet Potato Farm' },
];

const FarmDetails = ({ handleNext }) => (
  <Grid templateColumns={{ md: '45% 55%' }}>
    <GridItem>
      <SelectCrop crops={crops} />
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
