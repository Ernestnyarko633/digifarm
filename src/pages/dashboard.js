import React from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'

import Layout from 'container/Layout'

import useApi from 'context/api'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'

import FetchCard from 'components/FetchCard'
import GetStartedNowCard from 'components/Cards/GetStartedNowCard'
import FarmOrderSection from 'components/Dashboard/FarmOrderSection'
import HomeEmptyState from 'components/EmptyStates/HomeEmptyState'
import Greetings from 'components/Utils/Greetings'
import { getCurrentDayParting } from 'helpers/misc'
import useComponent from 'context/component'
import CompleteOrderModal from 'components/Modals/CompleteOrderModal'
import Fade from 'react-reveal/Fade'

const Dashboard = () => {
  document.title = 'Complete Farmer | Dashboard'

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [reloadMyFarms, setReloadMyFarms] = React.useState(0)
  const [reloadMyOrders, setReloadMyOrders] = React.useState(0)

  const { getMyFarms, getMyOrders } = useApi()
  const { isAuthenticated } = useAuth()
  const { setCurrentSlide } = useComponent()

  const { message } = getCurrentDayParting()

  const { user } = isAuthenticated()

  const triggerReloadMyFarms = () =>
    setReloadMyFarms(prevState => prevState + 1)

  const triggerReloadMyOrders = () =>
    setReloadMyOrders(prevState => prevState + 1)

  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError
  } = useFetch('my_farms', getMyFarms, reloadMyFarms)

  const {
    data: myPandingOrder,
    isLoading: myPandingOrdersIsLoading,
    error: myPandingOrdersHasError
  } = useFetch('my_pending_orders', getMyOrders, reloadMyOrders, {
    status: 'PENDING'
  })

  const {
    data: myProcessingOrder,
    isLoading: myProcessingOrdersIsLoading,
    error: myProcessingOrdersHasError
  } = useFetch('my_processing_orders', getMyOrders, reloadMyOrders, {
    status: 'PROCESSING'
  })

  const isLoading =
    myFarmsIsLoading || myPandingOrdersIsLoading || myPandingOrdersHasError
  const hasError =
    myFarmsHasError || myProcessingOrdersHasError || myProcessingOrdersIsLoading

  const hasData =
    myFarms?.length || myPandingOrder?.length || myProcessingOrder?.length

  const handleClick = direction => {
    setCurrentSlide(prevState => {
      return (
        (myPandingOrder.length + prevState + direction) % myPandingOrder.length
      )
    })
  }

  return (
    <Layout>
      <CompleteOrderModal isOpen={isOpen} onClose={onClose} />
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
                !myFarms?.length && triggerReloadMyFarms()
                !myPandingOrder?.length && triggerReloadMyOrders()
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
            pandingOrder={myPandingOrder}
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
