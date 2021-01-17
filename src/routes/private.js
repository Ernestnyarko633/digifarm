import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import useAuth from 'context/auth'

import { replaceURI } from 'helpers/misc'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, session } = useAuth()

  React.useEffect(() => {
    if (!session) {
      return <Redirect to='/logout' />
    }
  }, [session])

  const getPage = props => {
    if (isAuthenticated()) {
      return <Component {...props} />
    }
    return replaceURI('AUTH', "/redirects?from='DIGITAL_FARMER'")
  }

  return <Route {...rest} render={getPage} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any
}

export default PrivateRoute
