/* eslint-disable no-console */
import React, { createContext, useContext } from 'react'
import addNotification from 'react-push-notification'
import useWebSocket from 'hooks/useWebSocket'
import getConfigs from 'utils/configs'
import PropTypes from 'prop-types'
import useApi from 'context/api'
import useAuth from 'context/auth'

const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const { createFarmFromNotification: createFarm } = useApi()
  const { isAuthenticated } = useAuth()
  const { SOCKET_NOTIFICATION_API } = getConfigs()

  useWebSocket(
    SOCKET_NOTIFICATION_API,
    null,
    'DIGITAL_FARMER',
    async notification => {
      try {
        addNotification({
          title: 'New Notification',
          duration: 15000,
          closeButton: 'Go away',
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
          if (notification?.message?.order_id) {
            await createFarm(notification?.message?.order_id)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  )

  useWebSocket(
    SOCKET_NOTIFICATION_API,
    null,
    isAuthenticated().user._id,
    async notification => {
      try {
        addNotification({
          duration: 15000,
          closeButton: 'Go away',
          title: 'New Notification',
          subtitle: notification?.message?.type,
          message: notification?.message?.title
            ? notification?.message?.title
            : notification?.message?.text,
          theme: 'darkblue',
          native: true
        })
      } catch (error) {
        console.log(error)
      }
    }
  )

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useSocket = () => useContext(SocketContext)

export default useSocket
