import React from 'react'
import { Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Support as SupportIcon, Schedule, Update } from 'theme/Icons'

const Support = () => {
  return (
    <box>
      <Heading as='h6' fontSize='md' mb={3} textAlign='center'>
        What is included in this farm
      </Heading>
      <Flex justify='space-between' align='center' fontSize='sm'>
        <Flex align='center' direction={{ base: 'column', md: 'row' }}>
          <Icon as={Update} color='cf.800' boxSize={5} />
          <Text ml={1}>Farm Updates</Text>
        </Flex>
        <Flex
          align='center'
          mx={{ base: 3, md: 6 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Icon as={SupportIcon} color='cf.800' boxSize={5} />
          <Text ml={1}>Support</Text>
        </Flex>
        <Flex align='center' direction={{ base: 'column', md: 'row' }}>
          <Icon as={Schedule} color='cf.800' boxSize={5} />
          <Text ml={1}>Scheduled Farm Visits</Text>
        </Flex>
      </Flex>
    </box>
  )
}

export default Support
