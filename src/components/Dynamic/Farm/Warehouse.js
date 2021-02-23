import React from 'react'
import { Box, Flex, Grid, GridItem, Icon } from '@chakra-ui/react'
import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons'
import PropTypes from 'prop-types'
import WarehouseCard from 'components/Cards/WarehouseCard'

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

export default function Warehouse({ farms }) {
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
          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)' }}
            gap={10}
            w={{ md: 115 }}
          >
            {farms.map(item => (
              <WarehouseCard
                key={item?._id}
                name={item?.order?.product?.cropVariety?.crop?.name}
                location={item?.order?.product?.location?.name}
                image={item?.order?.product?.cropVariety?.imageUrl}
                quantity={item?.storage.quantity}
                weight={`${item?.storage?.weight}`}
                bags={`${item?.storage?.numberOfBags}`}
                condition={item?.storage.yieldConditions}
                orderStatus={item?.order?.status}
                mr={3}
                ml={14}
                status={item?.status}
              />
            ))}
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}
Warehouse.propTypes = {
  farms: PropTypes.any
}
