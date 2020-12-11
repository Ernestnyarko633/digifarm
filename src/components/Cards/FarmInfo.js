import { Heading, Text, Box, Flex } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'
import React from 'react'

const FarmInfo = ({ width = 108, margin = 4 }) => (
  <Box as='table' w={width} m={margin}>
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between' pb={2}>
        <Heading as='h3' fontSize='xl'>
          Ginger Farm
        </Heading>
        <Text>$750.00</Text>
      </Flex>
    </Box>
    <Box borderWidth={1} borderColor='gray.100' />
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between' py={2}>
        <Flex align='center'>
          <Text mr={2} color='gray.600'>
            Management Fee
          </Text>
          <QuestionIcon color='cf.400' />
        </Flex>
        <Text>$100.00</Text>
      </Flex>
    </Box>
    <Box borderWidth={1} borderColor='gray.100' />
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between' py={2}>
        <Text mr={2} color='gray.600'>
          VAT
        </Text>
        <Text>$20.5</Text>
      </Flex>
    </Box>
    <Box borderWidth={1} borderColor='gray.100' />
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between' pt={2}>
        <Text fontWeight={500} mr={2}>
          Total
        </Text>
        <Text fontWeight={700}>$870.50</Text>
      </Flex>
    </Box>
  </Box>
)

export default FarmInfo
