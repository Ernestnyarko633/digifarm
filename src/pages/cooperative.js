/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Heading,
  Flex,
  Avatar,
  Spacer,
  Container,
  Link
} from '@chakra-ui/react'
import useAuth from 'context/auth'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import Header from 'container/Header'
import ManagerProfile from 'components/StartFarmProcess/OtherSteps/ManagerProfile'
import { Button } from 'components'
import { Link as ReachRouter } from 'react-router-dom'
import useStartFarm from 'context/start-farm'
const Cooperative = ({ location: { state } }) => {
  document.title = `Welcome to ${state?.data.name} Cooperative`
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = useState(0)
  const { setSelectedFarm, setStep, setOtherStep } = useStartFarm()

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    `welcome_to_coop_${state?.data?._id}`,
    getCooperativeById,
    reload,
    state?.data?._id
  )

  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      const res = await Client.getByUID('farm_managers', data?.product._id)
      if (res) {
        setDocData(res.data)
      }
    }
    if (mounted && !doc) {
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc, data?.product._id])

  useEffect(() => {
    let mounted = true

    if (mounted && data?.product?._id) {
      console.log(data?.product, 'homing')
      setSelectedFarm(data?.product)
      sessionStorage.setItem('selected_farm', JSON.stringify(data?.product))
      setStep(x => x + 1)
      setOtherStep(x => x + 3)
    }

    return () => (mounted = false)
  }, [data?.product, setOtherStep, setSelectedFarm, setStep])

  const triggerReload = () => setReload(prevState => prevState + 1)

  const date = () => {
    return new Date(data?.product?.startDate).toLocaleDateString('en-GB')
  }

  return (
    <Box bg='white'>
      <Header />
      {isLoading || error ? (
        <FetchCard
          h='100vh'
          w='100vw'
          direction='column'
          align='center'
          justify='center'
          reload={triggerReload}
          loading={isLoading}
          error={error}
          text='loading cooperative...'
        />
      ) : (
        <Container maxW={{ xl: '5xl' }} py={{ md: 24 }}>
          <Heading fontSize='24px' mb={{ md: 10 }} textAlign='center'>
            Welcome {user.firstName}
          </Heading>
          <Box
            bg='white'
            borderWidth={1}
            borderRadius='md'
            borderColor='gray.300'
          >
            <Flex bg='#F8F8F8' p='17px'>
              <Text fontWeight='bold' fontSize='20px'>
                Your Cooperative
              </Text>
              <Spacer />
              <Text color='#D0021B' fontWeight='bold'>
                Farm starts: {date()}
              </Text>
            </Flex>
            <Flex p={{ lg: 8 }} justify='space-between'>
              <Box>
                <Flex>
                  <Avatar
                    name={data?.product?.cropVariety?.crop?.imageUrl}
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
              <Box pr='66px' py={{ lg: 8 }}>
                <Avatar size='2xl' name={data?.name} />
                <Text fontWeight='bold' textAlign='center' py='5px'>
                  {data?.name}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box pb={{ md: 10 }}>
            <Flex
              py={{ lg: '25px' }}
              justify='center'
              wrap={{ base: 'wrap', md: 'inherit' }}
            >
              <Box
                w='50%'
                height='full'
                pb={{ lg: 2 }}
                borderWidth={1}
                mr={{ md: 5, lg: 8 }}
                borderRadius='md'
                borderColor='gray.300'
              >
                <Flex bg='#F8F8F8' p='17px'>
                  <Text fontWeight='bold' fontSize='20px'>
                    Cooperative members
                  </Text>
                </Flex>

                <Box overflowY='scroll'>
                  {data?.users?.map(item => (
                    <Flex
                      py='5px'
                      px={{ md: '15px', lg: '20px' }}
                      key={item?.id}
                    >
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
              </Box>
              <ManagerProfile
                item={doc}
                width='50%'
                height='full'
                size='2xl'
                py='15px'
                px={4}
              />
            </Flex>
            <Flex justify='flex-end'>
              <Link
                to={{
                  pathname: '/start-farm/cooperative-farms',
                  state: {
                    cooperative: data._id,
                    acreage: data.users?.filter(u => u.id === user?._id)[0]
                      ?.acreage,
                    user: user._id,
                    product: data.product._id
                  }
                }}
                _hover={{ textDecor: 'none' }}
                as={ReachRouter}
              >
                <Button
                  btntitle='Get Started'
                  w='310px'
                  fontSize='16px'
                  h='48px'
                />
              </Link>
            </Flex>
          </Box>
        </Container>
      )}
    </Box>
  )
}

Cooperative.propTypes = {
  location: PropTypes.object.isRequired
}

export default Cooperative
