/* eslint-disable no-console */
import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import getConfigs from 'utils/configs'
import useWebSocket from 'hooks/useWebSocket'
import addNotification from 'react-push-notification'
import useApi from 'context/api'
const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const { createFarmFromNotification } = useApi()
  const { SOCKET_NOTIFICATION_API } = getConfigs()
  const type = 'DIGITAL_FARMER'
  useWebSocket(SOCKET_NOTIFICATION_API, null, type, async d => {
    try {
      if (d?.message?.entity === 'ESCROW_PAYMENT') {
        await createFarmFromNotification(d?.message?.order_id)
      }
      addNotification({
        title: d?.message?.entity,
        subtitle: 'New Notification',
        message: d?.message?.text,
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
      })
    } catch (error) {
      console.log(error)
    }
  })

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useSocket = () => useContext(SocketContext)

export default useSocket
