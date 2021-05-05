/* eslint-disable */
import React from 'react'
import Header from 'container/Header'
import {Box, Flex, Grid, Heading, Link, Text} from '@chakra-ui/layout'
import { Link as ReachRouter } from 'react-router-dom'
import CooperativeCard from 'components/Cards/CooperativeCard'
import { Button } from 'components'
import useAuth from "context/auth";

const types = [
  {
    type: 'Tribe',
    members: 'five (5)',
    minAcres: 'No',
    discount: '1.3%',
    image: 'tribe.png',
    alt: 'tribe-image'
  },
  {
    type: 'Village',
    members: 'five (5)',
    minAcres: 10,
    discount: '3%',
    image: 'village.png',
    alt: 'village-image'
  },
  {
    type: 'City',
    members: 'Ten (10)',
    minAcres: 100,
    discount: '7.5%',
    image: 'city.png',
    alt: 'city-image'
  },
  {
    type: 'Nation',
    members: 'Twenty-five (25)',
    minAcres: 250,
    discount: '10%',
    image: 'nation.png',
    alt: 'nation-image'
  }
]

const Cooperative = () => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  document.title = 'Complete Farmer | Cooperative'
  const [selectedType, setSelectedType] = React.useState('')

  return (
    <Box>
      <Header />
      <Flex
        direction='column'
        w='100vw'
        h='92vh'
        align='center'
        justify='center'
        mt={20}
      >
        <Box textAlign="center" mb={20}>
          <Text>Welcome {user?.firstName}</Text>
          <Heading as="h4" fontSize={{base: 'xl', md: '2xl'}}>Select your cooperative type</Heading>
        </Box>
        <Grid templateColumns={{ md: 'repeat(4, 1fr)' }} gap={6}>
          {types.map(item => (
            <CooperativeCard
              key={item.type}
              item={item}
              selected={selectedType.type === item.type}
              onClick={() => setSelectedType(item)}
            />
          ))}
        </Grid>

        <Flex mt={20}>
          <Link as={ReachRouter} to="/start-farm" _hover={{ textDecor: 'none' }}>
            <Button
                btntitle='Back'
                px={{ base: 10, md: 20 }}
                h={{ base: 10, md: 12 }}
                fontSize={{ base: 'sm', md: 'md' }}
                bg='transparent'
                borderWidth={1}
                borderColor='gray.300'
                color='gray.500'
                mr={{md: 10}}
                _hover={{bg: 'transparent'}}
                _active={{bg: 'transparent'}}
            />
          </Link>

          <Link as={ReachRouter} to={{ pathname:'/start-farm/cooperative-farms', selectedType }} _hover={{ textDecor: 'none' }}>
            <Button
                btntitle='Continue'
                px={{ base: 10, md: 20 }}
                h={{ base: 10, md: 12 }}
                fontSize={{ base: 'sm', md: 'md' }}
                disabled={!selectedType}
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Cooperative
