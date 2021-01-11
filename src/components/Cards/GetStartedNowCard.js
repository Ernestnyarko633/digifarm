import React from 'react';
import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import CorporateIllustration from '../../assets/images/emptystate/corporate.png';

const GetStartedNowCard = () => (
  <Box p={{ md: 10 }} mt={{ md: 32 }}>
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

      <Link as={ReachLink} _hover={{ textDecor: 'none' }} to='/start-farm'>
        <Button colorScheme='linear' rounded='30px' w={64} h={12} shadow='md'>
          Get me started now
        </Button>
      </Link>
    </Box>

    <Box mx='auto' w='80%' my={{ md: 16 }}>
      <Image src={CorporateIllustration} />
    </Box>
  </Box>
);

export default GetStartedNowCard;
