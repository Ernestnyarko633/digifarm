import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Heading,
  Text
} from '@chakra-ui/react'
import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons'
import PropTypes from 'prop-types'
import WarehouseCard from 'components/Cards/WarehouseCard'
import Ware from 'assets/images/warehouse.png'

// import SoyaBean from '../../../assets/images/startfarm/soya-beans.svg'

const menus = [
  { id: 1, icon: Calendar, state: 'compA' },
  { id: 2, icon: Weather, state: 'compB' },
  { id: 3, icon: Crop, state: 'compC' },
  { id: 4, icon: FarmSchedule, state: 'compD' },
  { id: 5, icon: Updates, state: 'compE' }
]

// const warehouseGoods = [
//   {
//     id: 1,
//     image: SoyaBean,
//     name: 'Soya Bean Warehouse',
//     location: 'AgyaAtta, Eastern Region',
//     quantity: '2000 tonnes',
//     weight: '200 kg',
//     bags: '20 bags',
//     condition: 'Moist',
//     status: 'action'
//   },
//   {
//     id: 2,
//     image: SoyaBean,
//     name: 'Soya Bean Warehouse',
//     location: 'AgyaAtta, Eastern Region',
//     quantity: '2010 tonnes',
//     weight: '300 kg',
//     bags: '30 bags',
//     condition: 'Dry',
//     status: 'action'
//   },
//   {
//     id: 3,
//     image: SoyaBean,
//     name: 'Soya Bean Warehouse',
//     location: 'Shai Osudoku, Eastern Region',
//     quantity: '2010 tonnes',
//     weight: '300 kg',
//     bags: '30 bags',
//     condition: 'Moist',
//     status: 'sold'
//   }
// ]

export default function Warehouse({ digitalFarmerFarm, loading }) {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='5% 95%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem>
        <Box
          as='aside'
          pos='fixed'
          bottom={0}
          left={0}
          h={{ lg: '84vh' }}
          w={{ md: '5%' }}
          bg='white'
          zIndex={50}
          pt={10}
          shadow='md'
          px={{ md: 8 }}
          color='gray.600'
        >
          <Box as='ul'>
            {menus?.map(item => (
              <Flex
                as='button'
                role='button'
                aria-label={`${item.icon} button`}
                key={item.id}
                align='center'
                pb={6}
              >
                <Icon as={item.icon} />
              </Flex>
            ))}
          </Box>
        </Box>
      </GridItem>
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
          {!digitalFarmerFarm && (
            <Flex
              w='100%'
              justify='center'
              align='center'
              direction='column'
              py={{ md: 40 }}
            >
              <Image src={Ware} py={{ md: 10 }} />
              <Heading as='h6' fontSize={18} fontWeight={800} mb={{ md: 5 }}>
                Warehouse is empty
              </Heading>
              <Text fontSize='xs'>
                Your total farms and their details will show up here
              </Text>
            </Flex>
          )}
          <Grid templateColumns={{ md: 'repeat(1, 1fr)' }} gap={10} w='100%'>
            {digitalFarmerFarm && (
              <WarehouseCard
                sellButton={false}
                name={
                  digitalFarmerFarm?.order?.product?.cropVariety?.crop?.name
                }
                location={digitalFarmerFarm?.order?.product?.location?.name}
                image={digitalFarmerFarm?.order?.product?.cropVariety?.imageUrl}
                quantity={digitalFarmerFarm?.storage.quantity}
                weight={`${digitalFarmerFarm?.storage?.weight}`}
                bags={`${digitalFarmerFarm?.storage?.numberOfBags}`}
                condition={digitalFarmerFarm?.storage.yieldConditions}
                orderStatus={digitalFarmerFarm?.order?.status}
                mr={3}
                ml={14}
                status={digitalFarmerFarm?.status}
              />
            )}
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}
Warehouse.propTypes = {
  digitalFarmerFarm: PropTypes.any,
  loading: PropTypes.any
}
