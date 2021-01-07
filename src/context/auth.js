import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import httpFacade from 'utils/httpFacade'
import { replaceURI } from 'helpers/misc'
import configs from 'utils/configs'

const AuthContext = createContext()

const http = new httpFacade()

export const AuthContextProvider = ({ children }) => {
  // Setup Config
  const AUTH_API = configs().AUTH_API
  const [session, setSession] = useState(true)
  const [user, setUser] = useState(null)

  const store = ({ token, user }) => {
    if (token) window.sessionStorage.setItem('_cft', token)
    if (user) window.sessionStorage.setItem('_cfu', JSON.stringify(user))
  }

  const isAuthenticated = () => {
    const _cft = window.sessionStorage.getItem('_cft')
    const _cfu = window.sessionStorage.getItem('_cfu')
    if (_cft && _cfu) {
      return { token: _cft, user: JSON.parse(_cfu) }
    } else {
      return false
    }
  }

  const getUser = async () =>
    await http.get({ url: `${AUTH_API}/users/profile` })

  const patchUser = async (id, data) =>
    await http.patch({
      url: `${AUTH_API}/users/${id}`,
      body: JSON.stringify(data)
    })

  const logout = async (clearRemote = false) => {
    try {
      clearRemote && (await http.get({ url: `${AUTH_API}/user/logout` }))
      window.sessionStorage.clear()
      replaceURI('AUTH', '/redirects?from=BUYER&off=true')
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    if (!session) return logout(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        user,
        store,
        setUser,
        session,
        setSession,
        isAuthenticated,
        getUser,
        patchUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useAuth = () => useContext(AuthContext)

export default useAuth
