import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Box, Flex, Text } from '@chakra-ui/react'

import FarmCard from './FarmCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const FarmsCard = ({ data, currentSlide }) => {
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
  data: PropTypes.array.isRequired,
  currentSlide: PropTypes.number.isRequired
}
export default FarmsCard
