import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'
import HttpFacade from 'utils/httpFacade'

const ApiContext = createContext()

const http = new HttpFacade()

export const ApiContextProvider = ({ children }) => {
  const { AUTH_API, FMS_API, PAYMENT_API } = getConfig()

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

  const logout = async () => await http.post({ url: `${AUTH_API}/logout` })

  const getCropCategories = async () => {
    return await http.get({ url: `${FMS_API}/crop-categories` })
  }

  const getFarms = async query => {
    return await http.get({ url: `${FMS_API}/farms`, query })
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

  return (
    <ApiContext.Provider
      value={{
        logout,
        getUser,
        getFarms,
        patchUser,
        changePassword,
        initiatePayment,
        getCropCategories,
        deleteBankTransfer,
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
