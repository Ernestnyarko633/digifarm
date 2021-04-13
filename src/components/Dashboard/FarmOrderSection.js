import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/react'
import ComponentWrapper from 'components/Wrapper/ComponentWrapper'
import OrdersCard from 'components/Cards/OrdersCard'
import useComponent from 'context/component'
import FarmsCard from 'components/Cards/FarmsCard'

const FarmOrderSection = ({
  farms,
  PendingOrder,
  processingOrder,
  handleClick,
  onOpen
}) => {
  const {
    sliderType,
    setSliderType,
    currentFarmsSlide,
    currentProcessingOrdersSlide,
    currentPendingOrdersSlide
  } = useComponent()

  return (
    <ComponentWrapper
      state={sliderType}
      setState={setSliderType}
      firstStateValue='farms'
      secondStateValue='processing_order'
      thirdStateValue='pending_order'
      firstBoxTitle='Current Farms'
      secondBoxTitle='Processing Orders'
      thirdBoxTitle='Pending Orders'
      handleClick={handleClick}
    >
      <Box>
        <Flex>
          {sliderType === 'farms' && (
            <FarmsCard data={farms} currentSlide={currentFarmsSlide} />
          )}
          {sliderType === 'processing_order' && (
            <OrdersCard
              data={processingOrder}
              onOpen={onOpen}
              currentSlide={currentProcessingOrdersSlide}
            />
          )}
          {sliderType === 'pending_order' && (
            <OrdersCard
              data={PendingOrder}
              onOpen={onOpen}
              currentSlide={currentPendingOrdersSlide}
            />
          )}
        </Flex>
      </Box>
    </ComponentWrapper>
  )
}

FarmOrderSection.propTypes = {
  farms: PropTypes.array.isRequired,
  PendingOrder: PropTypes.array.isRequired,
  processingOrder: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
  onOpen: PropTypes.func
}

export default FarmOrderSection
