/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getFormattedMoney } from 'helpers/misc';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';

const WalletCard = ({ acreage, price, farm }) => {
  return (
    <Box
      rounded='xl'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={{ md: 8 }}
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

      <Stat>
        <StatLabel>Collected Fees</StatLabel>
        <StatNumber fontFamily='sans-serif'>
          ${getFormattedMoney(price * acreage)}
        </StatNumber>
        <StatHelpText>
          {moment(farm.createdAt).format('LL')} -{' '}
          {moment(farm.updatedAt).format('LL')}
        </StatHelpText>
      </Stat>
    </Box>
  );
};

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any,
};

export default WalletCard;
