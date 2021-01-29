import React from 'react'
import PropTypes from 'prop-types'
import { IoIosRefresh } from 'react-icons/io'
import { Flex, Text, Button } from '@chakra-ui/react'
import Loader from 'react-loader-spinner'

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
          {loading && (
            <Loader type='Oval' color='#417505' height={30} width={30} />
          )}
          {text && !error && (
            <Text className='loading-text loading-text-b'>{text}</Text>
          )}
          {error && (
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
