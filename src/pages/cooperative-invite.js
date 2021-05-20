import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'

import FetchCard from 'components/FetchCard'
import useAuth from 'context/auth'
import useApi from 'context/api'
import { Box } from '@chakra-ui/layout'

const CooperativeInvite = ({
    history: { replace },
    match: { params },
    location: { search }
}) => {
    document.title = 'Cooperative invite...'
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(0)
    const [error, setError] = useState(false)

  const { token } = params

  const triggerReload = () => setReload(prevState => prevState + 1)


  useEffect(() => {
    let mounted = true
    if (mounted) {
        // Check to see if a token exist then use token to fetch user data else return user to auth service app
        if (token) {
            try {
                setIsLoading(true)
                // fetch user data
                const { data: user } = await getUser()
  
                // store user data
                store({ user })
  
                setTimeout(() => {
                  replace(JSON.parse(to || null) || '/dashboard')
                }, 1000)
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
        } else {
          replaceURI('AUTH', '/redirects?from=DIGITAL_FARMER&off=false')
        }
    }
    return () => (mounted = false)
  }, [store, getUser, isAuthenticated, replace, token, to, reload])


    return isLoading || error ? (
        <FetchCard
        direction='column'
        align='center'
        justify='center'
        reload={triggerReload}
        loading={isLoading}
        error={error}
      />
    ): (
        <Box></Box>
    )
}

CooperativeInvite.propTypes = {

}

export default CooperativeInvite
