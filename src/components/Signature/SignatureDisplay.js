import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text, Image } from '@chakra-ui/react'
import { IoMdCreate } from 'react-icons/io'

import Button from 'components/Button'

const SignatureDisplay = ({ data, isEditing, setIsEditing }) => {
  return (
    <>
      <Flex w='100%' justifyContent='flex-end'>
        <Button
          btntitle='Change'
          shadow='none'
          leftIcon={<IoMdCreate size={20} />}
          onClick={() => setIsEditing(!isEditing)}
        />
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
        <Box p={5} height='100px'>
          {data?.check === 'image' ? (
            <Image
              p='10px'
              src={data?.string}
              alt='signature'
              width='150px'
              height='150px'
            />
          ) : (
            <Text
              mt={10}
              as='span'
              fontSize={{ md: '2xl' }}
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
  data: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired
}

export default SignatureDisplay
