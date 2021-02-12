import React from 'react'
import { Box } from '@chakra-ui/react'

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

const Dashboard = () => {
  document.title = 'Complete Farmer | Dashboard'

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
    data: myOrder,
    isLoading: myOrdersIsLoading,
    error: myOrdersHasError
  } = useFetch('my_orders', getMyOrders, reloadMyOrders)

  const isLoading = myFarmsIsLoading || myOrdersIsLoading
  const hasError = myFarmsHasError || myOrdersHasError

  const handleClick = direction => {
    setCurrentSlide(prevState => {
      return (myFarms.length + prevState + direction) % myFarms.length
    })
  }

  return (
    <Layout>
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
              !myFarms?.length && triggerReloadMyFarms()
              !myOrder?.length && triggerReloadMyOrders()
            }}
            loading={isLoading}
            error={hasError}
            text='Standby as we load your current farms and pending orders'
          />
        </Box>
      ) : myFarms?.length && myOrder?.length ? (
        <FarmOrderSection
          farms={myFarms}
          orders={myOrder}
          handleClick={handleClick}
        />
      ) : (
        <HomeEmptyState />
      )}
      <GetStartedNowCard />
    </Layout>
  )
}

export default Dashboard
