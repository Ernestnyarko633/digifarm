import React from 'react'
import { Box, Heading, Image, Text } from '@chakra-ui/react'

import useAuth from 'context/auth'

import IllustrationImage from '../../assets/images/home/illustration.png'

const Greetings = () => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  return (
    <Box pos='relative'>
      <Image src={IllustrationImage} h={{ md: 115 }} w='100%' objectFit='cover' />
      <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
        <Heading as='h3' fontSize={{ md: '4xl' }}>
          Welcome Farmer {user?.firstName}
        </Heading>
        <Text>Get started by farming individually or with a group.</Text>
      </Box>
    </Box>
  )
}

export default Greetings
