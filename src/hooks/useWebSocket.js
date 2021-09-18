/* eslint-disable no-console */
import React from 'react'
import io from 'socket.io-client'

const useWebSocket = (url, options, on, cb) => {
  React.useEffect(() => {
    const socket = io(url, options)
    socket.on(on, cb)
    return () => socket.disconnect()
  }, [url, options, on, cb])
  return null
}

export default useWebSocket
