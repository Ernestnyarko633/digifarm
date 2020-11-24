import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/core';

const Tab = ({ activeTab, label, onClick }) => {
  const handleClick = () => {
    onClick(label);
  };
  return (
    <Box
      as='li'
      w={64}
      textAlign='center'
      py={4}
      cursor='pointer'
      onClick={handleClick}
      bg='white'
      bg={activeTab === label ? 'cf.400' : 'white'}
      borderWidth={1}
      borderColor={activeTab === label ? 'cf.400' : 'gray.400'}
      borderBottomWidth={activeTab === label ? 3 : 1}
      borderBottomColor={activeTab === label ? 'brand.dark' : ''}
      color={activeTab === label ? 'white' : 'gray.700'}
      fontWeight={activeTab === label ? 900 : 'normal'}
    >
      <Text fontFamily='medium'>{label}</Text>
    </Box>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tab;
