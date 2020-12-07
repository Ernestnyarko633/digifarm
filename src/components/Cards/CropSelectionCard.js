import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const CropSelectionCard = ({ acres, title }) => {
  return (
    <Flex
      align='center'
      direction='column'
      justify='center'
      w='100%'
      p={20}
      borderWidth={1}
      borderColor='gray.300'
      as='button'
      role='button'
      aria-label='crop card button'
    >
      {acres && (
        <Text color='red.600' fontSize='xs'>
          {acres} 100 acres left
        </Text>
      )}
      <Text>{title}</Text>
    </Flex>
  );
};

export default CropSelectionCard;
