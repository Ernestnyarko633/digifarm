import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from '../utils/configs'
import httpFacade from '../utils/httpFacade'

const CategoryContext = createContext()

const http = new httpFacade()

export const CategoryContextProvider = ({ children }) => {
  const FMS_API = getConfig().FMS_API

  const getCategories = async () =>
    await http.get({ url: `${FMS_API}/categories` })

  return (
    <CategoryContext.Provider value={{ getCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

CategoryContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useCategory = () => useContext(CategoryContext)

export default useCategory
