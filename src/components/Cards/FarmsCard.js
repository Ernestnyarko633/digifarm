import { Box, Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import useComponent from 'context/component'
import { motion } from 'framer-motion'
import React from 'react'
import FarmCard from './FarmCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

// const farms = [
//   {
//     _id: 1,
//     name: 'John’s Farm',
//     location: 'Agyata, Eastern region',
//     level: 1
//   },
//   {
//     _id: 2,
//     name: 'John’s Farm 2',
//     location: 'Agyata, Eastern region',
//     level: 2
//   }
// ]

const FarmsCard = ({ data }) => {
  const { currentSlide } = useComponent()
  return (
    <Box>
      {data.length === 0 ? (
        <Flex align='center' justify='center' my={{ md: 10 }}>
          <Text>You have no active farm</Text>
        </Flex>
      ) : (
        <MotionFlex
          animate={{
            x: `-${56.5 * currentSlide}rem`,
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
      )}
    </Box>
  )
}

FarmsCard.propTypes = {
  data: PropTypes.array.isRequired
}
export default FarmsCard
