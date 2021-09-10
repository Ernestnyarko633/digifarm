/* eslint-disable no-console */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import getConfigs from 'utils/configs'
import useWebSocket from 'hooks/useWebSocket'
const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const { SOCKET_NOTIFICATION_API } = getConfigs()
  const type = 'DIGITAL_FARMER'
  useWebSocket(SOCKET_NOTIFICATION_API, null, type, d =>
    console.log('hello', d)
  )

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useSocket = () => useContext(SocketContext)

export default useSocket
