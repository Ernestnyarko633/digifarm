import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Container,
  Divider,
  Checkbox,
  Link,
  Icon,
  Stack
} from '@chakra-ui/react'
import Headings from './Headings'
import { chevronRight } from 'theme/Icons'

const PrivacyAndData = () => {
  return (
    <Container maxW='4xl'>
      <Headings title='Privacy &amp; Data' />
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
      </Box>
    </Container>
  )
}

export default PrivacyAndData
