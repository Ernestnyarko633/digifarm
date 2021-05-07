import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const FarmBoardEmptyState = () => {
  return (
    <Flex w='100%' align='center' justify='center'>
      <Flex w='100%' align='center' justify='center' color='cf.800'>
        <Text>Currently, there are no content on the farm board :( </Text>
      </Flex>
    </Flex>
  )
}

export default FarmBoardEmptyState
