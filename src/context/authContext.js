import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

import http from 'utils/httpFacade'
import { replaceURI } from 'helpers/misc'
import configs from 'utils/configs'
// Setup Config
const AUTH_API = configs().AUTH_API

export const authContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [ session, setSession ] = useState(true)
  const [ user, setUser ] = useState(null)

  const getUser = async (token) =>
    await http.get({ url: `${AUTH_API}/user/profile/${token}` })

  const auth = (data) => {
    window.sessionStorage.setItem('_cft', JSON.stringify(data.token))
    window.sessionStorage.setItem('_cfu', JSON.stringify(data.user))
  }

  const isAuthenticated = () => {
    const _cft = window.sessionStorage.getItem('_cft')
    const _cfu = window.sessionStorage.getItem('_cfu')
    if (_cft && _cfu) {
      return { token: JSON.parse(_cft), user: JSON.parse(_cfu) }
    } else {
      return false
    }
  }

  const logout = (clearRemote = false) => {
    try {
      clearRemote && http.get({ url: `${AUTH_API}/user/logout` })
      window.sessionStorage.clear()
      replaceURI('AUTH', '/redirects?from=DIGITALFARMER&off=true')
    } catch (error) {
      // console.debug(error)
    }
  }

  const updatePassword = async (body) => {
    try {
      return await http.patch({
        url : `${AUTH_API}/password-setting`,
        body: JSON.stringify(body),
      })
    } catch (error) {
      return error
    }
  }

  return (
    <authContext.Provider value={{
        getUser,
        logout,
        isAuthenticated,
        auth,
        setUser,
        user,
        session,
        setSession,
        updatePassword,
      }}>
      {children}
    </authContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContextProvider
