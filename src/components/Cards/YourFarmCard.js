import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react'
import React from 'react'
import Button from 'components/Button/index'
import Bitmap from 'assets/images/Bitmap.png'

const YourFarmCard = () => {
  const dummyFarms = [
    { name: 'FarmX', color: '#FF9F9F' },
    { name: 'FarmY', color: '#76B1F6' },
    { name: 'FarmZ', color: '#EEE463' },
    { name: 'FarmT', color: '#AED033' }
  ]
  return (
    <Box bg='white' w='100%' p={16}>
      <Flex align='center' justify='center' direction='column' w='100%'>
        <Flex align='center' direction='row' justify='space-around' w='100%'>
          <Heading as='h6' fontSize='lg'>
            Your Farm(s)
          </Heading>
          <Button rounded='30px' btntitle='Start a farm' />
        </Flex>
        <Flex direction='row' align='center' justify='center' my={10}>
          {dummyFarms.map(farm => (
            <Flex
              direction='column'
              align='center'
              justify='center'
              m={4}
              key={farm}
            >
              <Text fontSize='sm' mb={3}>
                {farm.name}
              </Text>
              <Box w={24} h={24} rounded='100%'>
                <Image w='100%' h='100%' rounded='100%' src={Bitmap} />
                <Badge
                  position='absolute'
                  top={745}
                  bg={farm.color}
                  rounded='25px'
                  w={5}
                  h={5}
                >
                  <Box rounded='25px' w='25px' h='25px'></Box>
                </Badge>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default YourFarmCard
