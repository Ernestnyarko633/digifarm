import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react'
import React from 'react'
import Button from 'components/Button/index'
import Bitmap from 'assets/images/Bitmap.png'

const YourFarmCard = () => {
  const dummyFarms = [
    { name: 'FarmX', color: '#FF9F9F' },
    { name: 'FarmY', color: '#76B1F6' },
    { name: 'FarmZ', color: '#EEE463' },
    { name: 'FarmT', color: '#AED033' },
  ]
  return (
    <Box bg='white' w='100%' mb={5}>
      <Box w='100%'>
        <Flex align='center'
          justify='center'
          direction='column'
          p={10}
          w='100%'>
          <Flex direction='row' justify='space-around' w='100%'>
            <Heading as='h6' fontSize='lg'>
              Your Farm(s)
            </Heading>
            <Button borderWidth={2}
              borderColor='black'
              colorScheme='white'
              btntitle='Start a farm'
              color='black' />
          </Flex>
          <Flex direction='row' align='center' justify='center' m={10}>
            {dummyFarms.map((farm) => {
              return (
                <Flex direction='column' align='center' justify='center' m={4}>
                  <Text fontSize='md' mb={3}>
                    {farm.name}
                  </Text>
                  <Box w='120px' h='120px' rounded='120px'>
                    <Image w='100%' h='100%' rounded='100%' src={Bitmap} />
                    <Badge position='absolute'
                      top={735}
                      bg={farm.color}
                      rounded='25px'
                      w='25px'
                      h='25px'>
                      <Box rounded='25px' w='25px' h='25px'></Box>
                    </Badge>
                  </Box>
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default YourFarmCard
