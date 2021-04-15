/* eslint-disable */
import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  Image,
  Heading,
} from '@chakra-ui/react';
import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons';
import Gal from 'assets/images/gallery.png';
import ImageGallery from '../Cards/ImageGallery';
import PropTypes from 'prop-types';

const menus = [
  { id: 1, icon: Calendar, state: 'compA' },
  { id: 2, icon: Weather, state: 'compB' },
  { id: 3, icon: Crop, state: 'compC' },
  { id: 4, icon: FarmSchedule, state: 'compD' },
  { id: 5, icon: Updates, state: 'compE' },
];

export default function Gallery({ farmfeeds, loading }) {
  return (
    <Grid
      templateRows={{ md: 'repeat(1 1fr)' }}
      templateColumns={{ md: '5% 95%' }}
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
    >
      <GridItem>
        <Box
          as='aside'
          pos='fixed'
          bottom={0}
          left={0}
          h={{ lg: '84vh' }}
          w={{ md: '5%' }}
          bg='white'
          zIndex={50}
          pt={10}
          shadow='md'
          px={{ md: 8 }}
          color='gray.600'
          d={{ base: 'none', md: 'block' }}
        >
          <Box as='ul'>
            {menus.map((item) => (
              <Flex
                as='button'
                role='button'
                aria-label={`${item.icon} button`}
                key={item.id}
                align='center'
                pb={6}
              >
                <Icon as={item.icon} />
              </Flex>
            ))}
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          minW={{ lg: '95%' }}
          as='main'
          color='gray.800'
          bg='gray.50'
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          px={{ md: 24 }}
          minH={{ lg: '100vh' }}
        >
          {!loading && farmfeeds && (
            <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={20}>
              {farmfeeds?.map((_feed) => {
                return (
                  <ImageGallery
                    key={_feed._id}
                    title={_feed.title}
                    farmfeeds={_feed?.data}
                    activityName={_feed?.title}
                  />
                );
              })}
            </Grid>
          )}
          {farmfeeds?.length === 0 && !loading && (
            <Flex
              w='100%'
              justify='center'
              align='center'
              direction='column'
              py={{ md: 40 }}
              h={{ base: '100vh', md: '100%' }}
            >
              <Image src={Gal} py={{ base: 6, md: 10 }} />
              <Heading
                as='h6'
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight={800}
                mb={{ md: 5 }}
              >
                Gallery is empty
              </Heading>
              <Text fontSize='xs'>
                Photos of farm and farm activities will show up here
              </Text>
            </Flex>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
}

Gallery.propTypes = {
  farmfeeds: PropTypes.array.isRequired,
  loading: PropTypes.any,
};
