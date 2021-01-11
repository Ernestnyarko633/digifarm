import { Box, Heading, Text } from '@chakra-ui/react'
import EventCard from 'components/Cards/EventCard'
import React from 'react'

const RightSidebar = () => {
  return (
    <Box
      as='aside'
      gridArea='right'
      px={{ md: 10 }}
      pos='fixed'
      bottom={0}
      right={0}
      h={{ lg: '100vh' }}
      bg='white'
      zIndex={20}
      pt={40}
    >
      <Heading
        as='h4'
        textTransform='uppercase'
        fontSize={{ md: '2xl' }}
        fontWeight={700}
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        pb={2}
      >
        Events
      </Heading>

      <Text fontSize='sm' color='gray.500' mt={3}>
        Growing conditions are currently perfect. Some irriagation work is being
        performed
      </Text>

      <Box mt={{ md: 4 }}>
        <EventCard />
      </Box>
    </Box>
  )
}

export default RightSidebar
