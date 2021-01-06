import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Container,
  Switch,
} from '@chakra-ui/react';
import React from 'react';

const Notifications = () => {
  return (
    <Container maxW='4xl'>
      <Box p={10} rounded='md' bg='white'>
        <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
          Notifications
        </Heading>
        <Flex align='center'>
          <Text fontSize='md'>
            Set your login preferences, help us personalize your <br />
            experience and make big account changes here
          </Text>
          <Flex align='center' ml={10}>
            <Button rounded='30px' w={40} h={12} shadow='sm'>
              Cancel
            </Button>
            <Button
              colorScheme='linear'
              rounded='30px'
              w={40}
              h={12}
              shadow='sm'
              ml={4}
              type='submit'
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>

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
  );
};

export default Notifications;
