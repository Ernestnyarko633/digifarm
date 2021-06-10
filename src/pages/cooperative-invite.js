import React, { useEffect, useState } from 'react'

import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation, Link as ReachRouter } from 'react-router-dom'
import { Box, Flex, Link, Text, Image, Heading } from '@chakra-ui/react'
import { Button } from 'components'
import Header from 'container/Header'
import useAuth from 'context/auth'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite...'
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)

  const useQuery = useLocation()
  let query = useQuery
  const token = query.pathname.replace('/cooperative-invite/', '')

  let decoded = atob(token)
  decoded = JSON.parse(decoded)
  const { email, _id } = decoded
  const { acceptInvite } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  useEffect(() => {
    let mounted = true
    if (mounted && email && _id) {
      const runAcceptInvite = async () => {
        try {
          setIsLoading(true)
          await acceptInvite({ email, _id })
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
      runAcceptInvite()
    }
    return () => (mounted = false)
  }, [email, _id, acceptInvite, reload])

  return (
    <>
      <Header />
      <Box py={{ base: 32, md: 60, lg: 52 }} bg='white' h='100vh'>
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
          <>
            <Flex justify='center' my={4}>
              <Image
                w={{ base: 52, lg: 80 }}
                src='https://completefarmer.s3.us-east-2.amazonaws.com/Email+Template/conffeti.png'
              />
            </Flex>
            <Heading textAlign='center' fontSize={{ base: 24, lg: 28 }} my={3}>
              Congratulations {user?.firstName}
            </Heading>
            <Text
              w={{ base: 72, md: '70%', lg: '60%' }}
              textAlign='center'
              m='auto'
            >
              You’ve been invited to become a member of a cooperative. Farm
              together with friends and family. Share the costs as well as the
              assets and rewards. Begin your cooperative journey now.
            </Text>
            <Flex justify='center' my={10}>
              <Link
                as={ReachRouter}
                to={{
                  pathname: `/cooperative/${_id}`,
                  state: { _id: _id }
                }}
                _hover={{ textDecor: 'none' }}
              >
                <Button
                  btntitle='Join Cooperative'
                  colorScheme='linear'
                  width='200px'
                  py='10px'
                />
              </Link>
            </Flex>
          </>
        )}
      </Box>
    </>
  )
}

export default CooperativeInvite
