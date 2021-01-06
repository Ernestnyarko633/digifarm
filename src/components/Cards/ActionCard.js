import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const ActionCard = ({ title, text, btnText }) => {
  return (
    <Flex
      justify='space-between'
      rounded='30px'
      borderWidth={1}
      borderColor='gray.200'
      py={6}
      px={10}
    >
      <Box>
        <Heading as='h6' size='md' fontFamily='display' mb={2}>
          {title}
        </Heading>
        <Text
          lineHeight='normal'
          fontSize='sm'
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Box>

      <Box>
        <Button
          bg='transparent'
          borderWidth={1}
          borderColor='cf.400'
          color='cf.400'
          rounded='30px'
          fontSize='sm'
          px={8}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          fontFamily='body'
        >
          {btnText}
        </Button>
      </Box>
    </Flex>
  );
};

export default ActionCard;
