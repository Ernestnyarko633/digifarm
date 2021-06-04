import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Heading,
  Flex,
  Avatar,
  Spacer,
  Container,
  Link,
  Grid,
  Divider
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
      setSelectedFarm(data?.product)
      sessionStorage.setItem('selected_farm', JSON.stringify(data?.product))
      setStep(x => x + 2)
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
        <Container maxW={{ xl: '5xl' }} py={{ base: 20, md: 24 }}>
          <Heading
            fontSize={{ base: 16, md: 20 }}
            mb={{ md: 10 }}
            textAlign='center'
          >
            Welcome {user.firstName}
          </Heading>
          <Box
            bg='white'
            borderWidth={1}
            borderRadius='md'
            borderColor='gray.300'
            my={{ base: 5 }}
          >
            <Flex bg='#F8F8F8' p={4}>
              <Text fontWeight='bold' fontSize={{ base: 12, md: 16 }}>
                Your
                <Text fontSize={{ base: 16, md: 16 }}> Cooperative</Text>
              </Text>
              <Spacer />
              <Text
                color='#D0021B'
                fontWeight='bold'
                fontSize={{ base: 12, md: 16 }}
              >
                Farm starts:
                <Text fontSize={{ base: 16, md: 16 }}> {date()}</Text>
              </Text>
            </Flex>
            <Flex
              p={{ lg: 8 }}
              templateColumns={{ md: 'repeat(2,1fr)' }}
              justify='space-between'
              wrap={{ base: 'wrap-reverse' }}
            >
              <Box py={{ base: 4, md: 4 }} px={{ base: 6 }}>
                <Flex>
                  <Avatar
                    name={data?.product?.cropVariety?.crop?.imageUrl}
                    size='lg'
                  />
                  <Box px={3} pt={{ base: 3, md: 0 }}>
                    <Text fontWeight='bold' fontSize={{ base: 16, md: 24 }}>
                      {data?.product?.cropVariety?.crop?.name}
                    </Text>
                    <Text fontSize={{ base: 12, md: 16 }}>
                      {data?.product?.cropVariety?.crop?.sciName +
                        '  #' +
                        data?.product?.name}
                    </Text>
                  </Box>
                </Flex>
                <Box py='26px'>
                  <Text fontSize={16}>
                    Location:{' '}
                    <Text as='span' fontWeight='bold'>
                      {data?.product?.location?.name +
                        ' , ' +
                        data?.product?.location?.state}
                    </Text>
                  </Text>
                  <Text fontSize={16}>
                    Cooperative type:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {data?.type?.name.toUpperCase()}
                    </Text>
                  </Text>
                  <Text fontSize={16}>
                    Cooperative Admin:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {data?.users[0]?.info?.firstName +
                        ' ' +
                        data?.users[0]?.info?.lastName}
                    </Text>
                  </Text>
                </Box>
              </Box>
              <Divider
                d={{ base: 'block', md: 'none' }}
                mt={-4}
                borderColor='gray.300'
              />
              <Flex justify='center' px={{ base: 20 }} py={{ base: 4 }}>
                <Box py={{ md: 8, lg: 8 }}>
                  <Avatar size='2xl' name={data?.name} mx={6} />
                  <Text fontWeight='bold' pl={12} py={3}>
                    {data?.name}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Grid
              py={{ md: 8, lg: 8 }}
              templateColumns={{ md: 'repeat(2,1fr)' }}
              gap={{ base: 6 }}
            >
              <Box
                height='full'
                pb={{ lg: 2 }}
                borderWidth={1}
                mr={{ md: 5, lg: 8 }}
                borderRadius='md'
                borderColor='gray.300'
                overflowY='scroll'
                mb={{ base: 3 }}
              >
                <Flex bg='#F8F8F8' p='17px'>
                  <Text fontWeight='bold' fontSize={{ base: 16, md: 16 }}>
                    Cooperative members
                  </Text>
                </Flex>
                {data?.users?.map(item => (
                  <Flex py='5px' px={{ base: 4, md: 4, lg: 4 }} key={item?.id}>
                    <Text fontSize={{ base: 16, md: 16 }} fontWeight='bold'>
                      {item?.info?.firstName || item?.info?.lastName
                        ? item?.info?.firstName + ' ' + item?.info?.lastName
                        : 'Annonymous'}
                    </Text>
                    <Spacer />
                    <Text fontSize={{ base: 16, md: 16 }}>
                      {item?.info?.firstName || item?.info?.lastName
                        ? 'Accepted'
                        : 'Invited'}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <ManagerProfile
                item={doc}
                height='full'
                size='2xl'
                py='15px'
                px={4}
              />
            </Grid>
            <Flex justify={{ base: 'center', md: 'flex-end' }} my={{ base: 4 }}>
              <Link
                to={{
                  pathname: '/start-farm/cooperative',
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
