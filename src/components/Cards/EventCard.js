import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const EventCard = () => {
  return (
    <Box
      rounded='xl'
      bgGradient='linear(to-l, #93CF88,#5AA250)'
      px={{ md: 3 }}
      py={{ md: 4 }}
      color='white'
    >
      <Flex align='center'>
        <Avatar size='xl' src={require('../../assets/images/pepper.png').default} />
        <Box ml={2}>
          <Heading as='h5' fontSize={{ md: 'xl' }}>
            Soy bean Farm
          </Heading>
          <Text fontSize='sm'>Agyata, Eastern region</Text>

          <Box mt={4}>
            <Button
              borderWidth={1}
              borderColor='white'
              px={{ md: 4 }}
              py={{ md: 1 }}
              fontSize='xs'
              bg='transparent'
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
              rounded='30px'
            >
              Check it out
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default EventCard
