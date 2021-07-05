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
      <Flex
        direction='column'
        align='center'
        justify='center'
        w='100%'
        h='100%'
      >
        <Flex
          h={{ md: '100%' }}
          direction='column'
          align='center'
          justify='center'
          w={{ md: '50%' }}
          pb={{ md: 20 }}
        >
          <Box>
            <Image
              w={{ base: '12.5rem' }}
              h={{ base: '12.5rem' }}
              objectFit='cover'
              src={null}
            />
          </Box>

          <Box w='90%' textAlign='center' py={{ md: 20 }}>
            <Heading textAlign='center' as='h2' fontSize={{ md: 'xl' }}>
              Our team will be processing your request and this process takes
              about 7 business days so relax and when the time is up we’ll
              notify you on what to do. Thank you.
            </Heading>
          </Box>

          <Flex align='center' justify='center' w='100%'>
            <Button
              href='www.completefarmer.com'
              display={{ base: 'none', lg: 'flex' }}
              textAlign='center'
              btntitle='Contact sales'
              borderColor='cf.green'
              color='white'
              fontWeight={900}
              rounded={30}
              mx={{ base: 3, md: 0 }}
              w='40%'
              h={55}
              fontSize={{ base: 'sm', xl: 'md' }}
              onClick={() => {
                window.open('https://www.completefarmer.com/', '_blank')
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </MotionGrid>
  )
}

export default WaitingPage
