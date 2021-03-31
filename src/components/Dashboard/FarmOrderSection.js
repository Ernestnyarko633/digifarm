import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/react'
import ComponentWrapper from 'components/Wrapper/ComponentWrapper'
import OrdersCard from 'components/Cards/OrdersCard'
import useComponent from 'context/component'
import FarmsCard from 'components/Cards/FarmsCard'

const FarmOrderSection = ({ farms, orders, handleClick, onOpen }) => {
  const { state, setState } = useComponent()

  return (
    <ComponentWrapper
      state={state}
      setState={setState}
      firstStateValue='farms'
      secondStateValue='orders'
      firstBoxTitle='Current Farms'
      secondBoxTitle='Orders'
      handleClick={handleClick}
    >
      <Box>
        <Flex>
          {state === 'farms' && <FarmsCard data={farms} />}
          {state === 'orders' && <OrdersCard data={orders} onOpen={onOpen} />}
        </Flex>
      </Box>
    </ComponentWrapper>
  )
}

FarmOrderSection.propTypes = {
  farms: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  onOpen: PropTypes.bool
}

export default FarmOrderSection
