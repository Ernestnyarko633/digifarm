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
  Grid,
  GridItem,
  Center,
  Link
} from '@chakra-ui/react'
import { Link as RouterBrowser } from 'react-router-dom'

const WarehouseCard2 = ({
  _id,
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
  return (
    <Flex w='100%'>
      <Box
        rounded='lg'
        bg='white'
        p={10}
        pb={1}
        mx={35}
        my={6}
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        w='100%'
        borderRadius='20px'
      >
        <Flex justify='space-between' pt={2}>
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
            <Link
              as={RouterBrowser}
              _hover={{ textDecor: 'none' }}
              to={`/farm/${_id}`}
            >
              <Button
                colorScheme='none'
                rounded='30px'
                ml={2}
                mt={1}
                borderWidth={1}
                color='cf.400'
                mr={2}
                borderColor='cf.400'
                px={10}
              >
                View Farm
              </Button>
            </Link>
            <Link
              as={RouterBrowser}
              _hover={{ textDecor: 'none' }}
              to='/marketplace'
            >
              <Button
                colorScheme='linear'
                rounded='30px'
                ml={2}
                mt={1}
                borderWidth={1}
                color='white'
                mr={2}
                px={10}
              >
                Sell Produce
              </Button>
            </Link>
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

          <Grid templateColumns='repeat(4, 1fr)' w='100%' pt={4}>
            <GridItem>
              <Flex
                w='80%'
                direction='row'
                align='center'
                justify='space-between'
              >
                <Box pt={2} py={4}>
                  {' '}
                  <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                    {' '}
                    {quantity}
                  </Text>
                  <Text fontWeight='light' color='gray.500'>
                    Quantity (Tonnes)
                  </Text>
                </Box>
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                w='80%'
                direction='row'
                align='center'
                justify='space-between'
              >
                <Box pt={2} py={4}>
                  {' '}
                  <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                    {' '}
                    {weight}
                  </Text>
                  <Text fontWeight='light' color='gray.500'>
                    Weight(kg)
                  </Text>
                </Box>
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                w='80%'
                direction='row'
                align='center'
                justify='space-between'
              >
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
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
              </Flex>
            </GridItem>
            <GridItem>
              <Box pt={2} py={4}>
                {' '}
                <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                  {' '}
                  {condition}
                </Text>
                <Text fontWeight='light' color='gray.500'>
                  Yield Conditions
                </Text>
              </Box>
            </GridItem>
          </Grid>

          <Center>
            <Text pt={4} color='cf.400' size='16px' pb={-8}>
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
  orderStatus: PropTypes.any,
  _id: PropTypes.any
}
export default WarehouseCard2
