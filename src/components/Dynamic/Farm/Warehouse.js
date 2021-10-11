import React from 'react'
import {
  Box,
  // Flex,
  Grid,
  GridItem
  // Image,
  // Heading,
  // Text
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import WarehouseCard from 'components/Cards/WarehouseCard'
// import Ware from 'assets/images/warehouse.png'

const Warehouse = ({ digitalFarmerFarm }) => {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
    >
      <GridItem>
        <Box
          minW={{ lg: '95%' }}
          as='main'
          color='gray.800'
          bg='gray.50'
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          px={{ md: 24 }}
          minH={{ lg: '100vh' }}
        >
          {/* {!digitalFarmerFarm?.storage.quantity && (
            <Flex
              w='100%'
              justify='center'
              align='center'
              direction='column'
              py={{ md: 40 }}
              h={{ base: '100vh', md: '100%' }}
            >
              <Image src={Ware} py={{ base: 6, md: 10 }} />
              <Heading
                as='h6'
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight={800}
                mb={{ md: 5 }}
              >
                Warehouse is empty
              </Heading>
              <Text fontSize='xs'>
                Your farm yield and their details will show up here
              </Text>
            </Flex>
          )} */}
          <Grid
            templateColumns={{ md: 'repeat(1, 1fr)' }}
            gap={10}
            w='100%'
            mt={{ base: 48, sm: 0 }}
            px={{ base: 4, sm: 0 }}
          >
            <WarehouseCard
              name={digitalFarmerFarm?.order?.product?.cropVariety?.crop?.name}
              location={digitalFarmerFarm?.order?.product?.location?.name}
              image={digitalFarmerFarm?.order?.product?.cropVariety?.imageUrl}
              quantity={
                digitalFarmerFarm?.order?.acreage *
                digitalFarmerFarm?.order?.product?.storagePerAcre
              }
              weight={`${
                digitalFarmerFarm?.order?.acreage *
                digitalFarmerFarm?.order?.product?.weightOfProducePerAcre
              }`}
              bags={`${
                digitalFarmerFarm?.order?.acreage *
                digitalFarmerFarm?.order?.product?.quantityOfStoragePerAcre
              }`}
              condition={digitalFarmerFarm?.storage?.yieldConditions}
              orderStatus={digitalFarmerFarm?.order?.status}
              mr={3}
              ml={14}
              status={digitalFarmerFarm?.status}
            />
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}
Warehouse.propTypes = {
  digitalFarmerFarm: PropTypes.object.isRequired
}

export default Warehouse
