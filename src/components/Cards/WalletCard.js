/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import ExpenditureCard from './ExpenditureCard';
import { getFormattedMoney } from 'helpers/misc';
import Button from 'components/Button';
import { Link as ReachRouter } from 'react-router-dom';

const WalletCard = ({ acreage, price, farm }) => {
  console.log('farm', farm);
  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={{ base: 4, md: 8 }}
      bg='white'
      minW={{ base: 82, md: 95 }}
      minH={{ md: 'auto' }}
    >
      <Flex align='center'>
        <Box mr={4}>
          <Avatar
            bgColor='white'
            borderWidth='1px'
            borderColor='gray.300'
            src={farm?.order?.product?.cropVariety?.imageUrl}
          />
        </Box>

        <Flex direction='column'>
          <Flex align='center'>
            <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
              {farm?.order?.product?.cropVariety?.crop?.name}
            </Heading>
            <Text
              ml={1}
              as='span'
              fontSize={{ base: 'tiny', md: 'sm' }}
              color='gray.500'
            >
              ({farm?.order?.product?.cropVariety?.name}) {farm?.name}
            </Text>
          </Flex>

          <Text
            color='gray.500'
            mt={-1}
            fontSize={{ base: 'sm', md: 'md' }}
            textTransform='uppercase'
          >
            {farm?.order?.product?.location?.name},{' '}
            {farm?.order?.product?.location?.country}
          </Text>
        </Flex>
      </Flex>

      <Divider orientation='horizontal' borderColor='gray.300' my={6} />

      <Grid gap={4}>
        <ExpenditureCard
          bg='yellow.light'
          amount={getFormattedMoney(price * acreage)}
          action='spent'
          color='yellow.deep'
          date={farm?.order?.createdAt}
        />
        <ExpenditureCard
          bg='cf.light'
          action='available'
          amount={getFormattedMoney(price * acreage)}
          date={farm?.order?.updatedAt}
        />
      </Grid>

      <Box mt={4}>
        <Link
          as={ReachRouter}
          to={`/wallets/${farm?._id}`}
          _hover={{ textDecor: 'none' }}
        >
          <Button
            btntitle='View farm wallet'
            width='100%'
            h={12}
            fontSize={{ base: 'md', md: 'lg' }}
          />
        </Link>
      </Box>
    </Box>
  );
};

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any,
};

export default WalletCard;
