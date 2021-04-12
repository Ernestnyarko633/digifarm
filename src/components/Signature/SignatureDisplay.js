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
        <Box p={contract ? 0 : 5} height='100px' width='200px'>
          {data?.check === 'image' ? (
            <Image
              p='10px'
              src={data?.string}
              alt='signature'
              pos={contract ? 'absolute' : ''}
              width={contract ? '200px' : '150px'}
              height={contract ? '120px' : '150px'}
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
