import React, { useEffect, useState } from 'react'
// import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation, useHistory } from 'react-router-dom'
import useAuth from 'context/auth'
import jwt_decode from 'jwt-decode'
import { useToast } from '@chakra-ui/react'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite...'
  const [isLoading, setIsLoading] = useState(false)
  const [stop, setStop] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)

  const toast = useToast()

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

    //checking for token expiry
    let utcSeconds = decodedToken.exp
    let expiryDate = new Date(0)
    expiryDate.setUTCSeconds(utcSeconds)
    let currentDate = new Date()

    const data = JSON.parse(decodedToken.payload)
    const { _id, admin } = data

    //storing token in session
    sessionStorage.setItem('acceptToken', token)

    if (data) {
      const runAcceptInvite = async () => {
        try {
          setIsLoading(true)

          //if token hasn't expired, then accept invite
          if (currentDate < expiryDate) {
            const res = await acceptInvite(_id, { token: token })

            setStop(true)
            if (res?.data) {
              const { authToken, user } = res?.data

              //store user allow authentication
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
          } else {
            toast({
              title: 'Link expired. Contact cooperative admin to resend invite',
              description: `Contact ${admin}`,
              status: 'error',
              duration: 5000,
              position: 'top-right'
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
