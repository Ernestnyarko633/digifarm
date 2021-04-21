import React from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'

import Layout from 'container/Layout'

import useAuth from 'context/auth'

import FetchCard from 'components/FetchCard'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import FarmOrderSection from 'components/Dashboard/FarmOrderSection'
import HomeEmptyState from 'components/EmptyStates/HomeEmptyState'
import Greetings from 'components/Utils/Greetings'
import { getCurrentDayParting } from 'helpers/misc'
import useComponent from 'context/component'
import CompleteOrderModal from 'components/Modals/CompleteOrderModal'
import Fade from 'react-reveal/Fade'
import { useFarmData } from 'hooks/useFarmData'

const Dashboard = () => {
  document.title = 'Complete Farmer | Dashboard'

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isAuthenticated } = useAuth()
  const {
    sliderType,
    setCurrentFarmsSlide,
    setCurrentPendingOrdersSlide,
    setCurrentProcessingOrdersSlide
  } = useComponent()

  const {
    triggerReloadMyFarms,
    triggerReloadMyOrders,
    myFarms,
    myFarmsHasError,
    myPendingOrder,
    myPendingOrdersHasError,
    myProcessingOrder,
    myProcessingOrdersHasError,
    isLoading,
    hasError,
    hasData
  } = useFarmData()

  window.onbeforeunload = null

  const { message } = getCurrentDayParting()

  const { user } = isAuthenticated()

  const handleClick = direction => {
    if (sliderType === 'farms') {
      setCurrentFarmsSlide(prevState => {
        return (myFarms.length + prevState + direction) % myFarms.length
      })
    }
    if (sliderType === 'pending_order') {
      setCurrentPendingOrdersSlide(prevState => {
        return (
          (myPendingOrder.length + prevState + direction) %
          myPendingOrder.length
        )
      })
    }
    if (sliderType === 'processing_order') {
      setCurrentProcessingOrdersSlide(prevState => {
        return (
          (myProcessingOrder.length + prevState + direction) %
          myProcessingOrder.length
        )
      })
    }
  }

  return (
    <Layout>
      <CompleteOrderModal
        call={() => {
          triggerReloadMyFarms()
          triggerReloadMyOrders()
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Greetings
        title={`${message} Farmer ${user?.firstName}`}
        text='Get started by farming individually or with a group.'
      />
      {isLoading || hasError ? (
        <Box p={16}>
          <Fade>
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              mx='auto'
              reload={() => {
                myFarmsHasError && triggerReloadMyFarms()
                myPendingOrdersHasError && triggerReloadMyOrders()
                myProcessingOrdersHasError && triggerReloadMyOrders()
              }}
              loading={isLoading}
              error={hasError}
              text='Standby as we load your current farms and pending orders'
            />
          </Fade>
        </Box>
      ) : hasData ? (
        <Fade bottom>
          <FarmOrderSection
            farms={myFarms}
            PendingOrder={myPendingOrder}
            processingOrder={myProcessingOrder}
            handleClick={handleClick}
            onOpen={onOpen}
          />
        </Fade>
      ) : (
        <HomeEmptyState />
      )}
      <Fade bottom>
        <GetStartedNowCard />
      </Fade>
    </Layout>
  )
}

export default Dashboard
