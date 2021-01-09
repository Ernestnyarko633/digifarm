import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Container,
  Divider,
  Checkbox,
  Link,
  Icon,
  Stack
} from '@chakra-ui/react'
import { chevronRight } from 'theme/Icons'

const PrivacyAndData = () => {
  return (
    <Container maxW='4xl'>
      <Box p={10} rounded='md' bg='white'>
        <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
          Privacy &amp; Data
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

      <Box>
        <Box>
          <Heading as='h5' fontSize={{ md: '2xl' }} fontFamily='display' mb={2}>
            Search privacy{' '}
          </Heading>
          <Flex align='center'>
            <Checkbox size='lg' colorScheme='cfButton' borderColor='black' />{' '}
            <Text ml={3}>
              Hide your profile from search engines.{' '}
              <Link _hover={{ textDecor: 'none' }} color='cf.400' ml={6}>
                Learn more <Icon as={chevronRight} />
              </Link>
            </Text>
          </Flex>
        </Box>

        <Divider orientation='horizontal' my={12} />

        <Box>
          <Box>
            <Heading
              as='h5'
              fontSize={{ md: '2xl' }}
              fontFamily='display'
              mb={2}
            >
              Personalization
            </Heading>
            <Text>
              Use your Google account, LinkedIn or Twitter <br />
              account to log into Complete Farmer.
            </Text>
          </Box>

          <Stack mt={6}>
            <Checkbox size='lg' colorScheme='cfButton' borderColor='black'>
              Use your Google account to log in
            </Checkbox>
            <Checkbox size='lg' colorScheme='cfButton' borderColor='black'>
              Use your Twitter account to log in
            </Checkbox>
            <Checkbox size='lg' colorScheme='cfButton' borderColor='black'>
              Use your Facebook account to log in
            </Checkbox>
            <Checkbox size='lg' colorScheme='cfButton' borderColor='black'>
              Use your LinkedIn account to log in
            </Checkbox>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default PrivacyAndData
