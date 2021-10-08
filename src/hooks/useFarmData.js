import useApi from 'context/api'
import { useQuery } from 'react-query'

export function useFarmData() {
  const { getMyFarms, getMyOrders } = useApi()

  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError,
    refetch: myFarmsRefetch
  } = useQuery('my_farms', () => getMyFarms())

  const triggerReloadMyFarms = () => myFarmsRefetch()
  const {
    data: myOrders,
    isLoading: myOrdersIsLoading,
    error: myOrdersHasError,
    refetch: myOrdersRefetch
  } = useQuery('my_orders', () => getMyOrders())
  const triggerReloadMyOrders = () => myOrdersRefetch()

  const isLoading = myFarmsIsLoading || myOrdersIsLoading
  const hasError = myFarmsHasError || myOrdersHasError
  const hasData =
    myFarms?.data?.length ||
    myOrders?.data?.pending?.length ||
    myOrders?.data?.processing?.length

  return {
    triggerReloadMyFarms,
    triggerReloadMyOrders,
    myFarms: myFarms?.data,
    myFarmsIsLoading,
    myFarmsHasError,
    myOrders: myOrders?.data,
    myOrdersIsLoading,
    myOrdersHasError,
    isLoading,
    hasError,
    hasData
  }
}
