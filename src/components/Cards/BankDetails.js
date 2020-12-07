import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const BankDetails = () => {
  return (
    <Box
      as='table'
      p='40px'
      mt='4'
      bg='cf.300'
      rounded='md'
      shadow='md'
      fontSize='sm'
    >
      <Box as='tr'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.400' w={{ md: 40 }}>
            Bank:
          </Text>
          <Text fontWeight={500} textAlign='left' w={{ md: 72 }}>
            ABSA Bank Ghana
          </Text>
        </Flex>
      </Box>
      <Box borderWidth={1} borderColor='gray.100'></Box>
      <Box as='tr'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.400' w={{ md: 40 }}>
            Branch:
          </Text>
          <Text fontWeight={500} textAlign='left' w={{ md: 72 }}>
            High Street
          </Text>
        </Flex>
      </Box>
      <Box borderWidth={1} borderColor='gray.100'></Box>
      <Box as='tr'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.400' w={{ md: 40 }}>
            Account no:
          </Text>
          <Text fontWeight={500} textAlign='left' w={{ md: 72 }}>
            0641409553 - USD
          </Text>
        </Flex>
      </Box>
      <Box borderWidth={1} borderColor='gray.100'></Box>
      <Box as='tr'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.400' w={{ md: 40 }}>
            Swift code:
          </Text>
          <Text fontWeight={500} textAlign='left' w={{ md: 72 }}>
            BARCGHAC
          </Text>
        </Flex>
      </Box>
      <Box borderWidth={1} borderColor='gray.100'></Box>
      <Box as='tr'>
        <Flex
          as='td'
          align='center'
          justify='space-between'
          w={{ md: 80 }}
          p={{ md: 4 }}
        >
          <Text color='gray.400' w={{ md: 40 }}>
            Account name:
          </Text>
          <Text fontWeight={500} textAlign='left' w={{ md: 72 }}>
            Complete Farmer Limited
          </Text>
        </Flex>
      </Box>
      <Box borderWidth={1} borderColor='gray.100'></Box>
    </Box>
  );
};

export default BankDetails;
