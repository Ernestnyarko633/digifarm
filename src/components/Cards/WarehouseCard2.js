import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Progress,
  Heading,
  Flex,
  Avatar,
  Text,
  Button,
  Spacer,
  HStack,
  StackDivider,
  Center
} from '@chakra-ui/react'

const WarehouseCard2 = ({
  name,
  location,
  image,
  weight,
  bags,
  quantity,
  condition,
  status,
  mr,
  orderStatus,
  ml
}) => {
  const ourH = window.innerHeight
  return (
    <Flex w='100%'>
      <Box
        rounded='lg'
        bg='white'
        p={10}
        my={6}
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        w='100%'
      >
        <Flex justify='space-between'>
          <Flex mb={4}>
            <Avatar bg='gray.100' src={image} />
            <Box ml={2}>
              <Heading as='h6' mb={{ md: 2 }} fontSize={{ md: 'lg' }}>
                {name}
              </Heading>
              <Text mt={{ md: -2 }} fontSize='sm' color='gray.500'>
                {location}
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Flex>
            <Button
              colorScheme='none'
              rounded='30px'
              ml={2}
              mt={4}
              borderWidth={1}
              color='cf.400'
              mr={2}
              borderColor='cf.400'
            >
              View Farm
            </Button>
            <Button
              colorScheme='linear'
              rounded='30px'
              ml={2}
              mt={4}
              borderWidth={1}
              color='white'
              mr={2}
            >
              Sell Produce
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor='gray.300' />
        <Box>
          <Text fontWeight='bold' pt={2}>
            Farm Progress: 100%
          </Text>
          <Progress
            value={100}
            rounded='lg'
            colorScheme='cfButton'
            size='lg'
            mt={2}
          />

          <HStack
            divider={<StackDivider borderColor='gray.300' />}
            spacing={ourH / 8}
            pt={4}
          >
            <Box pt={2} py={4}>
              {' '}
              <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                {' '}
                {quantity}
              </Text>
              <Text fontWeight='light' color='gray.500'>
                Quantity(Tonnes)
              </Text>
            </Box>
            <Box pt={2} py={4}>
              {' '}
              <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                {' '}
                {weight}
              </Text>
              <Text fontWeight='light' color='gray.500'>
                Weight(Kg)
              </Text>
            </Box>
            <Box pt={2} py={4}>
              {' '}
              <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                {' '}
                {bags}
              </Text>
              <Text fontWeight='light' color='gray.500'>
                Number of bags
              </Text>
            </Box>
            <Box pt={2} py={4}>
              {' '}
              <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                {' '}
                {condition}
              </Text>
              <Text fontWeight='light' color='gray.500'>
                Yield conditions
              </Text>
            </Box>
          </HStack>
          <Center>
            <Text pt={8} color='cf.400' size='16px'>
              View auditor report
            </Text>
          </Center>
          {quantity && <Flex align='center' justify='space-between' mt={6} />}
          {!quantity && (
            <Flex align='center' justify='center' mt={6}>
              <Button
                btntitle='sold'
                bg='gray.400'
                color='gray.100'
                cursor='not-allowed'
                _hover={{ bg: 'gray.400' }}
                _action={{ bg: 'gray.400' }}
                rounded='30px'
                shadow='none'
                h={12}
                w={56}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Flex>
  )
}
WarehouseCard2.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  buttontitle: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  bags: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  mr: PropTypes.any,
  ml: PropTypes.any,
  status: PropTypes.string,
  orderStatus: PropTypes.any
}
export default WarehouseCard2
