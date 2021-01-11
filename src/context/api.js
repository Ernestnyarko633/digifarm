import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from '../utils/configs'
import HttpFacade from '../utils/httpFacade'

const ApiContext = createContext()

const http = new HttpFacade()

export const ApiContextProvider = ({ children }) => {
  const { FMS_API, PAYMENT_API } = getConfig()

  const getCropCategories = async () =>
    await http.get({ url: `${FMS_API}/crop-categories` })

  const getFarms = async query =>
    await http.get({ url: `${FMS_API}/farms`, query })

  const initiatePayment = async payload =>
    await http.post({
      url: `${PAYMENT_API}/payment/`,
      body: JSON.stringify(payload)
    })

  const uploadPaymentDetails = async (id, formData) =>
    await http.patch({
      url: `${PAYMENT_API}/payment/receipt-upload?payment_id=${id}`,
      body: formData
    })

  const deleteBankTransfer = async id =>
    await http.patch({
      url: `${PAYMENT_API}/payment/receipt-delete?payment_id=${id}`
    })

  return (
    <ApiContext.Provider
      value={{
        getCropCategories,
        getFarms,
        initiatePayment,
        uploadPaymentDetails,
        deleteBankTransfer
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
