import React from 'react'
import ReactPlayer from 'react-player/lazy'

import PropTypes from 'prop-types'

const VideoPlayer = ({ url, width, controls, loop, volume, playing }) => {
  return (
    <ReactPlayer
      width={width || '100%'}
      controls={controls || true}
      loop={loop || true}
      volume={volume || 0.3}
      url={url}
      playing={playing || false}
    />
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.any,
  controls: PropTypes.any,
  loop: PropTypes.bool,
  volume: PropTypes.number,
  playing: PropTypes.bool
}

export default VideoPlayer
