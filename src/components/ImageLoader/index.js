import React from 'react'
import PropTypes from 'prop-types'
import { Image, Skeleton } from '@chakra-ui/react'

const ImageLoader = ({ rounded, height, isLoaded, setLoading, ...rest }) => {
  return (
    <Skeleton
      startColor='gray.50'
      endColor='gray.100'
      rounded={rounded}
      isLoaded={isLoaded}
      height={height}
    >
      <Image
        display={{ md: 'flex' }}
        {...rest}
        rounded={rounded}
        onLoad={() => setLoading(true)}
      />
    </Skeleton>
  )
}

ImageLoader.propTypes = {
  rounded: PropTypes.any,
  height: PropTypes.any,
  isLoaded: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default ImageLoader
