/* eslint-disable */
import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa';

import PropTypes from 'prop-types';

const FundCard = ({ amount, label }) => {
  return (
    <Flex
      w={{ base: 40, xl: '100%' }}
      rounded='lg'
      filter={{
        base: 'none',
        md: 'drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))',
      }}
      p={{ base: 6, md: 8 }}
      bg='white'
    >
      <Flex direction='column' align={{ md: 'center' }} w='100%'>
        <Text
          lineHeight={{ base: '14px', md: '18px' }}
          fontSize={{ base: 'sm', md: 'xl' }}
          fontWeight='bold'
          mt={1}
        >
          {label}
        </Text>
        <Flex pr={{ base: 4, md: 8 }} mt={2}>
          <Icon boxSize={{ base: 4, md: 8 }} as={FaDollarSign} ml={1} pt={1} />
          <Text
            lineHeight={{ base: '9px', md: '18px' }}
            pt={1}
            fontSize={{ base: 'xl', md: '3xl' }}
            fontWeight={900}
            mt={1}
          >
            {amount}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

FundCard.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.any.isRequired,
};

export default FundCard;
