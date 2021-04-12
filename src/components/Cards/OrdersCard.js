import { Flex } from '@chakra-ui/react'
import useComponent from 'context/component'
import { motion } from 'framer-motion'
import React from 'react'
import PropTypes from 'prop-types'
import OrderCard from './OrderCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const OrdersCard = ({ onOpen, data }) => {
  const { currentSlide } = useComponent()

  return (
    <MotionFlex
      animate={{
        x: `-${33.5 * currentSlide}rem`,
        transition: { duration: 0.6, ...transition }
      }}
      pos='relative'
      minW={{ md: 130 }}
      maxW={{ base: 90, md: 'auto' }}
      overflowX='scroll'
      mx='auto'
    >
      {data.map(order => (
        <OrderCard order={order} key={order._id} onOpen={onOpen} />
      ))}
    </MotionFlex>
  )
}

OrdersCard.propTypes = {
  data: PropTypes.array,
  onOpen: PropTypes.func
}

export default OrdersCard
