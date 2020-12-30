import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import QueryString from 'query-string'
import { Flex, Text, Button } from '@chakra-ui/react'

import { authContext } from 'context/authContext'
import { replaceURI } from 'helpers/misc'

const InvalidToken = ({ replace }) => (
  <Flex direction='column'
    align='center'
    justify='center'
    mx='auto'
    h='100vh'
    w={90}>
    <Flex textAlign='center' direction='column' justify='center'>
      <Text fontSize='lg'>Looks like the link is broken or has expired.</Text>
      <Text fontSize='lg'>You can contact support or login to continue.</Text>
    </Flex>
    <Flex justify='space-between' w='100%' padding={5}>
      <Button>Contact Support</Button>
      <Button onClick={() => replace('/login')}>Login</Button>
    </Flex>
  </Flex>
)

InvalidToken.propTypes = {
  replace: PropTypes.func.isRequired,
}

const Auth = ({
  history: { replace },
  match: { params },
  location: { search },
}) => {
  document.title = 'Authenticating...'
  const { getUser, auth, isAuthenticated } = useContext(authContext)
  const { to } = QueryString.parse(search, { parseBooleans: true })
  const { token } = params
  const [ invalidToken, setInvalidToken ] = useState(false)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (isAuthenticated()) {
        return replace('/dashboard')
      } else {
        if (token) {
          (async () => {
            try {
              const res = await getUser(token)
              if (res.user) {
                auth({ user: res.user, token })
                setTimeout(() => {
                  replace(JSON.parse(to || null) || '/dashboard')
                }, 500)
              } else {
                // TODO: what should happen when this fails
                if (res.status === 404) {
                  setInvalidToken(true)
                } else {
                  // console.log(res)
                }
              }
            } catch (err) {
              // TODO: what should happen when this fails
              // console.log(err)
            }
          })()
        } else {
          replaceURI('AUTH', '/redirects?from=BUYER&off=false')
        }
      }
    }
    return () => (mounted = false)
  }, [ auth, getUser, isAuthenticated, replace, token, to ])

  return invalidToken ? (
    <InvalidToken replace={replace} />
  ) : (
    <div className='loading-text'>Authenticating</div>
  )
}

Auth.propTypes = {
  history : PropTypes.object.isRequired,
  match   : PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Auth
