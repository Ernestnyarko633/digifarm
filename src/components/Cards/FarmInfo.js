import { Heading, Text, Box, Flex } from '@chakra-ui/core';
import { QuestionIcon } from '@chakra-ui/icons';
import React from 'react';

const FarmInfo = () => (
  <Box as='table' w={108} m={4}>
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between'>
        <Heading as='h3' fontSize='xl'>
          Ginger Farm
        </Heading>
        <Text>$750.00</Text>
      </Flex>
    </Box>
    <Box borderWidth={1} borderColor='gray.100' />
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between'>
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
      <Flex as='td' align='center' justify='space-between'>
        <Text mr={2} color='gray.600'>
          VAT
        </Text>
        <Text>$20.5</Text>
      </Flex>
    </Box>
    <Box borderWidth={1} borderColor='gray.100' />
    <Box as='tr'>
      <Flex as='td' align='center' justify='space-between'>
        <Text fontWeight={500} mr={2}>
          Total
        </Text>
        <Text fontWeight={700}>$870.50</Text>
      </Flex>
    </Box>
  </Box>
);

export default FarmInfo;
