import React from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Text,
  Image,
  Heading,
  Box,
  useDisclosure,
  Collapse,
  Icon
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import BankDetails from './BankDetails'

const PayOption = ({
  icon,
  title,
  theme,
  notice,
  onClick,
  selected,
  dropDown,
  extraCharge,
  description
}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      m={4}
      py={6}
      px={10}
      w={{ md: 108 }}
      as='button'
      rounded='md'
      textAlign='left'
      overflow='hidden'
      onClick={onClick}
      direction='column'
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? 'cf.400' : 'gray.400'}
      _focus={{ outline: 'none', borderColor: 'cf.400' }}
    >
      <Flex align='center' justify={{ base: 'space-between', md: 'initial' }}>
        <Image src={icon} alt='Card Image' />
        <Text fontSize='lg' fontWeight={500} ml={4} fontFamily='body'>
          {title}
        </Text>
      </Flex>
      <Box borderWidth={1} borderColor='gray.100' w={{ md: '80%' }} mt={2} />
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
            {extraCharge}
          </Text>
        </Text>
      </Flex>
      {dropDown && (
        <>
          <Flex align='center' onClick={onToggle} _focus={{ outline: 'none' }}>
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
  )
}

PayOption.propTypes = {
  dropDown: PropTypes.bool,
  extraCharge: PropTypes.any,
  theme: PropTypes.any.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  notice: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default PayOption
