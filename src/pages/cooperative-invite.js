/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation } from 'react-router-dom'

const CooperativeInvite = ({ history: { replace } }) => {
  document.title = 'Cooperative invite...'
  const [isLoading, setIsLoading] = useState(0)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)
  const useQuery = () => new URLSearchParams(useLocation().search)
  let query = useQuery()
  let token = query.get('token')

  let decoded = atob(token)
  decoded = JSON.parse(decoded)
  const { email, _id } = decoded
  const { acceptInvite } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  useEffect(() => {
    let mounted = true
    let _faks = false
    const runAcceptInvite = async () => {
      try {
        setIsLoading(true)
        const res = await acceptInvite({ email, _id })
        // setTimeout(() => {
        //   replace(JSON.parse(to || null) || '/dashboard')
        // }, 1000)
        console.log(res.data)
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
    }
    if (mounted && email && _id && _faks) {
      runAcceptInvite()
    }
    return () => (mounted = false)
  }, [acceptInvite, replace, reload, email, _id])

  return (
    <Box>
      {isLoading || error ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={isLoading}
          error={error}
        />
      ) : (
        <Box>{/* Add ui for */}</Box>
      )}
    </Box>
  )
}

CooperativeInvite.propTypes = {
  history: PropTypes.object.isRequired
}

export default CooperativeInvite
