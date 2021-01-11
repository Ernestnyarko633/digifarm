import React from 'react'
import Layout from 'container/Layout'
import { Box, Heading, Image, Flex } from '@chakra-ui/react'
import WarehouseCard from 'components/Cards/WarehouseCard'
import ArrowButton from '../components/Button/ArrowButton'

import IllustrationImage from '../assets/images/home/illustration.png'
import SoyaBean from '../assets/images/startfarm/soya-beans.svg'

const warehouseGoods = [
  {
    id: 1,
    image: SoyaBean,
    name: 'Soya Bean Warehouse',
    location: 'AgyaAtta, Eastern Region',
    quantity: '2000 tonnes',
    weight: '200 kg',
    bags: '20 bags',
    condition: 'Moist'
  },
  {
    id: 2,
    image: SoyaBean,
    name: 'Soya Bean Warehouse',
    location: 'AgyaAtta, Eastern Region',
    quantity: '2010 tonnes',
    weight: '300 kg',
    bags: '30 bags',
    condition: 'Dry'
  }
  // {
  //   id:3,
  //   image: SoyaBean,
  //   name: 'Soya Bean Warehouse',
  //   location: 'Shai Osudoku, Eastern Region',
  //   quantity: '2010 tonnes',
  //   weight: '300 kg',
  //   bags: '30 bags',
  //   condition: 'Moist'
  // }
]

const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'

  return (
    <Layout>
      <Box pos='relative'>
        <Image src={IllustrationImage} h={{ md: 115 }} w='100%' objectFit='cover' />
        <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
          <Heading as='h3' fontSize={{ md: '4xl' }}>
            Welcome to your warehouse
          </Heading>
        </Box>
      </Box>
      <Flex align='center' justify='space-between' p={{ md: 16 }}>
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Here's how your farm(s) are doing
        </Heading>
        <ArrowButton />
      </Flex>
      <Flex my={3}>
        {warehouseGoods.map(item => (
          <WarehouseCard
            key={item.name}
            name={item.name}
            location={item.location}
            image={item.image}
            quantity={item.quantity}
            weight={item.weight}
            bags={item.bags}
            condition={item.condition}
            mr={3}
            ml={14}
          />
        ))}
      </Flex>
    </Layout>
  )
}

export default Warehouse
