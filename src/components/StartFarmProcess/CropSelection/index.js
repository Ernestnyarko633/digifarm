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
import React from 'react';
import AboutFarm from './AboutFarm';
import FarmImage from './FarmImage';

const CropSelection = ({ handleNext }) => {
  return (
    <Box mt={{ md: 48 }} w='90%' mx='auto'>
      <Box textAlign='center' mb={10}>
        <Heading as='h4' size='xl'>
          Which Farm is right for you.
        </Heading>
      </Box>
      <Grid templateColumns={{ md: '20% 80%' }}>
        <GridItem bg='gray.50'>
          <Box bg='cf.400' color='white' p={6} w={{ md: 48 }} h={{ md: 16 }}>
            <Text>Top-selling farm</Text>
          </Box>
        </GridItem>

        <GridItem
          py={6}
          px={{ md: 10 }}
          borderWidth={1}
          borderColor='gray.300'
          rounded='md'
        >
          <Grid
            templateColumns={{ md: '40% 50%' }}
            gap={{ md: '10%' }}
            pos='relative'
          >
            <FarmImage />

            <AboutFarm />
            <Box right={0} pos='absolute' bottom={0}>
              <Button
                btntitle='Stat this farm'
                w={80}
                h={14}
                fontSize='md'
                onClick={handleNext}
              />
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CropSelection;
