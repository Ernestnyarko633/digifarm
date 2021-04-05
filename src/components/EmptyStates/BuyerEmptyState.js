import React from 'react'
import { Flex, Heading, Text, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const BuyerEmptyState = ({ image, note, info, ml }) => {
  return (
    <Flex
      pb={{ md: 20 }}
      mt={{ md: 20 }}
      direction='column'
      alignItems='center'
    >
      <Image src={image} w='14' mb={4} />
      <Heading as='h4' fontSize={{ md: 'xl' }} mb={4} fontWeight='bold'>
        {note}
      </Heading>
      <Text fontSize={{ md: 'xl' }} color='gray.400'>
        {info}
      </Text>
    </Flex>
  )
}
BuyerEmptyState.propTypes = {
  note: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  ml: PropTypes.any.isRequired
}

export default BuyerEmptyState
