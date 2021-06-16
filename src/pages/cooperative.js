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
import { FirstLettersToUpperCase } from 'helpers/misc'
const Cooperative = ({ location: { state } }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = useState(0)
  const { setSelectedFarm, setStep, setOtherStep, setSelectedCooperativeType } =
    useStartFarm()

  const { getCooperativeById } = useApi()
  const { data, isLoading, error } = useFetch(
    null,
    getCooperativeById,
    reload,
    state?.data?.coop?._id
  )

  document.title = `Welcome to ${data?.name} Cooperative`

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
      setSelectedCooperativeType(data?.type)
      sessionStorage.setItem('type', 'cooperative')
      sessionStorage.setItem('selected_farm', JSON.stringify(data?.product))
      setStep(x => x + 2)
      setOtherStep(x => x + 3)
    }

    return () => (mounted = false)
  }, [
    data?.product,
    data?.type,
    setOtherStep,
    setSelectedFarm,
    setStep,
    setSelectedCooperativeType
  ])

  const triggerReload = () => setReload(prevState => prevState + 1)

  const date = () => {
    return new Date(data?.product?.startDate).toLocaleDateString('en-GB')
  }

  return (
    <Box maxW='full' bg='white'>
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
        <Container
          maxW={{ md: 'full', xl: '5xl' }}
          pt={{ base: 20, lg: 24, '5xl': '10rem' }}
          pb={{ base: 3, lg: 8, xl: 8 }}
          bg='white'
          mx='auto'
          h='full'
        >
          <Heading
            fontSize={{ base: 16, md: 20 }}
            mb={{ md: 10, '5xl': '5rem' }}
            textAlign='center'
          >
            Welcome {user.firstName}
          </Heading>
          <Box
            borderWidth={1}
            borderRadius='md'
            borderColor='gray.300'
            my={{ base: 5 }}
          >
            <Flex bg='#F8F8F8' p={4}>
              <Text fontWeight='bold' fontSize={{ base: 12, md: 16 }}>
                Your Cooperative
              </Text>
              <Spacer />
              <Text
                color='#D0021B'
                fontWeight='bold'
                fontSize={{ base: 12, md: 16 }}
              >
                Farm starts: {date()}
              </Text>
            </Flex>
            <Flex
              p={{ lg: 8 }}
              justify='space-between'
              wrap={{ base: 'wrap-reverse' }}
            >
              <Box pt={{ base: 4, lg: 6 }} px={{ base: 6 }}>
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
                      {FirstLettersToUpperCase(data?.product?.location?.name) +
                        ' , ' +
                        FirstLettersToUpperCase(data?.product?.location?.state)}
                    </Text>
                  </Text>
                  <Text fontSize={16}>
                    Cooperative type:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {FirstLettersToUpperCase(data?.type?.name)}
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
                <Box>
                  <Avatar size='2xl' name={data?.name} mx={6} />
                  <Text fontWeight='bold' pl={12} py={3}>
                    {data?.name}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Flex py={{ md: 8, lg: 4 }} wrap={{ base: 'wrap', md: 'nowrap' }}>
              <Box
                height={{ base: '15rem', md: '15rem', lg: '85%', xl: '20rem' }}
                pb={{ lg: 2 }}
                borderWidth={1}
                mr={{ md: 4, lg: 5, xl: 8 }}
                borderRadius='md'
                borderColor='gray.300'
                overflowY='scroll'
                mb={{ base: 3 }}
                w={{ base: 'full', md: '22rem', xl: '30rem' }}
              >
                <Flex
                  bg='#F8F8F8'
                  p='17px'
                  top={0}
                  zIndex={2}
                  pos='sticky'
                  w='full'
                >
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
                    <Text fontSize={{ base: 16, md: 16 }}>Invited</Text>
                  </Flex>
                ))}
              </Box>
              <ManagerProfile
                item={doc}
                height={{ base: '100%', lg: '85%', xl: '20rem' }}
                size='2xl'
                width={{
                  base: 'full',
                  md: '25rem',
                  xl: '30rem'
                }}
                py='15px'
                px={4}
              />
            </Flex>
            <Flex justify={{ base: 'center', md: 'flex-end' }} my={{ base: 6 }}>
              <Link
                to={{
                  pathname: '/start-farm/cooperative',
                  state: {
                    cooperative: data,
                    acreage: data?.users?.filter(u => u.id === user?._id)[0]
                      ?.acreage,
                    user: user?._id,
                    product: data?.product?._id
                  }
                }}
                _hover={{ textDecor: 'none' }}
                as={ReachRouter}
              >
                <Button
                  btntitle='continue'
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
