import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Icon } from '@chakra-ui/react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import ComponentWrapper from 'components/Wrapper/ComponentWrapper'
import OrdersCard from 'components/Cards/OrdersCard'
import useComponent from 'context/component'
import FarmsCard from 'components/Cards/FarmsCard'

const EmptyState = ({ text }) => {
  return (
    <Flex w='100%' direction='column' justify='center' align='center'>
      <Icon
        as={MdRemoveShoppingCart}
        color='gray.400'
        boxSize={{ base: 10, md: 20 }}
      />
      <Text color='gray.500' fontSize={{ base: 'sm', md: 'md' }}>
        {text}
      </Text>
    </Flex>
  )
}

EmptyState.propTypes = {
  text: PropTypes.string.isRequired
}

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

  const sortedPendingOrders = PendingOrder?.slice()
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .filter(
      (pendingOrder, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(pendingOrder)
        ) === index
    )
  const sortedProcessingOrders = processingOrder
    ?.slice()
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .filter(
      (processedOrder, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(processedOrder)
        ) === index
    )

  const sortedFarms = farms
    ?.slice()
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .filter(
      (filteredFarm, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(filteredFarm)
        ) === index
    )

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
            <>
              {sortedFarms?.length > 0 ? (
                <FarmsCard
                  data={sortedFarms}
                  currentSlide={currentFarmsSlide}
                />
              ) : (
                <EmptyState text='You have no farm yet' />
              )}
            </>
          )}
          {sliderType === 'processing_order' && (
            <>
              {sortedProcessingOrders.length > 0 ? (
                <OrdersCard
                  data={sortedProcessingOrders}
                  onOpen={onOpen}
                  currentSlide={currentProcessingOrdersSlide}
                />
              ) : (
                <EmptyState text='You have no processing order' />
              )}
            </>
          )}
          {sliderType === 'pending_order' && (
            <>
              {sortedPendingOrders.length > 0 ? (
                <OrdersCard
                  data={sortedPendingOrders}
                  onOpen={onOpen}
                  currentSlide={currentPendingOrdersSlide}
                />
              ) : (
                <EmptyState text='You have no pending order' />
              )}
            </>
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
