import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
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
import { Link as ReachRouter } from 'react-router-dom'

const WarehouseCard = ({
  _id,
  name,
  location,
  image,
  myfarm,
  weight,
  bags,
  quantity,
  condition,
  status,
  mr,
  orderStatus,
  ml,
  sellButton
}) => {
  return (
    <Box
      rounded='lg'
      bg='white'
      p={10}
      pb={1}
      my={6}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      w='100%'
      mx='auto'
      borderRadius='20px'
    >
      <Flex justify='space-between' pt={2}>
        <Flex mb={4}>
          <Avatar
            bg='gray.100'
            src={
              myfarm
                ? `${myfarm?.order?.product?.cropVariety?.imageUrl}`
                : image
            }
          />
          <Box ml={2}>
            <Heading as='h6' mb={{ md: 2 }} fontSize={{ md: 'lg' }}>
              {myfarm
                ? `${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`
                : name}
            </Heading>
            <Text mt={{ md: -2 }} fontSize='sm' color='gray.500'>
              {myfarm
                ? `${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`
                : location}
            </Text>
          </Box>
        </Flex>
        <Spacer />
        <Flex>
          <Link
            as={ReachRouter}
            _hover={{ textDecor: 'none' }}
            to={`/farms/${myfarm?._id}`}
          >
            <Button
              colorScheme='none'
              rounded='30px'
              borderWidth={1}
              color='cf.green'
              borderColor='cf.green'
              px={8}
            >
              View Farm
            </Button>
            {sellButton === 'true' && (
              <>
                {quantity === 0 && (
                  <Button
                    colorScheme='linear'
                    rounded='30px'
                    borderWidth={1}
                    color='white'
                    isDisabled
                    px={8}
                    ml={2}
                  >
                    Sell Produce
                  </Button>
                )}
                {quantity !== 0 && (
                  <Link
                    as={ReachRouter}
                    _hover={{ textDecor: 'none' }}
                    to={{ pathname: '/marketplace', state: myfarm }}
                  >
                    <Button
                      colorScheme='linear'
                      rounded='30px'
                      borderWidth={1}
                      color='white'
                      // isLoading
                      px={8}
                      ml={2}
                    >
                      Sell Produce
                    </Button>
                  </Link>
                )}
              </>
            )}
          </Link>
        </Flex>
      </Flex>
      <Divider borderColor='gray.300' />
      <Box>
        <Grid templateColumns='repeat(3, 1fr)' w='100%' pt={4}>
          <GridItem>
            <Flex
              w='80%'
              direction='row'
              align='center'
              justify='space-between'
            >
              <Box pt={2} py={4}>
                <Text fontWeight='bold' fontSize='28px'>
                  {myfarm ? myfarm?.storage.quantity : quantity}
                </Text>
                <Text fontWeight='light' color='gray.500' fontSize='16px'>
                  Quantity (Tonnes)
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
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
                <Text fontWeight='bold' fontSize='28px'>
                  {myfarm ? myfarm?.storage?.weight : weight}
                </Text>
                <Text fontWeight='light' color='gray.500' fontSize='16px'>
                  Weight (kg)
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
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
                <Text fontWeight='bold' fontSize='28px'>
                  {myfarm ? myfarm?.storage?.numberOfBags : bags}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize='16px'
                  pl={1}
                >
                  Number of bags
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        <Center>
          <Button
            pt={4}
            color='cf.green'
            size='16px'
            pb={-8}
            isDisabled='true'
            variant='link'
          >
            View auditor report
          </Button>
        </Center>
      </Box>
    </Box>
  )
}
WarehouseCard.propTypes = {
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
  _id: PropTypes.any,
  myfarm: PropTypes.any,
  sellButton: PropTypes.bool
}

export default WarehouseCard
