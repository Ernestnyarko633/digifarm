import React from 'react'
import configs from 'utils/configs'
import http from 'utils/httpFacade'

const APIContext = React.createContext({})

export const APIProvider = ({ children }) => {
  const { PAYMENT_API } = configs()
  const PROFILE_API = configs().PROFILE_API

  const payment = async (payload) =>
    await http.post({
      url : `${PAYMENT_API}/payment/`,
      body: JSON.stringify(payload),
    })
  
  const updateProfile = async (params) => {
    try {
      return await http.get({ url: `${PROFILE_API}/profile` })
    } catch (error) {
      return error
    }
  }

  return (
    <APIContext.Provider value={{ payment, updateProfile }}>
      {children}
    </APIContext.Provider>
  )
}

export default function useAPI() {
  const context = React.useContext(APIContext)
  return context
}
