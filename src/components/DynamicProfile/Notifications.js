import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Container,
  Switch
} from '@chakra-ui/react'
import React from 'react'
import Headings from './Headings'
const Notifications = () => {
  return (
    <Container maxW='4xl'>
      <Headings title='Notifications' />
      <Divider orientation='horizontal' my={12} />
      <Box p={10}>
        <Flex justify='space-between'>
          <Box>
            <Text fontFamily='heading' fontSize={{ md: 'xl' }}>
              On Complete Farmer
            </Text>
            <Text>
              Turn notification on to receive notification in your dashboard
            </Text>
          </Box>

          <Box>
            <Switch colorScheme='cfButton' size='lg' />
          </Box>
        </Flex>

        <Divider orientation='horizontal' my={6} />

        <Flex justify='space-between'>
          <Box>
            <Text fontFamily='heading' fontSize={{ md: 'xl' }}>
              By Email
            </Text>
            <Text>Turn on to receive notification via email</Text>
          </Box>

          <Box>
            <Switch colorScheme='cfButton' size='lg' />
          </Box>
        </Flex>

        <Divider orientation='horizontal' my={6} />

        <Flex justify='space-between'>
          <Box>
            <Text fontFamily='heading' fontSize={{ md: 'xl' }}>
              By push notification
            </Text>
            <Text>Turn on to receive notification via push notification</Text>
          </Box>

          <Box>
            <Switch colorScheme='cfButton' size='lg' />
          </Box>
        </Flex>

        <Divider orientation='horizontal' my={6} />
      </Box>
    </Container>
  )
}

export default Notifications
