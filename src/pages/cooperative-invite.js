/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Link } from '@chakra-ui/react'

import { replaceURI } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useLocation } from 'react-router-dom'
import { Link as ReachRouter } from 'react-router-dom'
import { Button } from 'components'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const CooperativeInvite = () => {
  document.title = 'Cooperative invite...'
  const { width, height } = useWindowSize()

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
    <Box py={{ md: '10%', lg: '18%' }}>
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
          <Flex justify='center'>
            <Confetti width={width} height={height} />
          </Flex>
          <Heading w='45%' textAlign='center' m='auto'>
            Congratulations on accepting your invitation. Click on the button to
            view your cooperative
          </Heading>
          <Flex justify='center' my={16}>
            <Link
              as={ReachRouter}
              to={{
                pathname: `/cooperative/${_id}`,
                state: { _id: _id }
              }}
              _hover={{ textDecor: 'none' }}
            >
              <Button
                btntitle='View Cooperative'
                colorScheme='linear'
                width='200px'
                py='10px'
              />
            </Link>
          </Flex>
        </>
      )}
    </Box>
  )
}

CooperativeInvite.propTypes = {
  match: PropTypes.object.isRequired
}

export default CooperativeInvite
