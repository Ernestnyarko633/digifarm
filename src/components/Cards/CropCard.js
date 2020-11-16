import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { Link as ReachRouter } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import React from 'react';
import PotatoImg from '../../assets/images/emptystate/potato.png';

const CropCard = () => {
  return (
    <Box
      w={{ md: 85 }}
      p={8}
      borderWidth={1}
      borderColor='gray.300'
      rounded='lg'
      as='button'
      role='button'
      aria-label='crop card'
      textAlign='left'
      bg='white'
    >
      <Box mb={3}>
        <Image src={PotatoImg} />
      </Box>

      <Flex align='center' justify='space-between'>
        <Box>
          <Heading as='h5' fontSize={{ md: 'lg' }}>
            Sweet Potato
          </Heading>
          <Text fontSize='xs' mt={-2}>
            From $ 750/acre
          </Text>
        </Box>

        <Text fontSize='sm'>1000 acres left</Text>
      </Flex>

      <List fontSize='sm' textAlign='left' my={3}>
        <ListItem>Agyata, Eastern region, Ghana</ListItem>
        <ListItem>1,200 acres available</ListItem>
        <ListItem>Up to 25% Expected yield/acre</ListItem>
        <ListItem>USD 150 (ROI) Projected market value of yield</ListItem>
        <ListItem>10 months</ListItem>
      </List>

      <Box>
        <Button
          colorScheme='linear'
          rounded='30px'
          fontSize='xs'
          w={32}
          fontWeight={400}
        >
          Farm this crop
        </Button>
        <Link d='block' as={ReachRouter} fontSize='xs' color='cf.400' mt={1}>
          Learn more <Icon as={MdKeyboardArrowRight} />
        </Link>
      </Box>
    </Box>
  );
};

export default CropCard;
