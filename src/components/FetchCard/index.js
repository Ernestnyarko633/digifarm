import React from 'react'
import PropTypes from 'prop-types'
import { IoIosRefresh } from 'react-icons/io'
import { Flex, Text, Spinner, Button } from '@chakra-ui/react'

const FetchCard = ({ loading, error, text, reload, ...rest }) => {
  return (
    <Flex {...rest}>
      <Flex
        textAlign='center'
        align='center'
        justify='center'
        direction='column'
      >
        <>
          {loading && <Spinner size='lg' color='cf.400' />}
          {text && !error && (
            <Text className='loading-text loading-text-b'>{text}</Text>
          )}
          {error && !loading && (
            <>
              <Text fontSize='md' ml={2} color='cf.400'>
                Something went wrong
              </Text>
              <Button
                bg='cf.800'
                variant='solid'
                color='white'
                size='md'
                rounded='20px'
                fontSize={30}
                onClick={() => reload()}
                leftIcon={<IoIosRefresh />}
                _hover={{ bg: 'cf.800' }}
              >
                <Text fontSize='md'>Try again</Text>
              </Button>
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

FetchCard.propTypes = {
  reload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  text: PropTypes.any
}

export default FetchCard
