import React from 'react'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const BuyerEmptyState = ({ image, note, info, ml }) => {
  return (
    <Box pb={{ md: 20 }} textAlign='center' mt={{ md: 20 }}>
      <Image src={image} w='14' ml={ml} mb={4} />
      <Heading as='h4' fontSize={{ md: 'xl' }} mb={4} fontWeight='bold'>
        {note}
      </Heading>
      <Text fontSize={{ md: 'xl' }} color='gray.400'>
        {info}
      </Text>
    </Box>
  )
}
BuyerEmptyState.propTypes = {
  note: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  ml: PropTypes.any.isRequired
}

export default BuyerEmptyState
