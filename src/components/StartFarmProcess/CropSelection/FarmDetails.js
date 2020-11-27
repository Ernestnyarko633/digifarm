import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Progress,
  Text,
} from '@chakra-ui/core';
import { Button } from 'components';
import Tabs from 'components/Tabs/Tabs';
import React from 'react';
import AboutFarm from './AboutFarm';
import FarmImage from './FarmImage';

const FarmDetails = ({ handleNext }) => {
  return (
    <Grid templateColumns={{ md: '40% 50%' }} gap={{ md: '10%' }}>
      <FarmImage />

      <AboutFarm />
      <Box pos='absolute' bottom={3} right={14}>
        <Button
          btntitle='Stat this farm'
          w={80}
          h={14}
          fontSize='md'
          onClick={handleNext}
        />
      </Box>
    </Grid>
  );
};

export default FarmDetails;
