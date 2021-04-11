import React from 'react'
import PropTypes from 'prop-types'

import Splash from 'components/Loading/Splash'

import { replaceURI } from 'helpers/misc'

import useAuth from 'context/auth'
import useApi from 'context/api'

const LogOut = ({ location: { state } }) => {
  const { isAuthenticated } = useAuth()
  const { logout } = useApi()

  const { user } = isAuthenticated()

  const APP = 'AUTH'
  const PATH = '/redirects?from=DIGITAL_FARMER&off=true'

  React.useEffect(() => {
    setTimeout(async () => {
      try {
        await logout()
        replaceURI(APP, PATH)
      } catch (_) {
        replaceURI(APP, PATH)
      }
      sessionStorage.clear()
    }, 200)
  }, [logout])

  return <Splash text={state?.mgs || `Bye Farmer ${user.firstName}`} />
}

LogOut.propTypes = {
  location: PropTypes.object
}

export default LogOut
