/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading, Flex, Avatar, Spacer } from '@chakra-ui/react'
import useAuth from 'context/auth'

// import { replaceURI } from 'helpers/misc'
// import FetchCard from 'components/FetchCard'
// import useApi from 'context/api'
// import { useLocation } from 'react-router-dom'
import Header from 'container/Header'
import ManagerProfile from 'components/StartFarmProcess/OtherSteps/ManagerProfile'

const CooperativeInvite = ({ history: { replace } }) => {
  document.title = 'Cooperative invite...'
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  // const [reload] = useState(0)
  // const [setError] = useState(false)
  // const useQuery = () => new URLSearchParams(useLocation().search)
  // let query = useQuery()
  // let token = query.get('token')

  // let decoded = atob(token)
  // // decoded = JSON.parse(decoded)
  // const { email, _id } = decoded
  // const { acceptInvite } = useApi()

  // const triggerReload = () => setReload(prevState => prevState + 1)

  // useEffect(() => {
  //   let mounted = true
  //   const runAcceptInvite = async () => {
  //     try {
  //       setIsLoading(true)
  //       const res = await acceptInvite({ email, _id })
  //       // setTimeout(() => {
  //       //   replace(JSON.parse(to || null) || '/dashboard')
  //       // }, 1000)
  //       console.log(res.data)
  //     } catch (error) {
  //       if (error) {
  //         if ([401, 403].includes(error.status)) {
  //           replaceURI('AUTH', '/redirects?from=DIGITAL_FARMER&off=true')
  //         } else {
  //           setError(error.message)
  //         }
  //       } else {
  //         setError('Unexpected network error')
  //       }
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   if (mounted && email && _id) {
  //     runAcceptInvite()
  //   }
  //   return () => (mounted = false)
  // }, [acceptInvite, replace, reload, email, _id])

  return (
    <Box bg='white'>
      {/* {isLoading || error ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={isLoading}
          error={error}
        />
      ) : ( */}
      <Box>
        <Header />
        <Box py={{ md: 24 }}>
          <Heading fontSize='24px' textAlign='center'>
            Welcome {user.firstName}
          </Heading>
        </Box>
        <Box
          width={{ md: '670px', lg: '1034px' }}
          h={{ md: '59px', lg: '330px' }}
          mx='auto'
          borderWidth={1}
          borderColor='gray.400'
          bg='white'
          borderRadius='md'
        >
          <Flex bg='#F8F8F8' p='17px'>
            <Text fontWeight='bold' fontSize='20px'>
              Your Cooperative
            </Text>
            <Spacer />
            <Text color='#D0021B' fontWeight='bold'>
              Farm starts: 02/11/2020
            </Text>
          </Flex>
          <Flex p='32px'>
            <Box>
              <Flex>
                <Avatar name='Georgina' size='lg' />
                <Box px='13px'>
                  <Text fontWeight='bold' fontSize='24px'>
                    Ginger
                  </Text>
                  <Text fontSize='14px'>(Nigerian Ginger) #FM-NY39</Text>
                </Box>
              </Flex>
              <Box py='26px'>
                <Text fontSize='20px'>
                  Location:{' '}
                  <Text as='span' fontWeight='bold'>
                    {' '}
                    Afram Plains, Eastern Region
                  </Text>
                </Text>
                <Text fontSize='20px'>
                  Cooperative type:
                  <Text as='span' fontWeight='bold'>
                    Village
                  </Text>
                </Text>
                <Text fontSize='20px'>
                  Cooperative Admin:{' '}
                  <Text as='span' fontWeight='bold'>
                    Carl Johson
                  </Text>
                </Text>
              </Box>
            </Box>
            <Spacer />
            <Box pr='66px' py='32px'>
              <Avatar size='2xl' name='Cooperative Name' />
              <Text fontWeight='bold' textAlign='center' py='5px'>
                JOY COOL
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex py='25px' justify='center'>
            <Box
              w={{ md: '328px', lg: '506px' }}
              h={{ md: '292px', lg: '316px' }}
              borderWidth={1}
              borderColor='gray.400'
              borderRadius='md'
            >
              <Flex bg='#F8F8F8' p='17px'>
                <Text fontWeight='bold' fontSize='20px'>
                  Cooperative members
                </Text>
              </Flex>
              <Flex p='32px'>
                <Text fontSize='16px' fontWeight='bold'>
                  Carl Johson
                </Text>
                <Spacer />
                <Text fontSize='16px'>Invited</Text>
              </Flex>
            </Box>
            <ManagerProfile />
          </Flex>
        </Box>
      </Box>
      {/* )} */}
    </Box>
  )
}

CooperativeInvite.propTypes = {
  history: PropTypes.object.isRequired
}

export default CooperativeInvite
