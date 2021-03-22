import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'
import http from 'utils/httpFacade'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {
  const {
    FMS_API,
    AUTH_API,
    PAYMENT_API,
    DIGITAL_FARMER_API,
    BUYER_API
  } = getConfig()

  // eslint-disable-next-line no-console
  console.log(getConfig(), 'configs')
  const getUser = async () => {
    return await http.get({ url: `${AUTH_API}/users/profile` })
  }

  const patchUser = async (id, data) => {
    return await http.patch({
      url: `${AUTH_API}/users/${id}`,
      body: JSON.stringify(data)
    })
  }

  const changePassword = async payload => {
    return await http.patch({
      url: `${AUTH_API}/users`,
      body: JSON.stringify(payload)
    })
  }

  const logout = async () => {
    return await http.post({ url: `${AUTH_API}/logout` })
  }

  const getCropCategories = async () => {
    return await http.get({ url: `${FMS_API}/crop-categories` })
  }

  const getFarms = async query => {
    return await http.get({ url: `${FMS_API}/farms`, query })
  }

  const createOrder = async body => {
    return await http.post({ url: `${DIGITAL_FARMER_API}/orders`, body })
  }

  const initiatePayment = async payload => {
    return await http.post({
      url: `${PAYMENT_API}/payment/`,
      body: JSON.stringify(payload)
    })
  }

  const uploadPaymentDetails = async (id, formData) => {
    return await http.patch({
      url: `${PAYMENT_API}/payment/receipt-upload?payment_id=${id}`,
      body: formData
    })
  }

  const deleteBankTransfer = async id => {
    return await http.patch({
      url: `${PAYMENT_API}/payment/receipt-delete?payment_id=${id}`
    })
  }

  const getMyFarms = async query => {
    return await http.get({ url: `${DIGITAL_FARMER_API}/farms`, query })
  }

  const getMyFarm = async id => {
    return await http.get({ url: `${DIGITAL_FARMER_API}/farms/${id}` })
  }

  const getMyOrders = async query => {
    return await http.get({ url: `${DIGITAL_FARMER_API}/orders`, query })
  }

  const getMyOrder = async id => {
    return await http.get({ url: `${DIGITAL_FARMER_API}/orders/${id}` })
  }

  const getMyScheduledTasks = async query => {
    return await http.get({ url: `${FMS_API}/task-schedulers`, query })
  }

  const getMyFarmFeeds = async query => {
    return await http.get({ url: `${FMS_API}/farm-feeds`, query })
  }

  const getSourcingOrders = async query => {
    return await http.get({ url: `${BUYER_API}/sourcings`, query })
  }

  const getActivities = async query => {
    return await http.get({ url: `${FMS_API}/activities`, query })
  }

  const getAllTasks = async query => {
    return await http.get({ url: `${FMS_API}/tasks`, query })
  }

  const getReceipt = async query => {
    return await http.get({ url: `${DIGITAL_FARMER_API}/receipt`, query })
  }

  const downloadOrder = async query => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/orders/download`,
      query
    })
  }

  const downloadTaskReceipt = async query => {
    return await http.get({
      url: `${FMS_API}/receipt`,
      query
    })
  }
  return (
    <ApiContext.Provider
      value={{
        logout,
        getUser,
        getFarms,
        patchUser,
        getReceipt,
        getMyFarm,
        getAllTasks,
        createOrder,
        getMyOrder,
        getMyFarms,
        getActivities,
        getMyOrders,
        downloadOrder,
        initiatePayment,
        changePassword,
        getMyFarmFeeds,
        getSourcingOrders,
        getCropCategories,
        deleteBankTransfer,
        downloadTaskReceipt,
        getMyScheduledTasks,
        uploadPaymentDetails
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApi = () => useContext(ApiContext)

export default useApi
