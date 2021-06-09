import React, { useState, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useToast } from '@chakra-ui/react'

import useApi from './api'
import useAuth from './auth'
import useExternal from './external'

import Constants from 'constant'

const dcc = Constants.countries.find(c => c.id === 'US')
const dpo = Constants.paymentOptions[0]

const StartFarmContext = createContext({})

export const StartFarmContextProvider = ({ children }) => {
  const [paymentOption, setPaymentOption] = useState(dpo)
  const [wantCycle, setWantCycle] = React.useState('No')
  const [selectedFarm, setSelectedFarm] = useState(
    JSON.parse(sessionStorage.getItem('selected_farm'))
  )
  const [path, setPath] = React.useState(null)
  const [barrier, setBarrier] = useState(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [isSellOn, setIsSellOn] = useState(true)
  const [otherStep, setOtherStep] = useImmer(0)
  const [currency, setCurrency] = useState(dcc)
  const [contract, setContract] = useState('')
  const [acreage, setAcreage] = useState(1)
  const [acres, setAcres] = useState(0)
  const [order, setOrder] = useState(null)
  const [reload, setReload] = useState(0)
  const [cycle, setCycle] = useState(1)
  const [text, setText] = useState(null)
  const [step, setStep] = useImmer(0)
  const [selectedType, setSelectedType] = React.useState('')
  const [cooperativeName, setCooperativeName] = React.useState(null)
  const [coopType, setCoopType] = React.useState(null)
  const [adminAcres, setAdminAcres] = React.useState(1)
  const [invites, setInvites] = React.useState([])
  const [cooperative, setCooperative] = React.useState(null)
  const [coopImg, setCoopImg] = React.useState(false)
  let cooperativeTypes = JSON.parse(sessionStorage.getItem('cooperative-types'))
  const [selectedCooperativeType, setSelectedCooperativeType] =
    React.useState(null)
  const {
    createOrder,
    initiatePayment,
    initiatePaystackPayment,
    patchOrder,
    createCooperative
  } = useApi()

  useEffect(() => {
    let mounted = true
    // set types manually
    const types = ['tribe', 'village', 'city', 'nation']

    // function barrier get the next cooperative minAcre
    const Barrier = type => {
      const num = types.findIndex(value => value === type?.name)
      const newNum = num + 1
      if (newNum <= 3) setBarrier(cooperativeTypes[newNum]?.minAcre)
      if (newNum > 3) setBarrier(Infinity)
    }

    //set Limit or barrier
    if (mounted && selectedCooperativeType) Barrier(selectedCooperativeType)
    return () => (mounted = false)
  }, [cooperativeTypes, selectedCooperativeType])

  const { getExchangeRate } = useExternal()
  const { setSession, isAuthenticated } = useAuth()
  const { user } = isAuthenticated()

  const toast = useToast()

  const triggerMapReload = () => setReload(prevState => prevState + 1)

  function handleNext() {
    setStep(draft => draft + 1)
  }

  function handleBack() {
    setStep(draft => draft - 1)
  }

  function handleNextStep() {
    setOtherStep(draft => draft + 1)
  }

  function skipNextStep() {
    setOtherStep(draft => draft + 2)
  }

  function handlePrev() {
    setOtherStep(draft => draft - 1)
  }

  const handleCreateOrder = async (cooperative, cooperativeUserAcreage) => {
    try {
      setText("Preparing payment option, please don't reload/refresh page")
      setSubmitting(true)
      const calculateCost = (acreage, pricePerAcre, discount) => {
        let cost = 0
        let price = 0
        price = pricePerAcre - pricePerAcre * discount
        cost = price * acreage
        return cost
      }

      let data = {
        cycle,
        acreage: cooperativeUserAcreage || acreage,
        product: selectedFarm._id,
        cost: selectedFarm.pricePerAcre * (cooperativeUserAcreage || acreage),
        projectedYield:
          selectedFarm.projectedYieldPerAcre *
          (cooperativeUserAcreage || acreage),
        projectedMarketReturnsRange: {
          min:
            ((cooperativeUserAcreage || acreage) *
              selectedFarm.pricePerAcre *
              selectedFarm.projectedMarketReturnsRangePerAcre.min) /
            100,
          max:
            ((cooperativeUserAcreage || acreage) *
              selectedFarm.pricePerAcre *
              selectedFarm.projectedMarketReturnsRangePerAcre.max) /
            100
        }
      }
      if (cooperative?._id) {
        data.cooperative = cooperative._id

        data.cost = calculateCost(
          cooperativeUserAcreage || acreage,
          selectedFarm?.pricePerAcre,
          selectedCooperativeType?.discount
        )
      }

      // if discount exist then apply discount to cost
      if (selectedFarm.discounts) {
        // get discounts user may qualify for
        const discounts = selectedFarm.discounts.filter(
          ({ point }) => point <= (cooperativeUserAcreage || acreage)
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

  const handleCreateCooperative = async cooperativeTypeId => {
    try {
      setText("Preparing payment option, please don't reload/refresh page")
      setSubmitting(true)
      let formData = new FormData()
      formData.append('name', cooperativeName)
      formData.append('type', cooperativeTypeId)
      formData.append('product', selectedFarm?._id)
      formData.append('admin', user?._id)
      formData.append('users', JSON.stringify(invites))
      formData.append('cooperativeImg', coopImg)
      const res = await createCooperative(formData)
      setCooperative(res.data)
      handleCreateOrder(res.data, invites[0]?.acreage)
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

  const handlePayment = async (id, name, cost) => {
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
        // data.amount =
        //   Math.round(data.amount * res.data[q] * 100 + Number.EPSILON) / 100
        // if (data.amount) {
        //   const res = await initiatePayment(data)
        //   window.onbeforeunload = null
        //   window.location.href = res.message.url
        // } else {
        //   throw new Error('Unknown error occurred, try again')
        // }

        if (!res.data) {
          throw new Error('Unknown error occurred, try again')
        }

        const cediAmt = data.amount * res.data[q]

        const payload = {
          order: data.order_id,
          name: name || selectedFarm.name,
          amountToCharge: parseFloat(cediAmt / 0.9805).toFixed(2) * 1 //paystack charges included
        }

        const result = await initiatePaystackPayment(payload)
        window.onbeforeunload = null
        if (!result?.data?.authorization_url) {
          throw new Error('Unexpected payment gateway failure')
        }
        window.location.href = result.data.authorization_url
      } else {
        const res = await initiatePayment(data)
        await patchOrder(res?.data?.order_id?.$oid, {
          payment: res?.data?._id?.$oid
        })
        toast({
          duration: 9000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Order created.',
          description: 'Order saved successfully'
        })
        handleNextStep()
      }
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

  return (
    <StartFarmContext.Provider
      value={{
        step,
        text,
        path,
        cycle,
        acres,
        order,
        invites,
        barrier,
        setStep,
        setPath,
        coopImg,
        acreage,
        setAcres,
        coopType,
        setOrder,
        isSellOn,
        contract,
        setCycle,
        currency,
        wantCycle,
        otherStep,
        adminAcres,
        setCoopImg,
        setAcreage,
        setInvites,
        handleNext,
        handlePrev,
        handleBack,
        setCoopType,
        setCurrency,
        selectedType,
        setIsSellOn,
        setContract,
        cooperative,
        setWantCycle,
        exchangeRate,
        selectedFarm,
        setOtherStep,
        isSubmitting,
        skipNextStep,
        setAdminAcres,
        paymentOption,
        handlePayment,
        setSubmitting,
        setCooperative,
        handleNextStep,
        setSelectedType,
        cooperativeName,
        setSelectedFarm,
        setExchangeRate,
        triggerMapReload,
        cooperativeTypes,
        setPaymentOption,
        handleCreateOrder,
        setCooperativeName,
        handleCreateCooperative,
        selectedCooperativeType,
        setSelectedCooperativeType
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
