import React from 'react'
import { Box } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
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
    myOrders,
    myOrdersHasError,
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
          (myOrders?.pending.length + prevState + direction) %
          myOrders?.pending.length
        )
      })
    }
    if (sliderType === 'processing_order') {
      setCurrentProcessingOrdersSlide(prevState => {
        return (
          (myOrders?.processing.length + prevState + direction) %
          myOrders?.processing.length
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
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            mx='auto'
            reload={() => {
              myFarmsHasError && triggerReloadMyFarms()
              myOrdersHasError && triggerReloadMyOrders()
            }}
            loading={isLoading}
            error={hasError}
            text='Standby as we load your current farms and pending orders'
          />
        </Box>
      ) : hasData ? (
        <FarmOrderSection
          farms={myFarms}
          PendingOrder={myOrders?.pending || []}
          processingOrder={myOrders?.processing || []}
          handleClick={handleClick}
          onOpen={onOpen}
        />
      ) : (
        <HomeEmptyState />
      )}
      <GetStartedNowCard />
    </Layout>
  )
}

export default Dashboard
