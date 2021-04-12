import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/react'
import ComponentWrapper from 'components/Wrapper/ComponentWrapper'
import OrdersCard from 'components/Cards/OrdersCard'
import useComponent from 'context/component'
import FarmsCard from 'components/Cards/FarmsCard'

const FarmOrderSection = ({
  farms,
  pandingOrder,
  processingOrder,
  handleClick,
  onOpen
}) => {
  const { sliderState, setSliderState } = useComponent()

  return (
    <ComponentWrapper
      state={sliderState}
      setState={setSliderState}
      firstStateValue='farms'
      secondStateValue='processing_order'
      thirdStateValue='panding_order'
      firstBoxTitle='Current Farms'
      secondBoxTitle='Processing Orders'
      thirdBoxTitle='Pending Orders'
      handleClick={handleClick}
    >
      <Box>
        <Flex>
          {sliderState === 'farms' && <FarmsCard data={farms} />}
          {sliderState === 'processing_order' && (
            <OrdersCard data={processingOrder} onOpen={onOpen} />
          )}
          {sliderState === 'panding_order' && (
            <OrdersCard data={pandingOrder} onOpen={onOpen} />
          )}
        </Flex>
      </Box>
    </ComponentWrapper>
  )
}

FarmOrderSection.propTypes = {
  farms: PropTypes.array.isRequired,
  pandingOrder: PropTypes.array.isRequired,
  processingOrder: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  onOpen: PropTypes.func
}

export default FarmOrderSection
