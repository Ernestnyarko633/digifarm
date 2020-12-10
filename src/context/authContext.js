import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

import http from '../utils/httpFacade'
// import { replaceURI } from '../helpers/misc'
import configs from '../utils/configs'
// Setup Config
const AUTH_API = configs().AUTH_API

export const authContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const getUser = async token => {
    try {
      return await http.get({ url: `${AUTH_API}/user/profile/${token}` })
    } catch (error) {
      return error
    }
  }

  const auth = data => {
    window.sessionStorage.setItem('_cft', JSON.stringify(data.token))
    window.sessionStorage.setItem('_cfu', JSON.stringify(data.user))
  }

  const isAuthenticated = () => {
    // const _cft = window.sessionStorage.getItem('_cft')
    // const _cfu = window.sessionStorage.getItem('_cfu')
    const _cft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQwOTlkNjNlNDY1YzAwMTEzM2ZiZWIiLCJlbWFpbCI6ImdhZHpvcmdlbnVAZ21haWwuY29tIiwiaWF0IjoxNjA3NTA4MTQ2LCJleHAiOjE2MTAxMDAxNDZ9.cvI_etpzPV5mTqinISwlINGXMjOauEhg1EjgEQRAR2E'
    const _cfu = {
      _id: '1',
      firstName: 'Georgina',
      lastName: 'Adzorgenu',
      email: 'gadzorgenu@gmail.com'
    }

    if (_cft && _cfu) {
      return { token: _cft, user: _cfu }
      // return { token: JSON.parse(_cft), user: JSON.parse(_cfu) }
    } else {
      return false
    }
  }

  const logout = (clearRemote = false) => {
    try {
      clearRemote && http.get({ url: `${AUTH_API}/user/logout` })
      window.sessionStorage.clear()
      // replaceURI('AUTH', '/redirects?from=OPERATION&off=true')
    } catch (error) {
      console.debug(error)
    }
  }

  const updatePassword = async body => {
    try {
      return await http.patch({
        url: `${AUTH_API}/password-setting`,
        body: JSON.stringify(body)
      })
    } catch (error) {
      return error
    }
  }

  return (
    <authContext.Provider
      value={{
        getUser,
        logout,
        isAuthenticated,
        auth,
        setUser,
        user,
        updatePassword
      }}
    >
      {children}
    </authContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthContextProvider