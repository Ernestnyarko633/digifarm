import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/core';
import CropCard from 'components/Cards/CropCard';
import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import CorporateIllustration from '../../assets/images/emptystate/corporate.png';
import PotatoImg from '../../assets/images/emptystate/potato.png';

const availableFarms = [
  {
    id: 1,
    title: 'Sweet Potato',
    subtitle: 'From $ 750/acre',
    img: PotatoImg,
    acreage: '1000 acres left',
    benefits: [
      'Agyata, Eastern region, Ghana',
      '1,200 acres available',
      'Up to 25% Expected yield/acre',
      'USD 150 (ROI) Projected market value of yield',
      '10 months',
    ],
  },
  {
    id: 2,
    title: 'Sweet Potato',
    subtitle: 'From $ 750/acre',
    img: PotatoImg,
    acreage: '1000 acres left',
    benefits: [
      'Agyata, Eastern region, Ghana',
      '1,200 acres available',
      'Up to 25% Expected yield/acre',
      'USD 150 (ROI) Projected market value of yield',
      '10 months',
    ],
  },
];

const HomeEmptyState = () => {
  return (
    <Box>
      <Box textAlign='center' px={{ md: 10 }}>
        <Box py={{ md: 20 }}>
          <Heading as='h4' fontSize={{ md: '2xl' }}>
            New and exciting crops to start with
          </Heading>
          <Text fontSize='sm'>
            With over 7 crops farmed and over 2,000 trusted
            <br /> digital farmers, we continue to change the world together
            with you
          </Text>
        </Box>

        <Flex align='center' justify='space-between' mb={5}>
          <Heading as='h5' fontSize={{ md: '2xl' }}>
            Choose a crop to start farming
          </Heading>
          <Flex align='center'>
            <IconButton
              aria-label='Left Arrow'
              icon={<MdKeyboardArrowLeft />}
              rounded='100%'
              borderColor='cf.900'
              variant='outline'
              color='cf.900'
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
            />
            <IconButton
              aria-label='Right Arrow'
              icon={<MdKeyboardArrowRight />}
              ml={2}
              rounded='100%'
              colorScheme='linear'
              shadow='md'
            />
          </Flex>
        </Flex>

        <Flex>
          {availableFarms.map((item) => (
            <CropCard
              title={item.title}
              subtitle={item.subtitle}
              image={item.img}
              extra={item.acreage}
              options={item.benefits}
              btntitle='Farm this crop'
              mr={6}
            />
          ))}
        </Flex>
      </Box>

      <Box bg='rgba(155, 155, 155, 0.1)' p={{ md: 10 }} mt={{ md: 32 }}>
        <Box textAlign='center'>
          <Heading as='h3' fontSize={{ md: '3xl' }} mt={{ md: 6 }}>
            We are connecting the world through agriculture
          </Heading>
          <Text>
            Be part of a cooperative where you can connect to people around the
            <br />
            world and co-own a farm in Africa.
          </Text>
        </Box>

        <Box my={{ md: 10 }} textAlign='center'>
          <Link _hover={{ textDecor: 'none' }} color='cf.400' d='block' mb={4}>
            Learn more <Icon as={MdKeyboardArrowRight} />
          </Link>

          <Button colorScheme='linear' rounded='30px' w={64} h={12} shadow='md'>
            Get me started now
          </Button>
        </Box>

        <Box mx='auto' w='80%' my={{ md: 16 }}>
          <Image src={CorporateIllustration} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeEmptyState;
