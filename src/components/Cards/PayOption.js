/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Image,
  Heading,
  Box,
  useDisclosure,
  Collapse,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import BankDetails from './BankDetails';
import { FaCheckCircle } from 'react-icons/fa';

const PayOption = ({
  leftImage,
  rightImage,
  height,
  title,
  theme,
  notice,
  onClick,
  selected,
  dropDown,
  extraCharge,
  description,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      m={4}
      py={4}
      px={8}
      w={{ md: 108 }}
      as='button'
      rounded='md'
      textAlign='left'
      overflow='hidden'
      onClick={onClick}
      direction='column'
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? 'cf.800' : 'gray.400'}
      _focus={{ outline: 'none', borderColor: 'cf.800' }}
      pos='relative'
    >
      <Box pos='absolute' top={2} right={2}>
        {selected ? (
          <Icon as={FaCheckCircle} color='cf.800' boxSize={4} />
        ) : (
          <Box
            borderWidth={1}
            borderColor='gray.200'
            rounded='100%'
            w={4}
            h={4}
          />
        )}
      </Box>

      <Flex
        align='center'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        pb={3}
        w="100%"
      >
        <Text fontSize='lg' fontWeight={700} fontFamily='heading'>
          {title}
        </Text>

        <Flex align='center' h={height}>
          <Image
            h='100%'
            mr={2}
            src={require(`../../assets/images/${leftImage}.png`).default}
            alt='Card Image'
          />
          <Image
            h='100%'
            src={require(`../../assets/images/${rightImage}.png`).default}
            alt='Card Image'
          />
        </Flex>
      </Flex>
      <Flex direction='column' mt={2}>
        <Heading as='h6' fontSize='md' mb={1}>
          {theme}
        </Heading>
        <Box color='gray.500' fontSize='sm'>
          <Text>{description}</Text>
          <Text mt={4}>
            {notice}{' '}
            <Text as='span' color='cf.800'>
              {extraCharge}
            </Text>
          </Text>
        </Box>
      </Flex>
      {dropDown && (
        <>
          <Flex
            align='center'
            onClick={onToggle}
            _focus={{ outline: 'none' }}
            borderTopWidth={1}
            borderTopColor='gray.200'
            pt={2}
            mt={2}
          >
            <Heading as='h6' fontSize='sm' color='cf.800' mr={1}>
              View bank details
            </Heading>
            <Icon
              as={isOpen ? ChevronUpIcon : ChevronDownIcon}
              color='cf.800'
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

PayOption.propTypes = {
  dropDown: PropTypes.bool,
  extraCharge: PropTypes.any,
  theme: PropTypes.any.isRequired,
  height: PropTypes.any,
  leftImage: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  notice: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PayOption;
