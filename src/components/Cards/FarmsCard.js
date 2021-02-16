import { Flex } from '@chakra-ui/react'
import useComponent from 'context/component'
import { motion } from 'framer-motion'
import React from 'react'
import FarmCard from './FarmCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const farms = [
  {
    _id: 1,
    name: 'John’s Farm',
    location: 'Agyata, Eastern region',
    level: 1
  },
  {
    _id: 2,
    name: 'John’s Farm 2',
    location: 'Agyata, Eastern region',
    level: 2
  }
]

const FarmsCard = () => {
  const { currentSlide } = useComponent()
  return (
    <MotionFlex
      animate={{
        x: `-${56.5 * currentSlide}rem`,
        transition: { duration: 0.6, ...transition }
      }}
      pos='relative'
      minW={{ md: 130 }}
      mx='auto'
    >
      {farms.map(farm => (
        <FarmCard key={farm._id} farm={farm} />
      ))}
    </MotionFlex>
  )
}

export default FarmsCard
