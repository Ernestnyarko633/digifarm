import React, { useEffect, useState } from 'react'

import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation, useHistory } from 'react-router-dom'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite'
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)
  const { pathname } = useLocation()
  const history = useHistory()
  const { acceptInvite } = useApi()

  const triggerReload = () => setReload(prev => prev + 1)

  useEffect(() => {
    let mounted = true
    const token = pathname.replace('/cooperative-invite/', '')
    const decode = JSON.parse(atob(token))
    if (decode) {
      const { email, _id } = decode
      const runAcceptInvite = async () => {
        try {
          setIsLoading(true)
          const res = await acceptInvite({ email, _id })
          history.push({
            pathname: `/cooperative/${_id}`,
            state: { data: res.data }
          })
        } catch (error) {
          if (error) {
            if ([401, 403].includes(error.status)) {
              replaceURI('AUTH', '/redirects?from=DIGITAL_FARMER&off=true')
            } else {
              setError(error?.data?.message)
            }
          } else {
            setError('Unexpected network error')
          }
        } finally {
          setIsLoading(false)
        }
      }
      if (mounted && email && _id) {
        runAcceptInvite()
      }
    } else {
      history.push('/404')
    }

    return () => (mounted = false)
  }, [acceptInvite, reload, pathname, history])

  return (
    (isLoading || error) && (
      <FetchCard
        h='100vh'
        w='100vw'
        direction='column'
        align='center'
        justify='center'
        reload={triggerReload}
        loading={isLoading}
        error={error}
      />
    )
  )
}

export default CooperativeInvite
