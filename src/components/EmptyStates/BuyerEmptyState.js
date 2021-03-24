import React from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const BuyerEmptyState = ({ image, note, info }) => {
  return (
    <Box textAlign='center' p={{ md: 16 }}>
      <Box pb={{ md: 16 }}>
        <Image src={image} w='20' ml='40' mb={4} />
        <Heading as='h4' fontSize={{ md: '20px' }} mb={4}>
          {note}
        </Heading>
        <Text fontSize='20px' color='gray.400'>
          {info}
        </Text>
      </Box>
    </Box>
  )
}
BuyerEmptyState.propTypes = {
  note: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired
}

export default BuyerEmptyState
