import axios from 'axios'
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'

const ExternalContext = createContext()

export const ExternalContextProvider = ({ children }) => {
  const { EXCHANGE_RATE_API, EXCHANGE_RATE_API_KEY } = getConfig()

  const http = axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const getExchangeRate = async params => {
    params.apiKey = EXCHANGE_RATE_API_KEY
    params.compact = 'ultra'
    return await http({ method: 'GET', url: EXCHANGE_RATE_API, params })
  }

  return (
    <ExternalContext.Provider
      value={{
        getExchangeRate
      }}
    >
      {children}
    </ExternalContext.Provider>
  )
}

ExternalContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useExternal = () => useContext(ExternalContext)

export default useExternal
