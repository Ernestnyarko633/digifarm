import React from 'react'
import PropTypes from 'prop-types'
import { IoIosRefresh, IoMdArrowBack } from 'react-icons/io'
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
          {loading && (
            <Spinner
              size='lg'
              speed='0.65s'
              color='cf.800'
              thickness='4px'
              emptyColor='gray.200'
            />
          )}
          {text && !error && (
            <Text className='loading-text loading-text-b'>{text}</Text>
          )}
          {error && !loading && (
            <>
              <Text fontSize='md' ml={2} color='cf.800'>
                Something went wrong
              </Text>
              <Button
                bg='cf.900'
                variant='solid'
                color='white'
                size='md'
                rounded='20px'
                fontSize={20}
                onClick={() => {
                  return reload ? reload() : window.location.replace('/')
                }}
                leftIcon={reload ? <IoIosRefresh /> : <IoMdArrowBack />}
                _hover={{ bg: 'cf.800' }}
              >
                <Text fontSize='md'>{reload ? 'Try again' : 'Home'}</Text>
              </Button>
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

FetchCard.propTypes = {
  reload: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  text: PropTypes.any
}

export default FetchCard

//<Text my={2} fontSize='sm' color='cf.800'>
//              {error}
//            {/* TODO: use a better error when it is */}
//        </Text>
