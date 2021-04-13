import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'

const FarmBoardEmptyState = () => {
  return (
    <Flex align='center' justify='center'>
      <Flex>
        <Text>Currently, there are no content on the farm board :( </Text>
      </Flex>
      <GetStartedNowCard />
    </Flex>
  )
}

export default FarmBoardEmptyState
