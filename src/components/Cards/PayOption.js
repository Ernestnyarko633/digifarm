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
import Visa from 'assets/images/visa.png'
import WeChat from 'assets/images/wechat.png'
import MasterCard from 'assets/images/mastercard.png'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import BankDetails from './BankDetails'
import { FaCheckCircle } from 'react-icons/fa'

const PayOption = ({
  leftImage,
  rightImage,
  height,
  title,
  theme,
  notice,
  onClick,
  support,
  selected,
  dropDown,
  extraCharge,
  LeftPicture,
  RightPicture,
  description,
  filter
}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      filter={filter}
      my={4}
      py={4}
      px={8}
      w={{ base: 82, md: 108 }}
      as='button'
      rounded='md'
      textAlign='left'
      overflow='hidden'
      onClick={onClick}
      direction='column'
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? 'cf.green' : 'gray.400'}
      _focus={{ outline: 'none', borderColor: 'cf.green' }}
      pos='relative'
    >
      <Box pos='absolute' top={2} right={2}>
        {selected ? (
          <Icon as={FaCheckCircle} color='cf.green' boxSize={4} />
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
        w='100%'
      >
        <Text fontSize='lg' fontWeight={700} fontFamily='heading'>
          {title}
        </Text>

        <Flex align='center' h={height}>
          <Image
            h='100%'
            mr={2}
            src={
              LeftPicture ||
              require(`../../assets/images/${leftImage}.png`).default
            }
            alt='Card Image'
          />
          <Image
            h='100%'
            src={
              RightPicture ||
              require(`../../assets/images/${rightImage}.png`).default
            }
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
            <Text as='span' color='cf.green'>
              {extraCharge}
            </Text>
          </Text>
        </Box>
      </Flex>
      {support && (
        <Box w='100%'>
          <Flex
            mb={2}
            w='100%'
            py={1}
            px={2}
            align='center'
            rounded='20px'
            h={8}
            borderWidth={1}
            borderColor='gray.100'
            bg='gray.100'
            justify='center'
            color='cf.green'
            direction='row'
          >
            {[WeChat, MasterCard, Visa].map((item, index) => (
              <Image key={item} h={index === 0 ? 8 : 4} mx={3} src={item} />
            ))}
          </Flex>
          <Flex
            w='100%'
            py={1}
            px={2}
            align='center'
            rounded='20px'
            h={8}
            borderWidth={1}
            borderColor='gray.100'
            bg='gray.100'
            justify='center'
            color='cf.green'
            direction='row'
          >
            {[require('../../assets/images/transaction.png').default].map(
              (item, index) => (
                <Image key={item} h={5} mx={3} src={item} />
              )
            )}
            <Text fontWeight={500} color='black'>
              Bank Transfer
            </Text>
          </Flex>
        </Box>
      )}
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
            <Heading as='h6' fontSize='sm' color='cf.green' mr={1}>
              View bank details
            </Heading>
            <Icon
              as={isOpen ? ChevronUpIcon : ChevronDownIcon}
              color='cf.green'
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
  filter: PropTypes.any,
  dropDown: PropTypes.bool,
  extraCharge: PropTypes.any,
  theme: PropTypes.any.isRequired,
  height: PropTypes.any,
  support: PropTypes.bool,
  leftImage: PropTypes.string.isRequired,
  rightImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  notice: PropTypes.string.isRequired,
  LeftPicture: PropTypes.string,
  RightPicture: PropTypes.string,
  description: PropTypes.string.isRequired
}

export default PayOption
