import React, { useState, useEffect, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import http from 'utils/httpFacade'
import { replaceURI } from 'helpers/misc'
import configs from 'utils/configs'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Setup Config
  const AUTH_API = configs().AUTH_API
  const [ session, setSession ] = useState(true)
  const [ user, setUser ] = useState(null)

  const store = ({ token, _user }) => {
    if (token) window.sessionStorage.setItem('_cft', token)
    if (_user) window.sessionStorage.setItem('_cfu', JSON.stringify(_user))
  }

  const isAuthenticated = () => {
    const _cft = window.sessionStorage.getItem('_cft')
    const _cfu = window.sessionStorage.getItem('_cfu')
    if (_cft && _cfu) {
      return { token: _cft, _user: JSON.parse(_cfu) }
    } else {
      return false
    }
  }

  const getUser = async () =>
    await http.get({ url: `${AUTH_API}/users/profile` })

  const getProfile = async () => {
    const { data } = await http.get({ url: `${AUTH_API}/users/profile` })
    setUser(data)
  }

  const changePassword = async (payload) => {
    try {
      await http.patch({
        url : `${AUTH_API}/change-password`,
        body: JSON.stringify(payload),
      })
    } catch (error) {
      // console.debug(error);
    }
  }

  React.useEffect(() => {
    getProfile()
  }, [])

  const patchUser = async (id, data) =>
    await http.patch({
      url : `${AUTH_API}/users/${id}`,
      body: JSON.stringify(data),
    })

  const logout = (clearRemote = false) => {
    try {
      clearRemote && http.get({ url: `${AUTH_API}/user/logout` })
      window.sessionStorage.clear()
      replaceURI('AUTH', '/redirects?from=BUYER&off=true')
    } catch (error) {
      // console.debug(error);
    }
  }

  useEffect(() => {
    if (!session) return logout(true)
  }, [session])

  return (
    <AuthContext.Provider value={{
        user,
        store,
        setUser,
        session,
        setSession,
        isAuthenticated,
        changePassword,
        patchUser,
        getUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function useAuth() {
  const context = useContext(AuthContext)
  return context
}
