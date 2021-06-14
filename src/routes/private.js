import React from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router-dom'

import useAuth from 'context/auth'

import { replaceURI } from 'helpers/misc'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, session } = useAuth()
  const history = useHistory()

  React.useEffect(() => {
    if (!session) {
      // return history.push({
      //   pathname: '/logout',
      //   state: { mgs: 'Session expired' }
      // })
    }
  }, [session, history])

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
