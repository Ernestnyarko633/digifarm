import React from 'react'
import { Box, Flex, Icon, Tag, Text } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

const Step = () => (
  <Flex align='center' justify='space-between' pos='relative' mt={5}>
    <Flex align='center'>
      <Flex
        align='center'
        justify='center'
        rounded='100%'
        w={8}
        h={8}
        borderWidth={1}
        borderColor='gray.300'
        bg='cf.400'
        color='white'
      >
        <Icon as={FiCheck} />
      </Flex>
      <Box ml={3}>
        <Text as='span'>Prep</Text>
        <Text fontSize='xs' color='gray.500' mt={-2}>
          Finance preparation
        </Text>
      </Box>
    </Flex>
    <Box pos='absolute' borderLeftWidth={1} borderColor='gray.300' h={5} ml={4} top={10} />
    <Box textAlign='right'>
      <Tag bg='cf.200' color='cf.400' rounded='3xl' fontSize='sm' px={4} textAlign='center'>
        Completed
      </Tag>
      <Text fontSize='xs' color='gray.500' mt={-1}>
        3 days ago
      </Text>
    </Box>
  </Flex>
)

export default Step
