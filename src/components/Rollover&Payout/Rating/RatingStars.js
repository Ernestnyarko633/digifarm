/* eslint-disable no-unused-vars */
import React from 'react'
import ReactStars from 'react-rating-stars-component'
import PropTypes from 'prop-types'
import { Box, Icon } from '@chakra-ui/react'
import { BsStar } from 'react-icons/bs'

const RatingStars = ({ count, onChange, size, activeColor, ...rest }) => {
  return (
    <Box w='100%' h='100%'>
      <ReactStars
        {...rest}
        count={count || 5}
        onChange={onChange}
        size={size || 24}
        activeColor={activeColor || '#00ff00'}
        classNames='star-ratings'
        emptyIcon={BsStar}
      />
    </Box>
  )
}

RatingStars.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.any,
  activeColor: PropTypes.any
}

export default RatingStars
