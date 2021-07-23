import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Text,
  Button,
  Grid,
  GridItem,
  Link
} from '@chakra-ui/react'
import { Link as ReachRouter, useHistory } from 'react-router-dom'

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
  const history = useHistory()

  const farmQuantity =
    myfarm?.order?.acreage * myfarm?.order?.product?.storagePerAcre
  const produceWeight =
    myfarm?.order?.acreage * myfarm?.order?.product?.weightOfProducePerAcre
  const numberOfBags =
    myfarm?.order?.acreage * myfarm?.order?.product?.quantityOfStoragePerAcre

  return (
    <Box
      rounded='lg'
      bg='white'
      p={4}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      w={{ md: 110 }}
    >
      <Flex justify='space-between'>
        <Flex align='center'>
          <Avatar
            bg='gray.100'
            size='sm'
            src={
              myfarm
                ? `${myfarm?.order?.product?.cropVariety?.imageUrl}`
                : image
            }
          />
          <Box ml={2}>
            <Heading as='h6' fontSize={{ base: 'sm', md: 'lg' }}>
              {myfarm
                ? `${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`
                : name}
            </Heading>
            <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray.400'>
              {myfarm
                ? `${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`
                : location}
            </Text>
          </Box>
        </Flex>
        <Flex>
          {myfarm ? (
            <Button
              colorScheme='none'
              rounded='3xl'
              borderWidth={1}
              color='cf.green'
              borderColor='cf.green'
              // onClick={_ => history.push(`/farms/${myfarm._id}`)}
              onClick={_ => {
                sessionStorage.setItem('selectedFarm', JSON.stringify(myfarm))
                setTimeout(() => {
                  return history.push(`/farms/${myfarm._id}`)
                }, 500)
              }}
            >
              View Farm
            </Button>
          ) : null}
        </Flex>
      </Flex>
      <Grid templateColumns='repeat(1, 1fr)' w='100%' p={4}>
        <GridItem>
          <Flex py={2} direction='row' align='center' justify='space-between'>
            <Text fontWeight='thick' fontSize='md'>
              Quantity (Tonnes)
            </Text>
            <Text fontWeight='bold' fontSize='md' fontFamily='num'>
              {myfarm ? farmQuantity : quantity}
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex py={2} direction='row' align='center' justify='space-between'>
            <Text fontWeight='thick' fontSize='md'>
              Weight (kg)
            </Text>
            <Text fontWeight='bold' fontSize='md' fontFamily='num'>
              {myfarm ? produceWeight : weight}
            </Text>
          </Flex>
        </GridItem>

        <GridItem>
          <Flex py={2} direction='row' align='center' justify='space-between'>
            <Text fontWeight='thick' fontSize='md'>
              Number of Boxes (5kg Per Box)
            </Text>
            <Text fontWeight='bold' fontSize='md' fontFamily='num'>
              {myfarm ? numberOfBags : bags}
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      <Box align='center' justify='center'>
        {sellButton === 'true' && (
          <Link
            as={ReachRouter}
            _hover={{ textDecor: 'none' }}
            to={{ pathname: '/marketplace', state: myfarm }}
          >
            <Button
              colorScheme='linear'
              rounded='3xl'
              borderWidth={1}
              color='white'
              // isLoading
              w='100%'
              isDisabled={farmQuantity === 0}
            >
              Sell Produce
            </Button>
          </Link>
        )}
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
