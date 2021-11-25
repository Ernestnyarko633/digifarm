/* eslint-disable no-console */
import React, { useState, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useToast } from '@chakra-ui/react'
import { getCode } from 'country-list'
import { useQueryClient } from 'react-query'
import getConfig from 'utils/configs'

import useApi from './api'
import useAuth from './auth'
import useExternal from './external'

import Constants from 'constant'

const dcc = Constants.countries.find(c => c.id === 'US')
const dpo = Constants.paymentOptions[2]

const StartFarmContext = createContext({})

export const StartFarmContextProvider = ({ children }) => {
  const queryClient = useQueryClient()
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
  const [convertedAmount, setConvertedAmount] = useState(undefined)
  const [acres, setAcres] = useState(0)
  const [order, setOrder] = useState(null)
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
  const [coopConfigErrors, setCoopConfigErrors] = React.useState(null)
  let cooperativeTypes = JSON.parse(sessionStorage.getItem('cooperative-types'))
  const [selectedCooperativeType, setSelectedCooperativeType] =
    React.useState(null)
  const {
    createOrder,
    initiatePayment,
    initiatePaystackPayment,
    createEscrowAccount,
    payEscrow,
    createEscrow,
    patchOrder,
    patchUser,
    createCooperative
  } = useApi()

  const PAYSTACK_LIMIT = 1e96
  //const PAYSTACK_LIMIT = 30000

  const { ESCROW_SELLER_ID } = getConfig()

  useEffect(() => {
    let mounted = true
    // set types manually
    const types = ['tribe', 'village', 'city', 'nation']

    // function barrier get the next cooperative minAcre
    const Barrier = type => {
      const num = types.findIndex(value => value === type?.name)
      const newNum = num + 1
      if (newNum <= 3)
        setBarrier(
          cooperativeTypes[newNum]?.minAcre < selectedFarm?.acreage
            ? cooperativeTypes[newNum]?.minAcre
            : selectedFarm?.acreage
        )
      if (newNum > 3) setBarrier(selectedFarm?.acreage || Infinity)
    }

    //set Limit or barrier
    if (mounted && selectedCooperativeType && otherStep <= 2)
      Barrier(selectedCooperativeType)
    return () => (mounted = false)
  }, [
    cooperativeTypes,
    selectedCooperativeType,
    otherStep,
    selectedFarm?.acreage
  ])

  const { getExchangeRate } = useExternal()
  const { setSession, isAuthenticated, store } = useAuth()
  const { user } = isAuthenticated()

  const toast = useToast()

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

  const toastError = error => {
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
  }

  const convertToGhanaCedis = async object => {
    try {
      setSubmitting(true)
      const q = 'USD_GHS'
      const excRes = await getExchangeRate({ q })

      if (!excRes.data) {
        throw new Error('Unknown error occurred, try again')
      }

      const cediAmt = object.cost * excRes.data[q]
      return parseFloat(cediAmt / 0.9805).toFixed(2) * 1
    } catch (error) {
      toastError(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateOrder = async (_cooperative, cooperativeUserAcreage) => {
    try {
      setText("Preparing payment option, please don't reload/refresh page")
      setSubmitting(true)
      const calculateCost = (_acres, pricePerAcre, discount) => {
        let cost = 0
        let price = 0
        price = pricePerAcre - pricePerAcre * discount
        cost = price * _acres
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
      if (_cooperative?._id) {
        data.cooperative = _cooperative._id

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

      const cediAmt = await convertToGhanaCedis(res.data)

      setConvertedAmount(cediAmt)

      if (cediAmt >= PAYSTACK_LIMIT)
        setPaymentOption(Constants.paymentOptions[1])

      queryClient.invalidateQueries('my_farms')
      queryClient.invalidateQueries('my_orders')
      handleNextStep()
    } catch (error) {
      toastError(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleTazapayPayment = async (_user, _store, _order, product) => {
    try {
      //check if user has account
      let id = null
      if (!_user?.escrowId) {
        const payload = {
          email: _user.email, // user email
          first_name: _user.firstName, // user firstname
          last_name: _user.lastName, // user lastName
          country: getCode(_user.address.country).toUpperCase(), // get the country of the human being and get the ISO code for it transform it to Upper Case letters
          ind_bus_type: 'Individual' // Individual
        }

        const response = await createEscrowAccount(payload) // create escrow account for user or client

        // if successful
        if (response.data) {
          // patch the user with new information account id
          const res = await patchUser(_user?._id, {
            escrowId: response.data.account_id
          })

          id = response.data.account_id

          // hopefully it should be successful unless someone did something behind the scence in that case we should have a successful update
          if (res.data) {
            _store({ user: res.data })
          } else {
            // else throw this unable to patch
            throw new Error('Unable to update user account details')
          }
        } else {
          // else throw this if unable to create account
          throw new Error('Unable to process/create escrow account')
        }
      }

      // initiate escrow payment

      const escrow_payload = {
        initiated_by: _user.escrowId || id, // escrow account of user who started this whole mess
        seller_id: ESCROW_SELLER_ID, // escrow account of the person selling
        buyer_id: _user.escrowId || id, // escrow account of the person buying
        order_id: _order._id, // _order id of the farm
        purpose: 'FARM_PURCHASE', // type
        txn_description: `Purchase of ${
          product.name
        } ${product?.cropVariety?.crop?.name?.toUpperCase()} farm`, // description of transaction
        invoice_amount: _order.cost, // cost of transaction
        invoice_currency: 'USD', // currency

        // must always be false
        is_milestone: false, // false

        // this two information might change
        fee_paid_by: 'buyer', // buyer
        fee_percentage: 50 // 100
      }

      // if everything is okay send the payload
      const create_escrow_response = await createEscrow(escrow_payload)

      // if successful
      if (create_escrow_response.data) {
        const payload = {
          txn_no: create_escrow_response.data.txn_no,
          complete_url: `${window.location.origin}/tazapay?order=${_order._id}&txn_no=${create_escrow_response.data.txn_no}`,
          error_url: `${window.location.origin}/tazapay?order=${_order._id}&txn_no=${create_escrow_response.data.txn_no}&error=true`
        }

        const response = await payEscrow(payload)
        window.onbeforeunload = null

        if (response.data.redirect_url) {
          const res = await patchOrder(_order._id, {
            redirect: response.data.redirect_url
          })
          if (res.data) {
            window.onbeforeunload = null
            window.location.href = response.data.redirect_url
          }
        } else {
          throw new Error('Unexpected payment gateway failure')
        }
      } else {
        // else throw this error if unsuccesful in creating escrow account
        throw new Error('Unable to process request')
      }
    } catch (error) {
      toastError(error)
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
      toastError(error)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = async (id, name, cost, actual_cost) => {
    const type = sessionStorage.getItem('type')
    try {
      setText("Processing payment, please don't reload/refresh page")
      setSubmitting(true)
      const data = {
        amount: convertedAmount || cost,
        actual_amount: actual_cost || order?.cost,
        order_id: id || order._id,
        purpose: 'FARM_PURCHASE',
        name: name || selectedFarm.name,
        transaction_type: paymentOption,
        institution: 'PAYSTACK',
        redirect: `/payment-paystack/${order._id}/${type}`,
        type: 'ORDER',
        app: 'DIGITAL_FARMER',
        callback_uri: ['/orders/' + order._id + '/approve-order']
      }

      if (paymentOption === Constants.paymentOptions[0]) {
        // Paystack

        const result = await initiatePaystackPayment(data)
        window.onbeforeunload = null
        if (!result?.data?.authorization_url) {
          throw new Error('Unexpected payment gateway failure')
        }
        window.location.href = result.data.authorization_url
      } else if (paymentOption === Constants.paymentOptions[1]) {
        // Tazapay

        await handleTazapayPayment(
          user,
          store,
          order || { _id: id },
          selectedFarm || JSON.parse(sessionStorage.getItem('selected_farm'))
        )
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
      toastError(error)
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
        acres,
        cycle,
        order,
        invites,
        barrier,
        setStep,
        setPath,
        coopImg,
        acreage,
        setAcres,
        setOrder,
        coopType,
        isSellOn,
        contract,
        setCycle,
        currency,
        wantCycle,
        otherStep,
        setBarrier,
        adminAcres,
        setCoopImg,
        setAcreage,
        setInvites,
        handleNext,
        handlePrev,
        toastError,
        handleBack,
        setCoopType,
        setCurrency,
        setIsSellOn,
        setContract,
        cooperative,
        selectedType,
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
        PAYSTACK_LIMIT,
        convertedAmount,
        setSelectedType,
        cooperativeName,
        setSelectedFarm,
        setExchangeRate,
        cooperativeTypes,
        setPaymentOption,
        coopConfigErrors,
        handleCreateOrder,
        setCooperativeName,
        setConvertedAmount,
        setCoopConfigErrors,
        convertToGhanaCedis,
        handleTazapayPayment,
        selectedCooperativeType,
        handleCreateCooperative,
        setSelectedCooperativeType
      }}
    >
      {children}
    </StartFarmContext.Provider>
  )
}

StartFarmContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useStartFarm = () => useContext(StartFarmContext)

export default useStartFarm
