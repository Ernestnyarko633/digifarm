import React from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { Flex, Text, Button } from '@chakra-ui/react'

const ReloadPage = () => {
  return (
    <Flex
      h='100vh'
      w='100wh'
      direction='column'
      align='center'
      justify='center'
      mx='auto'
    >
      <Flex
        textAlign='center'
        align='center'
        justify='center'
        direction='column'
      >
        <Text fontSize='md' ml={2} color='cf.400'>
          Something went wrong
        </Text>

        <Button
          bg='cf.900'
          variant='solid'
          color='white'
          size='md'
          rounded='20px'
          fontSize={20}
          onClick={() => window.location.reload()}
          leftIcon={<IoIosRefresh />}
          _hover={{ bg: 'cf.800' }}
        >
          <Text fontSize='md'>Refresh</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

ReloadPage.propTypes = {}

export default ReloadPage
