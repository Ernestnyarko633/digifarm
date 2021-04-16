import React from 'react'
import PropTypes from 'prop-types'
import { Image, Skeleton } from '@chakra-ui/react'

const ImageLoader = ({ rounded, height, ...rest }) => {
  const [isLoaded, setLoading] = React.useState(false)

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
        loading='eager'
        rounded={rounded}
        onLoad={() => setLoading(true)}
      />
    </Skeleton>
  )
}

ImageLoader.propTypes = {
  rounded: PropTypes.any,
  height: PropTypes.any
}

export default ImageLoader
