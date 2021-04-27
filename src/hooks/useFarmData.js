import useApi from 'context/api'
import React from 'react'
import useFetch from './useFetch'

export function useFarmData() {
  const [reloadMyFarms, setReloadMyFarms] = React.useState(0)
  const [reloadMyOrders, setReloadMyOrders] = React.useState(0)

  const { getMyFarms, getMyOrders } = useApi()

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
    data: myOrders,
    isLoading: myOrdersIsLoading,
    error: myOrdersHasError
  } = useFetch('my_orders', getMyOrders, reloadMyOrders)

  const isLoading = myFarmsIsLoading || myOrdersIsLoading
  const hasError = myFarmsHasError || myOrdersHasError
  const hasData = myFarms?.length || myOrders?.length

  return {
    reloadMyFarms,
    reloadMyOrders,
    triggerReloadMyFarms,
    triggerReloadMyOrders,
    myFarms,
    myFarmsIsLoading,
    myFarmsHasError,
    myOrders,
    myOrdersIsLoading,
    myOrdersHasError,
    isLoading,
    hasError,
    hasData
  }
}
