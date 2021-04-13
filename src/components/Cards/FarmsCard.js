import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import FarmCard from './FarmCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const FarmsCard = ({ data, currentSlide }) => {
  return (
    <MotionFlex
      animate={{
        x: `-${45 * currentSlide}rem`,
        transition: { duration: 0.6, ...transition }
      }}
      pos='relative'
      minW={{ md: 130 }}
      mx='auto'
    >
      {data?.map(farm => (
        <FarmCard key={farm._id} farm={farm} />
      ))}
    </MotionFlex>
  )
}

FarmsCard.propTypes = {
  data: PropTypes.array.isRequired,
  currentSlide: PropTypes.number.isRequired
}
export default FarmsCard
