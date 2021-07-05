import { Box, Grid, Image, Heading, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Button from 'components/Button'

import React from 'react'
const MotionGrid = motion(Grid)

const WaitingPage = () => {
  return (
    <MotionGrid
      display={{ base: 'flex' }}
      flexDir={{ base: 'column-reverse', md: 'row' }}
      w={{ base: '100%', xl: '75%' }}
      pt={{ md: 'auto' }}
      h={{ base: '90vh', md: '75vh', lg: '80vh' }}
      borderWidth={1}
      borderRadius={10}
      borderColor={{ base: 'transparent', md: 'gray.200' }}
    >
      <Flex textAlign='center' w='100%' h='100%'>
        <Box bg='red' textAlign='center' w={{ base: '100%' }}>
          <Image
            w={{ base: '12.5rem' }}
            h={{ base: '12.5rem' }}
            objectFit='cover'
            src={null}
          />
        </Box>

        <Box w='100%'>
          <Heading as='h2'>
            Our team will be processing your request and this process takes
            about 7 business days so relax and when the time is up we’ll notify
            you on what to do. Thank you.
          </Heading>
        </Box>

        <Box>
          <Button
            display={{ base: 'none', lg: 'flex' }}
            textAlign='center'
            btntitle='Contact sales'
            borderColor='cf.green'
            color='white'
            fontWeight={900}
            rounded={30}
            mx={{ base: 3, md: 0 }}
            w='45%'
            h={55}
            fontSize={{ base: 'sm', xl: 'md' }}
            onClick={() => {}}
          />
        </Box>
      </Flex>
    </MotionGrid>
  )
}

export default WaitingPage
