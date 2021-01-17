import React from 'react'
import Splash from 'components/Loading/Splash'

import { replaceURI } from 'helpers/misc'

import useAuth from 'context/auth'
import useApi from 'context/api'

const Logout = () => {
  const { isAuthenticated } = useAuth()
  const { logout } = useApi()

  const { user } = isAuthenticated()

  const APP = 'AUTH'
  const PATH = '/redirects?from=BUYER&off=true'

  React.useEffect(() => {
    setTimeout(async () => {
      try {
        await logout()
        replaceURI(APP, PATH)
      } catch (_) {
        replaceURI(APP, PATH)
      }
    }, 200)
  }, [logout])

  return <Splash text={`Bye Farmer ${user.firstName}`} />
}

export default Logout
