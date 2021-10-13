import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading } from '@chakra-ui/react'

const FarmManagerUpdateCard = ({ update }) => {
  return (
    <Box
      px={3}
      py={5}
      rounded='xl'
      cursor='pointer'
      color='white'
      bgGradient='linear(to-l, #93CF88,#5AA250)'
    >
      <Heading
        textTransform='uppercase'
        pb={2}
        as='h6'
        fontWeight='bold'
        fontSize={{ md: 'md', '4xl': 'lg', '5xl': '2xl' }}
      >
        {update.data.farm[0]?.text} Farm
      </Heading>
      <Text fontSize={{ md: 'sm', '4xl': 'md', '5xl': 'xl' }}>
        {update.data.comments[0]?.text}
      </Text>
    </Box>
  )
}

FarmManagerUpdateCard.propTypes = {
  update: PropTypes.any
}

export default FarmManagerUpdateCard
