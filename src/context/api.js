import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'
import http from 'utils/httpFacade'
import axios from 'axios'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {
  const {
    FMS_API,
    AUTH_API,
    PAYMENT_API,
    DIGITAL_FARMER_API,
    BUYER_API,
    NOTIFICATION_API
  } = getConfig()

  const getUser = async () => {
    return await http.get({ url: `${AUTH_API}/users/profile` })
  }

  const loginUser = async payload => {
    return await http.post({
      url: `${AUTH_API}/login`,
      body: JSON.stringify(payload)
    })
  }

  const patchUser = async (id, body) => {
    return await http.patch({ url: `${AUTH_API}/users/${id}`, body })
  }
  // const patchUserIdentity = async payload => {
  //   return await http.patch({
  //     url: `${AUTH_API}/users/profile-identity`,
  //     body: JSON.stringify(payload)
  //   })
  // }

  const changePassword = async payload => {
    return await http.patch({
      url: `${AUTH_API}/change-password`,
      body: JSON.stringify(payload)
    })
  }

  const logout = async () => {
    return await http.post({ url: `${AUTH_API}/logout` })
  }

  const signUp = async payload => {
    return await http.post({
      url: `${AUTH_API}/signup`,
      body: JSON.stringify(payload)
    })
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

  const patchOrder = async (id, body) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/orders/${id}`,
      body
    })
  }

  const patchWallet = async (id, payload) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/farms/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const getPaymentDetails = async id => {
    return await http.get({
      url: `${PAYMENT_API}/payment/orderPayments?order_id=${id}&option="ONE"`
    })
  }

  const initiatePayment = async payload => {
    return await http.post({
      url: `${PAYMENT_API}/payment/`,
      body: JSON.stringify(payload)
    })
  }

  const initiatePaystackPayment = async payload => {
    return await http.post({
      url: `${PAYMENT_API}/payment/`,
      body: payload
    })
  }

  const verifyPaystackPayment = async reference => {
    return await http.get({
      url: `${PAYMENT_API}/payment/verify/${reference}`,
      reference
    })
  }

  const createFarm = async (id, payment) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/orders/${id}/verify-payment`,
      body: JSON.stringify({ payment })
    })
  }

  const uploadPaymentDetails = async (id, formData) => {
    return await http.patch({
      url: `${PAYMENT_API}/payment/receipt-upload?payment_id=${id}`,
      body: formData
    })
  }

  const sellProduce = async (id, body) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/farms/${id}/sell`,
      body
    })
  }

  //Cooperative
  //#region

  const acceptInvite = async (_id, token) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/cooperatives/${_id}/accept`,
      body: token
    })
  }

  const getCooperatives = async () => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/cooperatives`
    })
  }

  const getCooperativeById = async id => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/cooperatives/${id}`
    })
  }

  const updateCooperative = async (id, email) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/cooperatives/${id}`,
      body: email
    })
  }

  const inviteMember = async (id, payload) => {
    return await http.post({
      url: `${DIGITAL_FARMER_API}/cooperatives/${id}/invite`,
      body: payload
    })
  }

  //#endregion
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

  const downloadFile = async (resource, params) => {
    return await axios.get(`${DIGITAL_FARMER_API}/${resource}/download`, {
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('_cft')
      },
      params
    })
  }

  const downloadTaskReceipt = async query => {
    return await http.get({ url: `${FMS_API}/receipt`, query })
  }

  const getUserBankingDetails = async query => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/banking-details`,
      query
    })
  }

  const submitPayout = async payload => {
    return await http.post({
      url: `${DIGITAL_FARMER_API}/payrolls`,
      body: JSON.stringify(payload)
    })
  }

  const verifyWallet = async payload => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/orders/verify-wallet`,
      body: JSON.stringify(payload)
    })
  }

  const patchPayout = async (id, payload) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/payrolls/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const getFarmProcessingPayouts = async query => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/payrolls-wallet`,
      query
    })
  }
  const eosTask = async payload => {
    return await http.post({
      url: `${FMS_API}/eos-task`,
      body: JSON.stringify(payload)
    })
  }

  const eosStats = async query => {
    return await http.get({ url: `${FMS_API}/eos-task`, query })
  }

  const eosSearch = async (payload, url = 'sentinel2') => {
    return await http.post({
      url: `${FMS_API}/eos-search?url=${url}`,
      body: JSON.stringify(payload)
    })
  }

  const eosWeather = async (payload, url = '/') => {
    return await http.post({
      url: `${FMS_API}/eos-weather?url=${url}`,
      body: JSON.stringify(payload)
    })
  }

  const createBankDetails = async payload => {
    return await http.post({
      url: `${DIGITAL_FARMER_API}/banking-details`,
      body: JSON.stringify(payload)
    })
  }

  const updateBankDetails = async (id, payload) => {
    return await http.patch({
      url: `${DIGITAL_FARMER_API}/banking-details/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const getBankDetails = async query => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/banking-details`,
      query
    })
  }

  const getCooperativeTypes = async query => {
    return await http.get({
      url: `${DIGITAL_FARMER_API}/cooperative-types`,
      query
    })
  }

  const getNotifications = async query => {
    return await http.get({
      url: `${NOTIFICATION_API}/notification`,
      query
    })
  }

  const createCooperative = async payload => {
    return await http.post({
      url: `${DIGITAL_FARMER_API}/cooperatives`,
      body: payload
    })
  }

  const updateNotification = async (id, userId, query) => {
    return await http.patch({
      url: `${NOTIFICATION_API}/notification/generic-update/${id}/${userId}`,
      query
    })
  }

  const updateUserNotification = async (id, status, query) => {
    return await http.patch({
      url: `${NOTIFICATION_API}/notification/${id}/${status}`,
      query
    })
  }

  return (
    <ApiContext.Provider
      value={{
        signUp,
        loginUser,
        logout,
        eosTask,
        getUser,
        eosStats,
        getFarms,
        eosSearch,
        patchOrder,
        patchUser,
        // patchUserIdentity,
        getMyFarm,
        createFarm,
        getReceipt,
        getMyOrder,
        getMyFarms,
        eosWeather,
        getMyOrders,
        getAllTasks,
        sellProduce,
        createOrder,
        downloadFile,
        patchWallet,
        verifyWallet,
        submitPayout,
        patchPayout,

        getActivities,
        getMyFarmFeeds,
        changePassword,
        initiatePayment,
        getPaymentDetails,
        getSourcingOrders,
        getCropCategories,
        createBankDetails,
        updateBankDetails,
        getBankDetails,
        createCooperative,
        deleteBankTransfer,
        downloadTaskReceipt,
        getMyScheduledTasks,
        getCooperativeTypes,
        uploadPaymentDetails,
        getUserBankingDetails,
        initiatePaystackPayment,
        verifyPaystackPayment,
        getFarmProcessingPayouts,

        //cooperative
        acceptInvite,
        getCooperatives,
        getCooperativeById,
        updateCooperative,
        inviteMember,

        //notification
        getNotifications,
        updateNotification,
        updateUserNotification
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
