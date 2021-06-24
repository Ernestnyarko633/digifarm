/* eslint-disable react/prop-types */

import React from 'react'
import { Box, Icon, Text } from '@chakra-ui/react'
import { FaInfoCircle } from 'react-icons/fa'
import { Whisper } from 'rsuite'
// import { AiTwotoneCheckSquare } from 'react-icons/ai'

const FarmLegend = () => {
  const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
    const styles = {
      ...style,
      background: '#fff',
      width: 400,
      padding: 10,
      borderRadius: 4,
      position: 'absolute',
      border: '1px solid #ddd',
      boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
    }

    return (
      <div {...rest} style={styles} ref={ref}>
        This band combination is useful for monitoring agricultural crops. In
        the image, bright green represents vigorous, healthy vegetation while
        non-crops, such as mature trees, appear in a dull green. Coniferous
        forests appear as a dark, rich green while deciduous forests appear as a
        bright green. Sparsely vegetated and bare areas appear brown and mauve.
      </div>
    )
  })

  return (
    <Box>
      <Whisper
        trigger='hover'
        speaker={(props, ref) => {
          const { className, left, top, onClose } = props
          return (
            <Overlay
              style={{ left, top }}
              onClose={onClose}
              className={className}
              ref={ref}
            />
          )
        }}
      >
        <Box>
          <Icon as={FaInfoCircle} color='cf.800' />
          <Text px={2} as='span'>
            Map legend
          </Text>
        </Box>
      </Whisper>
    </Box>
  )
}

export default FarmLegend
