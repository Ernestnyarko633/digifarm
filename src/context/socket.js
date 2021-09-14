/* eslint-disable no-console */
import React, { createContext, useContext } from 'react'
import addNotification from 'react-push-notification'
import useWebSocket from 'hooks/useWebSocket'
import getConfigs from 'utils/configs'
import PropTypes from 'prop-types'
import useApi from 'context/api'

const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const { createFarmFromNotification: createFarm } = useApi()
  const { SOCKET_NOTIFICATION_API } = getConfigs()
  const type = 'DIGITAL_FARMER'
  useWebSocket(SOCKET_NOTIFICATION_API, null, type, async notification => {
    try {
      addNotification({
        title: 'New Notification',
        subtitle:
          notification?.message?.type === 'weekly_videos'
            ? notification?.message?.type.split('_').join(' ')
            : notification?.message?.type,
        message: notification?.message?.title
          ? notification?.message?.title
          : notification?.message?.text,
        theme: 'darkblue',
        native: true // os handle theming
      })
      if (notification?.message?.entity === 'ESCROW_PAYMENT') {
        await createFarm(notification?.message?.order_id)
      }
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
