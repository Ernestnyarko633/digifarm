import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(true)
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem('_cfu'))
  )

  const store = ({ token, user }) => {
    if (token) window.sessionStorage.setItem('_cft', token)
    if (user) {
      setUser(user)
      window.sessionStorage.setItem('_cfu', JSON.stringify(user))
    }
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

  return (
    <AuthContext.Provider
      value={{
        user,
        store,
        session,
        setSession,
        isAuthenticated
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
