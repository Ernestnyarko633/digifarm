import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from '../utils/configs'
import httpFacade from '../utils/httpFacade'

const PaymentContext = createContext()

const http = new httpFacade()

export const PaymentContextProvider = ({ children }) => {
  const PAYMENT_API = getConfig().PAYMENT_API

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
    <PaymentContext.Provider
      value={{
        initiatePayment,
        uploadPaymentDetails,
        deleteBankTransfer
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}

PaymentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const usePayment = () => useContext(PaymentContext)

export default usePayment
