import React, { useEffect, useState } from 'react'
// import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation, useHistory } from 'react-router-dom'
import useAuth from 'context/auth'
import jwt_decode from 'jwt-decode'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite...'
  const [isLoading, setIsLoading] = useState(false)
  const [stop, setStop] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)

  const { store } = useAuth()

  const { pathname } = useLocation()
  const history = useHistory()
  const { acceptInvite } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  useEffect(() => {
    let mounted = true
    const token = pathname.replace('/cooperative/invite/', '')
    //decoding token
    var decodedToken = jwt_decode(token)
    // eslint-disable-next-line no-console
    console.log('token', token)

    const data = JSON.parse(decodedToken._id)
    sessionStorage.setItem('acceptToken', JSON.stringify(token))

    const { _id } = data
    if (data) {
      const runAcceptInvite = async () => {
        try {
          setIsLoading(true)
          const res = await acceptInvite(_id, { token: token })
          setStop(true)
          if (res?.data) {
            const { authToken, user } = res?.data
            store({ token: authToken, user })
            setTimeout(() => {
              return history.push({
                pathname: `/cooperative/${_id}`,
                state: { data: res.data }
              })
            }, 500)
          } else {
            history.push({
              pathname: '/cooperative/intro'
            })
          }
        } catch (error_) {
          setError('Unexpected network error', error_)
        } finally {
          setIsLoading(false)
        }
      }
      if (mounted && _id) {
        if (!stop) {
          runAcceptInvite()
        }
      } else {
        history.push('/404')
      }
    }
    return () => (mounted = false)
  }, [acceptInvite, reload, pathname, history, store, stop])

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
