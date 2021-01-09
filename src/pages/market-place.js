import React from 'react'
import Layout from 'container/Layout'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import BuyerCard from 'components/Cards/BuyerCard'

import IllustrationImage from '../assets/images/home/illustration.png'
import Oval from '../assets/images/Oval.svg'

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
      <Box my={6} textAlign='center'>
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Here's a list of available buyers
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
