import React from 'react'
import Layout from 'container/Layout'
import { Box, Heading, Image, Text, Flex } from '@chakra-ui/react'
import BuyerCard from 'components/Cards/BuyerCard'
import SoyaBean from '../assets/images/startfarm/soya-beans.svg'
import IllustrationImage from '../assets/images/home/illustration.png'
import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard'
import ArrowButton from '../components/Button/ArrowButton'

const buyers = [
  {
    id: 1,
    image: Oval,
    name: 'John Clinton',
    address: 'Accra | John Clinton Company Limited',
    amtLeft: '2100',
    amtNeeded: '3000',
    amtBought: '900',
    price: '$30.00'
  },
  {
    id: 2,
    image: Oval,
    name: 'Georgina Adzorgenu',
    address: 'Ayikuma | Approcon Enterprise Limited',
    amtLeft: '800',
    amtNeeded: '2000',
    amtBought: '1200',
    price: '$50.00'
  }
]

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

const Marketplace = () => {
  document.title = 'Complete Farmer | Marketplace'

  return (
    <Layout>
      <Box pos='relative'>
        <Image
          src={IllustrationImage}
          h={{ md: 115 }}
          w='100%'
          objectFit='cover'
        />
        <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
          <Heading as='h3' fontSize={{ md: '4xl' }}>
            Welcome to your marketplace
          </Heading>
          <Text>Sell your produce to the right buyer at a good price</Text>
        </Box>
      </Box>
      <Flex align='center' justify='space-between' p={{ md: 16 }}>
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Here are the crops in your warehouse
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
            ml={14}
          />
        ))}
      </Flex>
      <Box my={10} mx={14} px={14}>
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Buyers you can sell to
        </Heading>
      </Box>
      <Box>
        {buyers.map(buyer => (
          <BuyerCard
            key={buyer.name}
            name={buyer.name}
            address={buyer.address}
            image={buyer.image}
            amtLeft={buyer.amtLeft}
            amtNeeded={buyer.amtNeeded}
            amtBought={buyer.amtBought}
            price={buyer.price}
          />
        ))}
      </Box>
    </Layout>
  )
}

export default Marketplace
