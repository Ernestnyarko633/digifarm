import React from 'react';
import Layout from 'container/Layout';
import { Box, Heading, Image, Text ,Flex} from '@chakra-ui/core';
import WarehouseCard from 'components/Cards/WarehouseCard'
import IllustrationImage from '../assets/images/home/illustration.png';
import SoyaBean from '../assets/images/startfarm/soya-beans.svg'

const warehouseGoods = [
  {
    id:1,
    image: SoyaBean,
    name: 'Soya Bean Warehouse',
    location: 'AgyaAtta, Eastern Region',
    quantity: '2000 tonnes',
    weight: '200 kg',
    bags: '20 bags',
    condition: 'Moist'
  },
  {
    id:2,
    image: SoyaBean,
    name: 'Soya Bean Warehouse',
    location: 'AgyaAtta, Eastern Region',
    quantity: '2010 tonnes',
    weight: '300 kg',
    bags: '30 bags',
    condition: 'Dry'
  }
]

const Marketplace = () => {
  document.title = 'COMPLETE FARMER | MARKETPLACE'
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
        <Text>Sell tyour produce to the right buyer at a good price</Text>
      </Box>
    </Box>
    <Box>
      <Box textAlign='center' px={{md: 10}} py={{md: 8}}>
        <Heading as='h4' fontSize={{ md:'2xl'}}>Here's how your farm(s) are doing</Heading>
      </Box>
    </Box>
    <Flex my={3}>
      {warehouseGoods.map((item) => (
        <WarehouseCard 
          name={item.name}
          location={item.location}
          image={item.image}
          quantity={item.quantity}
          weight={item.weight}
          bags={item.bags}
          condition={item.condition}
          btntitle='Sell'
          mr={3}
          ml={10}
        />
      ))}
    </Flex>
    </Layout>
  );
};

export default Marketplace;
