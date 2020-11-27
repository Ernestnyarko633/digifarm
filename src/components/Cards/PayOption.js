import React from 'react';
import {
  Flex,
  Text,
  Image,
  Heading,
  Box,
  useDisclosure,
  Collapse,
  Icon,
} from '@chakra-ui/core';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import visa from '../../assets/images/startfarm/visa.png';
import BankDetails from './BankDetails';

const PayOption = ({
  icon,
  title,
  theme,
  description,
  notice,
  percent,
  dropDown,
  onClick,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      as='button'
      _focus={{ outline: 'none', borderColor: 'cf.400' }}
      textAlign='left'
      direction='column'
      borderWidth={1}
      borderColor='gray.400'
      rounded='md'
      overflow='hidden'
      py={6}
      px={10}
      m={4}
      w={108}
      onClick={onClick}
    >
      <Flex align='center'>
        <Image src={icon} alt='Card Image' />
        <Text fontSize='lg' fontWeight={500} ml={4} fontFamily='body'>
          {title}
        </Text>
      </Flex>
      <Box
        borderWidth={1}
        borderColor='gray.100'
        w={{ md: '80%' }}
        mt={2}
      ></Box>
      <Flex direction='column'>
        <Heading as='h6' fontSize='sm'>
          {theme}
        </Heading>
        <Text w={{ md: 72 }} fontSize='sm' fontWeight={500} fontFamily='body'>
          {description}
        </Text>
        <Text mt={4} fontSize='sm' fontWeight={500} fontFamily='body'>
          {notice}{' '}
          <Text as='span' color='cf.400' fontFamily='body'>
            {percent}{' '}
          </Text>
        </Text>
      </Flex>
      {dropDown && (
        <>
          <Flex
            align='center'
            as='button'
            onClick={onToggle}
            _focus={{ outline: 'none' }}
          >
            <Heading as='h6' fontSize='sm' color='cf.400' mr={1}>
              View bank details
            </Heading>
            <Icon
              as={isOpen ? ChevronUpIcon : ChevronDownIcon}
              color='cf.400'
              boxSize={6}
            />
          </Flex>
          <Collapse initialScale={0.9} in={isOpen}>
            <BankDetails />
          </Collapse>
        </>
      )}
    </Flex>
  );
};

export default PayOption;
