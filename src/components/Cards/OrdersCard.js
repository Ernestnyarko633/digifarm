import { Flex } from '@chakra-ui/react'
import useComponent from 'context/component'
import { motion } from 'framer-motion'
import React from 'react'
import PropTypes from 'prop-types'
import OrderCard from './OrderCard'

const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const orders = [
  {
    _id: 1,
    name: 'Soy bean Farm',
    location: 'Agyata, Eastern region',
    progress: '80%'
  },
  {
    _id: 2,
    name: 'Soy bean Farm 2',
    location: 'Agyata, Eastern region',
    progress: '80%'
  }
]

const OrdersCard = ({ onOpen }) => {
  const { currentSlide } = useComponent()

  return (
    <MotionFlex
      animate={{
        x: `-${33.5 * currentSlide}rem`,
        transition: { duration: 0.6, ...transition }
      }}
      pos='relative'
      minW={{ md: 130 }}
      mx='auto'
    >
      {orders.map(order => (
        <OrderCard order={order} key={order._id} onOpen={onOpen} />
      ))}
    </MotionFlex>
  )
}

OrdersCard.propTypes = {
  onOpen: PropTypes.bool
}

export default OrdersCard
