import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from '../utils/configs'
import httpFacade from '../utils/httpFacade'

const ProductContext = createContext()

const http = new httpFacade()

export const ProductContextProvider = ({ children }) => {
  const FMS_API = getConfig().FMS_API

  const getProducts = async query =>
    await http.get({ url: `${FMS_API}/farms`, query })

  return (
    <ProductContext.Provider value={{ getProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useProduct = () => useContext(ProductContext)

export default useProduct
