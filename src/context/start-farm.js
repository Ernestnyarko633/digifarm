/* eslint-disable no-console */
import React, { useState, useContext, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'
import { useToast } from '@chakra-ui/react'
import { getCode } from 'country-list'
import getConfig from 'utils/configs'

import useApi from './api'
import useAuth from './auth'
import useExternal from './external'

import Constants from 'constant'
import useRollover from './rollover'
import useComponent from './component'

const dcc = Constants.countries.find(c => c.id === 'US')
const dpo = Constants.paymentOptions[2]

const StartFarmContext = createContext({})

export const StartFarmContextProvider = ({ children }) => {
  const { handleModalClick, onClose } = useComponent()
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
    createCooperative,
    patchWallet,
    verifyWallet
  } = useApi()

  const { ESCROW_SELLER_ID } = getConfig()

  const { selectedWallets, onCloseSecond } = useRollover()

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

  const handleRolloverPayment = async _order => {
    try {
      setSubmitting(true)
      let tempCost = order?.cost || _order?.cost
      setText("Processing payment, please don't reload/refresh page")
      const data = {
        amount: _order?.cost || order?.cost,
        order_id: _order?._id || order?._id,
        purpose: 'FARM_PURCHASE',
        transaction_type: 'WALLET'
      }
      const res = await initiatePayment(data)

      if (res.data.status === 'VERIFIED') {
        const walletsPromises = selectedWallets.map(async wallet => {
          if (tempCost !== 0) {
            let temp = tempCost
            const response = await patchWallet(wallet?.id, {
              wallet:
                temp > wallet?.amount || temp === wallet?.amount
                  ? 0
                  : wallet?.amount > temp
                  ? wallet?.amount - temp
                  : 0
            })
            if (response.data) {
              tempCost =
                tempCost > wallet?.amount || tempCost === wallet?.amount
                  ? tempCost - wallet?.amount
                  : 0
              return response.data
            }
            return []
          }
        })
        await Promise.all(walletsPromises)

        const updatedOrder = await patchOrder(res?.data?.order_id?.$oid, {
          payment: res?.data?._id?.$oid,
          status: 'PAID'
        })

        setOrder(updatedOrder?.data)

        await verifyWallet({
          type: 'ROLLOVER',
          order_id: order?._id || _order?._id,
          cost: order?.cost || _order?.cost
        })

        toast({
          duration: 9000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Order created.',
          description: 'Farm created successfully'
        })

        sessionStorage.removeItem('my_farms')
        sessionStorage.removeItem('my_orders')

        handleNextStep()
        handleNextStep()
        onCloseSecond()
        onClose()
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

  const handleCreateOrder = async (
    cooperative,
    cooperativeUserAcreage,
    rollover
  ) => {
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

      if (rollover) {
        sessionStorage.removeItem('my_orders')
        handleModalClick('rollover', {
          wallet_id: sessionStorage.getItem('wallet'),
          inRollover: true,
          showButton: true,
          order: res.data
        })
      } else {
        sessionStorage.removeItem('my_farms')
        sessionStorage.removeItem('my_orders')
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
    const type = sessionStorage.getItem('type')
    try {
      setText("Processing payment, please don't reload/refresh page")
      setSubmitting(true)
      const data = {
        amount: cost || order.cost,
        order_id: id || order._id,
        purpose: 'FARM_PURCHASE',
        name: name || selectedFarm.name,
        transaction_type: paymentOption,
        institution: 'PAYSTACK',
        redirect: `/start-farm/${type}`,
        type: 'ORDER',
        app: 'DIGITAL_FARMER'
      }

      if (paymentOption === Constants.paymentOptions[0]) {
        const q = 'USD_GHS'
        const res = await getExchangeRate({ q })
        if (!res.data) {
          throw new Error('Unknown error occurred, try again')
        }

        const cediAmt = data.amount * res.data[q]

        const payload = data
        payload.amount = parseFloat(cediAmt / 0.9805).toFixed(2) * 1

        const result = await initiatePaystackPayment(payload)
        window.onbeforeunload = null
        if (!result?.data?.authorization_url) {
          throw new Error('Unexpected payment gateway failure')
        }
        window.location.href = result.data.authorization_url
      } else if (paymentOption === Constants.paymentOptions[2]) {
        //check if user has account
        if (!user?.escrow_account_id) {
          const payload = {
            email: user.email, // user email
            first_name: user.firstName, // user firstname
            last_name: user.lastName, // user lastName
            country: getCode(user.address.country).toUpperCase(), // get the country of the human being and get the ISO code for it transform it to Upper Case letters
            ind_bus_type: 'Individual' // Individual
          }

          const response = await createEscrowAccount(payload) // create escrow account for user or client

          // if successful
          if (response.data) {
            // patch the user with new information account id
            const res = await patchUser(user?._id, {
              escrow_account_id: response.data.account_id
            })

            // hopefully it should be successful unless someone did something behind the scence in that case we should have a successful update
            if (res.data) {
              store({ user: res.data })
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
          initiated_by: user.escrow_account_id, // escrow account of user who started this whole mess
          seller_id: ESCROW_SELLER_ID, // escrow account of the person selling
          buyer_id: user.escrow_account_id, // escrow account of the person buying
          order_id: id || order._id, // order id of the farm
          purpose: 'FARM_PURCHASE', // type
          txn_description: `Purchase of ${selectedFarm.name} farm`, // description of transaction
          invoice_amount: cost || order.cost, // cost of transaction
          invoice_currency: 'USD', // currency

          // must always be false
          is_milestone: false, // false

          // this two information might change
          fee_paid_by: 'buyer', // buyer
          fee_percentage: 100 // 100
        }

        // if everything is okay send the payload
        const create_escrow_response = await createEscrow(escrow_payload)

        // if successful
        if (create_escrow_response.data) {
          const payload = {
            txn_no: create_escrow_response.data.txn_no,
            complete_url: `${window.location.origin}/tazapay?order=${
              id || order._id
            }&txn_no=${create_escrow_response.data.txn_no}`,
            error_url: `${window.location.origin}/tazapay?order=${
              id || order._id
            }&txn_no=${create_escrow_response.data.txn_no}&error=true`
          }

          const response = await payEscrow(payload)
          window.onbeforeunload = null

          if (response.data.redirect_url) {
            await patchOrder(id || order._id, {
              redirect: response.data.redirect_url
            })
            window.onbeforeunload = null
            window.location.href = response.data.redirect_url
          } else {
            throw new Error('Unexpected payment gateway failure')
          }
        } else {
          // else throw this error if unsuccesful in creating escrow account
          throw new Error('Unable to process request')
        }
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
        setSelectedType,
        cooperativeName,
        setSelectedFarm,
        setExchangeRate,
        triggerMapReload,
        cooperativeTypes,
        setPaymentOption,
        coopConfigErrors,
        handleCreateOrder,
        setCooperativeName,
        setCoopConfigErrors,
        handleCreateCooperative,
        selectedCooperativeType,
        setSelectedCooperativeType,
        handleRolloverPayment
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
