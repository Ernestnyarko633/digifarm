import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import IllustrationImage from '../../assets/images/home/illustration.png'

const FarmBoardGreetings = () => {
  return (
    <Box pos='relative'>
      <Image
        src={IllustrationImage}
        h={{ md: 115 }}
        w='100%'
        objectFit='cover'
      />
      <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
        <Heading as='h3' fontSize={{ md: '4xl' }} mb={5}>
          Welcome to your farm booard
        </Heading>
        <Text fontFamily='body'>
          Here's where you view, share and like all <br /> the news from your
          farm(s)
        </Text>
      </Box>
    </Box>
  )
}

export default FarmBoardGreetings
