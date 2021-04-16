import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text, Image } from '@chakra-ui/react'
import { IoMdCreate } from 'react-icons/io'

import Button from 'components/Button'

const SignatureDisplay = ({ data, isEditing, setIsEditing, contract }) => {
  return (
    <>
      <Flex w='100%' justifyContent='flex-end'>
        {contract ? (
          ''
        ) : (
          <Button
            btntitle='Change'
            shadow='none'
            leftIcon={<IoMdCreate size={20} />}
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
      </Flex>
      <Flex
        p={4}
        w='full'
        rounded='md'
        pos='relative'
        flexWrap='wrap'
        bgColor='white'
        justifyContent='space-between'
      >
        <Box
          p={contract ? 0 : 5}
          height={contract ? 'unset' : '100px'}
          width='200px'
        >
          {data?.check === 'image' ? (
            <Image
              src={data?.string}
              alt='signature'
              p={contract ? '0' : '10px'}
              maxW={contract ? '200px' : '150px'}
              maxH={contract ? '100px' : '150px'}
            />
          ) : (
            <Text
              as='span'
              mt={contract ? 2 : 10}
              fontSize={contract ? { md: 'xl' } : { md: '3xl' }}
              fontWeight='bold'
              fontFamily='signature'
            >
              {data?.string}
            </Text>
          )}
        </Box>
      </Flex>
    </>
  )
}

SignatureDisplay.propTypes = {
  contract: PropTypes.any,
  data: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired
}

export default SignatureDisplay
