import React from 'react'
import { Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Support as SupportIcon, Schedule, Update } from 'theme/Icons'

const Support = () => {
  return (
    <>
      <Heading as='h6' fontSize='md' mb={3} textAlign='center'>
        What is included in this farm
      </Heading>
      <Flex justify='space-between' align='center' fontSize='sm'>
        <Flex align='center'>
          <Icon as={Update} color='cf.800' boxSize={5} />
          <Text ml={1}>Farm Updates</Text>
        </Flex>
        <Flex align='center' mx={6}>
          <Icon as={SupportIcon} color='cf.800' boxSize={5} />
          <Text ml={1}>Support</Text>
        </Flex>
        <Flex align='center'>
          <Icon as={Schedule} color='cf.800' boxSize={5} />
          <Text ml={1}>Scheduled Farm Visits</Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Support
