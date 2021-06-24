import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import FarmCard from './FarmCard'
import { Box } from '@chakra-ui/layout'

const MotionFlex = motion(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const FarmsCard = ({ data, currentSlide }) => {
  return (
    <Box
      minW={{ md: 130 }}
      mx='auto'
      overflowX={{ base: 'scroll', xl: 'unset' }}
    >
      <MotionFlex
        animate={{
          x: `-${46.5 * currentSlide}rem`,
          transition: { duration: 0.6, ...transition }
        }}
        pos='relative'
      >
        {data?.map(farm => (
          <FarmCard key={farm._id} id={farm?._id} farm={farm} />
        ))}
      </MotionFlex>
    </Box>
  )
}

FarmsCard.propTypes = {
  data: PropTypes.array.isRequired,
  currentSlide: PropTypes.number.isRequired
}
export default FarmsCard
