import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'

import { replaceURI } from 'helpers/misc'

import FetchCard from 'components/FetchCard'
import useAuth from 'context/auth'
import useApi from 'context/api'

const Auth = ({
  history: { replace },
  match: { params },
  location: { search }
}) => {
  document.title = 'Authenticating...'
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)

  const { store, isAuthenticated } = useAuth()
  const { getUser } = useApi()

  const { to } = QueryString.parse(search, { parseBooleans: true }) || {}
  const { token } = params || {}

  const triggerReload = () => setReload(prevState => prevState + 1)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      // Check if user is authenticated and redirect to db
      if (isAuthenticated()) {
        replace(JSON.parse(to || null) || '/dashboard')
      } else {
        // Check to see if a token exist then use token to fetch user data else return user to auth service app
        if (token) {
          // store token in session storage for immediate use
          store({ token })
          // Delay for half a seconds to make sure that token is stored
          setTimeout(async () => {
            try {
              setIsLoading(true)
              // fetch user data
              const { data: user } = await getUser()
              // store user data
              store({ user })
            } catch (error) {
              if (error) {
                if ([401, 403].includes(error.status)) {
                  replaceURI('AUTH', '/redirects?from=DIGITAL_FARMER&off=true')
                } else {
                  setError(error.message)
                }
              } else {
                setError('Unexpected network error')
              }
            } finally {
              setIsLoading(false)
            }
          }, 500)
        } else {
          replaceURI('AUTH', '/redirects?from=DIGITAL_FARMER&off=false')
        }
      }
    }
    return () => (mounted = false)
  }, [store, getUser, isAuthenticated, replace, token, to, reload])

  return (
    <FetchCard
      error={error}
      align='center'
      justify='center'
      direction='column'
      loading={isLoading}
      reload={triggerReload}
    />
  )
}

Auth.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Auth
