import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const BankDetails = () => (
  <Box
    as='table'
    p='40px'
    mt='4'
    bg='cf.200'
    rounded='md'
    shadow='md'
    fontSize='sm'
  >
    <Box as='tbody'>
      <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.600' w={{ md: 40 }}>
            Bank:
          </Text>
          <Text
            fontWeight={700}
            textAlign='left'
            w={{ md: 72 }}
            color='cf.green'
          >
            ABSA Bank Ghana
          </Text>
        </Flex>
      </Box>
      <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.200'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.600' w={{ md: 40 }}>
            Branch:
          </Text>
          <Text
            fontWeight={700}
            textAlign='left'
            w={{ md: 72 }}
            color='cf.green'
          >
            High Street
          </Text>
        </Flex>
      </Box>
      <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.200'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.600' w={{ md: 40 }}>
            Account no:
          </Text>
          <Text
            fontWeight={700}
            textAlign='left'
            w={{ md: 72 }}
            color='cf.green'
          >
            0641409553 - USD
          </Text>
        </Flex>
      </Box>
      <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.200'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.600' w={{ md: 40 }}>
            Swift code:
          </Text>
          <Text
            fontWeight={700}
            textAlign='left'
            w={{ md: 72 }}
            color='cf.green'
          >
            BARCGHAC
          </Text>
        </Flex>
      </Box>
      <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.200'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.600' w={{ md: 40 }}>
            Account name:
          </Text>
          <Text
            fontWeight={700}
            textAlign='left'
            w={{ md: 72 }}
            color='cf.green'
          >
            Complete Farmer Limited
          </Text>
        </Flex>
      </Box>
    </Box>
  </Box>
)

export default BankDetails
