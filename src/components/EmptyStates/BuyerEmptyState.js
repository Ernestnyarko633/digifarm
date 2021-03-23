import React from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'

const HomeEmptyState = () => {
  return (
    <Box textAlign='center' p={{ md: 16 }}>
      <Box pb={{ md: 16 }}>
        <Image
          src={require('../../assets/images/group.png').default}
          w='20'
          ml='40'
          mb={4}
        />
        <Heading as='h4' fontSize={{ md: '20px' }} mb={4}>
          No available buyer yet
        </Heading>
        <Text fontSize='20px' color='gray.400'>
          Buyers will be available after your harvest
        </Text>
      </Box>
    </Box>
  )
}

export default HomeEmptyState
