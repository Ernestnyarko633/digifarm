/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { Box, Text, Heading, Flex, Avatar, Spacer } from '@chakra-ui/react'
import useAuth from 'context/auth'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import Header from 'container/Header'
import ManagerProfile from 'components/StartFarmProcess/OtherSteps/ManagerProfile'
import { Link } from 'carbon-components-react'
import { Button } from 'components'

const Cooperative = ({ location: { state } }) => {
  document.title = 'Cooperative ...'
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = useState(0)

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    state._id
  )

  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = useState(null)

  useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        const res = await Client.getByUID('farm_managers', data?.product._id)
        if (res) {
          setDocData(res.data)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc, data?.product._id])

  const triggerReload = () => setReload(prevState => prevState + 1)

  const date = () => {
    const date = new Date(data?.product?.startDate)
    return date.toLocaleDateString('en-GB')
  }

  return (
    <Box>
      {isLoading || error ? (
        <Box my={60} bg='none'>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            reload={triggerReload}
            loading={isLoading}
            error={error}
            text='loading cooperative'
          />
        </Box>
      ) : (
        <Box bg='white' h='100vh'>
          <Header />
          <Box pb={{ base: 10, md: 16 }} pt={{ base: 20, md: 28 }}>
            <Heading fontSize={{ base: '16px', md: '24px' }} textAlign='center'>
              Welcome {user.firstName}
            </Heading>
          </Box>
          <Box
            width={{ base: '340px', md: '670px', lg: '1034px' }}
            h={{ md: '33vh', lg: '330px' }}
            mx='auto'
            borderWidth={1}
            borderColor='gray.400'
            bg='white'
            borderRadius='md'
          >
            <Flex bg='#F8F8F8' p='17px'>
              <Text fontWeight='bold' fontSize={{ base: '10px', md: '20px' }}>
                Your
                <Text
                  as='span'
                  fontSize={{ base: '15px', md: '20px' }}
                  pl={{ base: '10px' }}
                >
                  Cooperative
                </Text>
              </Text>
              <Spacer />
              <Text
                color='#D0021B'
                fontWeight='bold'
                fontSize={{ base: '10px', md: '20px' }}
              >
                Farm starts:{' '}
                <Text as='span' fontSize={{ base: '15px', md: '20px' }} pl={2}>
                  {date()}
                </Text>
              </Text>
            </Flex>
            <Flex p='32px'>
              <Box>
                <Flex>
                  <Avatar
                    name={data?.product?.cropVariety?.crop?.name}
                    src={data?.product?.cropVariety?.crop?.imageUrl}
                    size='lg'
                  />
                  <Box px='13px'>
                    <Text fontWeight='bold' fontSize='24px'>
                      {data?.product?.cropVariety?.crop?.name}
                    </Text>
                    <Text fontSize='14px'>
                      {data?.product?.cropVariety?.crop?.sciName +
                        '  #' +
                        data?.product?.name}
                    </Text>
                  </Box>
                </Flex>
                <Box py='26px'>
                  <Text fontSize='20px'>
                    Location:{' '}
                    <Text as='span' fontWeight='bold'>
                      {data?.product?.location?.name +
                        ' , ' +
                        data?.product?.location?.state}
                    </Text>
                  </Text>
                  <Text fontSize='20px'>
                    Cooperative type:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {data?.type?.name.toUpperCase()}
                    </Text>
                  </Text>
                  <Text fontSize='20px'>
                    Cooperative Admin:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {data?.users[0]?.info?.firstName +
                        ' ' +
                        data?.users[0]?.info?.lastName}
                    </Text>
                  </Text>
                </Box>
              </Box>
              <Spacer />
              <Box pr={{ md: '20px', lg: '66px' }} py='32px'>
                <Avatar size='2xl' name={data?.name} />
                <Text fontWeight='bold' textAlign='center' py='5px'>
                  {data?.name}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Flex py='25px' justify='center'>
              <Box
                w={{ md: '328px', lg: '506px' }}
                h={{ md: '292px', lg: '316px' }}
                mr={{ md: 5, lg: 8 }}
                borderWidth={1}
                borderColor='gray.400'
                borderRadius='md'
              >
                <Flex bg='#F8F8F8' p='17px'>
                  <Text fontWeight='bold' fontSize='20px'>
                    Cooperative members
                  </Text>
                </Flex>
                {data?.users?.map(item => (
                  <Flex py='5px' px={{ md: '15px', lg: '20px' }} key={item?.id}>
                    <Text fontSize='16px' fontWeight='bold'>
                      {item?.info?.firstName || item?.info?.lastName
                        ? item?.info?.firstName + ' ' + item?.info?.lastName
                        : 'Annonymous'}
                    </Text>
                    <Spacer />
                    <Text fontSize='16px'>
                      {item?.info?.firstName || item?.info?.lastName
                        ? 'Accepted'
                        : 'Invited'}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <ManagerProfile
                item={doc}
                width={{ md: '328px', lg: '506px' }}
                height={{ md: '292px', lg: '316px' }}
                size={{ md: 'sm', lg: '2xl' }}
                py='15px'
                px={4}
              />
            </Flex>
          </Box>
          <Flex justify='flex-end' mr={20} py={8}>
            <Link href='/dashboard'>
              <Button
                btntitle='Get Started'
                w='310px'
                fontSize='16px'
                h='48px'
              />
            </Link>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

Cooperative.propTypes = {
  location: PropTypes.object.isRequired
}

export default Cooperative
