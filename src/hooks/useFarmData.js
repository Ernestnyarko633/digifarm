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
    data: myPendingOrder,
    isLoading: myPendingOrdersIsLoading,
    error: myPendingOrdersHasError
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
    myFarmsIsLoading || myProcessingOrdersIsLoading || myPendingOrdersIsLoading
  const hasError =
    myFarmsHasError || myProcessingOrdersHasError || myPendingOrdersHasError
  const hasData =
    myFarms?.length || myProcessingOrder?.length || myPendingOrder?.length

  return {
    reloadMyFarms,
    reloadMyOrders,
    triggerReloadMyFarms,
    triggerReloadMyOrders,
    myFarms,
    myFarmsIsLoading,
    myFarmsHasError,
    myPendingOrder,
    myPendingOrdersIsLoading,
    myPendingOrdersHasError,
    myProcessingOrder,
    myProcessingOrdersIsLoading,
    myProcessingOrdersHasError,
    isLoading,
    hasError,
    hasData
  }
}
