import React, { useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useToast } from '@chakra-ui/react'

import useApi from './api'
import useAuth from './auth'
import useExternal from './external'

import Constants from 'constant'
//import useFetch from '../hooks/useFetch'

const dcc = Constants.countries.find(c => c.id === 'US')
const dpo = Constants.paymentOptions[0]

const StartFarmContext = createContext({})

export const StartFarmContextProvider = ({ children }) => {
  const [paymentOption, setPaymentOption] = useState(dpo)
  const [wantCycle, setWantCycle] = React.useState('No')
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [reload, setReload] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [isSellOn, setIsSellOn] = useState(true)
  const [otherStep, setOtherStep] = useImmer(0)
  const [currency, setCurrency] = useState(dcc)
  const [contract, setContract] = useState('')
  const [acreage, setAcreage] = useState(1)
  const [order, setOrder] = useState(null)
  const [cycle, setCycle] = useState(1)
  const [text, setText] = useState(null)
  const [step, setStep] = useImmer(0)

  const { createOrder, initiatePayment } = useApi()
  const { getExchangeRate } = useExternal()
  const { setSession } = useAuth()

  const toast = useToast()

  const triggerMapReload = () => setReload(prevState => prevState++)

  function handleNext() {
    setStep(draft => draft + 1)
  }

  function handleBack() {
    setStep(draft => draft - 1)
  }

  function handleNextStep() {
    setOtherStep(draft => draft + 1)
  }

  function handlePrev() {
    setOtherStep(draft => draft - 1)
  }

  const handleCreateOrder = async () => {
    try {
      setText("Preparing payment option, please don't reload/refresh page")
      setSubmitting(true)
      const data = {
        cycle,
        acreage,
        product: selectedFarm._id,
        cost: selectedFarm.pricePerAcre * acreage,
        projectedYield: selectedFarm.projectedYieldPerAcre * acreage,
        projectedReturn: selectedFarm.projectedReturnsPerAcre * acreage
      }

      // if discount exist then apply discount to cost
      if (selectedFarm.discounts) {
        // get discounts user may qualify for
        const discounts = selectedFarm.discounts.filter(
          ({ point }) => point <= acreage
        )
        // get highest discount user qualified for
        if (discounts.length) {
          const discountQualifiedFor = discounts.reduce((a, b) =>
            a.point > b.point ? a : b
          ).percent
          data.cost *= 1 - discountQualifiedFor
        }
      }

      const res = await createOrder(data)
      setOrder(res.data)
      sessionStorage.removeItem('my_farms')
      sessionStorage.removeItem('my_orders')
      handleNextStep()
    } catch (error) {
      if (error) {
        if ([401, 403].includes(error.status)) {
          setSession(false)
        } else {
          toast({
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            title: 'An error occurred.',
            description:
              (error?.data?.message ||
                error?.message ||
                'Unknown error occurred') + '.'
          })
        }
      } else {
        toast({
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
          title: 'An error occurred.',
          description: 'Unexpected network error.'
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = async (id, cost) => {
    try {
      setText("Processing payment, please don't reload/refresh page")
      setSubmitting(true)
      const data = {
        amount: cost || order.cost,
        order_id: id || order._id,
        purpose: 'FARM_PURCHASE',
        transaction_type: paymentOption
      }

      if (paymentOption === Constants.paymentOptions[0]) {
        const q = 'USD_GHS'
        const res = await getExchangeRate({ q })
        data.amount =
          Math.round(data.amount * res.data[q] * 100 + Number.EPSILON) / 100
        if (data.amount) {
          const res = await initiatePayment(data)
          window.location.href = res.message.url
        } else {
          throw new Error('Unknown error occurred, try again')
        }
      } else {
        const res = await initiatePayment(data)
        toast({
          duration: 9000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Order created.',
          description: res.message || 'Order saved successfully'
        })
        handleNextStep()
      }
      sessionStorage.removeItem('my_farms')
      sessionStorage.removeItem('my_orders')
    } catch (error) {
      if (error) {
        if ([401, 403].includes(error.status)) {
          // setSession(false)
        } else {
          toast({
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            title: 'An error occurred.',
            description:
              (error?.data?.message ||
                error?.message ||
                'Unknown error occurred') + '.'
          })
        }
      } else {
        toast({
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
          title: 'An error occurred.',
          description: 'Unexpected network error.'
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <StartFarmContext.Provider
      value={{
        step,
        text,
        cycle,
        order,

        acreage,
        setOrder,

        isSellOn,
        contract,
        setCycle,
        currency,
        // EOSViewID,
        wantCycle,
        otherStep,
        setAcreage,
        handleNext,
        handlePrev,
        handleBack,
        setCurrency,
        setIsSellOn,
        setContract,
        setWantCycle,
        exchangeRate,
        selectedFarm,
        //  EOSViewIDIsLoading,
        //EOSViewIDHasError,
        triggerMapReload,
        isSubmitting,
        paymentOption,
        handlePayment,
        setSubmitting,
        handleNextStep,
        setSelectedFarm,
        setExchangeRate,
        setPaymentOption,
        handleCreateOrder
      }}
    >
      {false && reload}
      {children}
    </StartFarmContext.Provider>
  )
}

StartFarmContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useStartFarm = () => useContext(StartFarmContext)

export default useStartFarm
