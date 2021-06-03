import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Link, Text, Image } from '@chakra-ui/react'

import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation } from 'react-router-dom'
import useAuth from 'context/auth'

import { Link as ReachRouter } from 'react-router-dom'
import { Button } from 'components'
import Header from 'container/Header'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite...'

  const { isAuthenticated } = useAuth()

  const { user } = isAuthenticated()

  const [isLoading, setIsLoading] = useState(false)
  const [reload, setReload] = useState(0)
  const [error, setError] = useState(false)
  const [stsCode, setStsCode] = useState(null)

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
          const res = await acceptInvite({ email, _id })
          setStsCode(res?.statusCode)
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
      runAcceptInvite()
    }
    return () => (mounted = false)
  }, [email, _id, acceptInvite, reload, setStsCode])

  return (
    <Box>
      <Header />
      {isLoading && error === false ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={isLoading}
          error={error}
        />
      ) : null}

      {error === "Cannot read property 'users' of null" ? (
        <Box>
          <Heading textAlign='center'> Cooperative doesn't exit</Heading>
          <Flex justify='center' my={10}>
            <Link
              href='/dashboard'
              _hover={{ textDecor: 'none' }}
              textAlign='center'
            >
              <Button btntitle='Go back' />
            </Link>
          </Flex>
        </Box>
      ) : null}

      {stsCode === 200 && (
        <Box pt={{ base: 28, md: 48 }} bg='white' h='100vh'>
          <Flex justify='center' p={3}>
            <Image src='https://completefarmer.s3.us-east-2.amazonaws.com/Email+Template/conffeti.png' />
          </Flex>
          <Heading textAlign='center' fontSize='24px' p={2}>
            Congratulations {user.firstName}
          </Heading>
          <Text
            textAlign='center'
            m='auto'
            w={{ base: '80%', md: '50%' }}
            py='24px'
          >
            Farm together with friends and family. Share costs as well as the
            assets and rewards. Begin your cooperative journey now.
          </Text>
          <Flex justify='center' my={5}>
            <Link
              as={ReachRouter}
              to={{
                pathname: `/cooperative/${_id}`,
                state: { _id: _id }
              }}
              _hover={{ textDecor: 'none' }}
            >
              <Button
                btntitle='Join cooperative'
                colorScheme='linear'
                width='310px'
                fontSize='16px'
                py='14px'
                height='48px'
              />
            </Link>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

CooperativeInvite.propTypes = {
  match: PropTypes.object.isRequired
}

export default CooperativeInvite
