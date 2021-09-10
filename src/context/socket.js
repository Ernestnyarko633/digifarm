/* eslint-disable no-console */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
//import useWebSocket from 'hooks/useWebSocket'
const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  //const type = 'DIGITAL_FARMER'
  // useWebSocket(
  //   'https://apis-notifications-test.completefarmer.com',
  //   null,
  //   type,
  //   d => console.log('hello', d)
  // )

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useSocket = () => useContext(SocketContext)

export default useSocket
