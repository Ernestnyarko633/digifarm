import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Heading,
  Flex,
  Avatar,
  Container,
  Link,
  Divider,
  Image
} from '@chakra-ui/react'
import useAuth from 'context/auth'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'
import cooperative_avatar from 'assets/images/cooperative_avatar.png'
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
          text='loading cooperative'
        />
      ) : (
        <Container
          maxW={{ md: '60rem', xl: '5xl', '3xl': '80rem' }}
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
            <Flex bg='#F8F8F8' py={4} px={10} justify='space-between'>
              <Text fontWeight='bold' fontSize={{ base: 12, md: 16 }}>
                Your Cooperative
              </Text>
              <Text
                color='#D0021B'
                fontWeight='bold'
                fontSize={{ base: 12, md: 16 }}
              >
                Farm starts: {date()}
              </Text>
            </Flex>
            <Flex justify='space-between' wrap={{ base: 'wrap-reverse' }}>
              <Box pt={{ base: 4, lg: 6 }} px={{ base: 6, md: 10 }}>
                <Flex>
                  <Avatar
                    name={
                      data?.product?.cropVariety?.crop?.imageUrl ||
                      data?.product?.cropVariety?.crop?.name
                    }
                    size='md'
                    mt={2}
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
                <Box pb={8} pt={4}>
                  <Text fontSize={20} py={1}>
                    Location:{' '}
                    <Text as='span' fontWeight='bold'>
                      {FirstLettersToUpperCase(data?.product?.location?.name) +
                        ' , ' +
                        FirstLettersToUpperCase(data?.product?.location?.state)}
                    </Text>
                  </Text>
                  <Text fontSize={20} py={1}>
                    Cooperative type:
                    <Text as='span' fontWeight='bold' ml={2}>
                      {FirstLettersToUpperCase(data?.type?.name)}
                    </Text>
                  </Text>
                  <Text fontSize={20} py={1}>
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
              <Flex justify='center' px={{ base: 20 }} py={8}>
                <Box>
                  <Image
                    src={data?.imageUrl || cooperative_avatar}
                    w='10rem'
                    h='10rem'
                    rounded='100%'
                  />
                  <Text
                    fontWeight='bold'
                    textAlign='center'
                    py={3}
                    fontSize={{ base: 16, md: 24 }}
                  >
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
                w={{ base: 'full', md: '30rem', xl: '30rem', '3xl': '40rem' }}
              >
                <Flex
                  bg='#F8F8F8'
                  p='17px'
                  top={0}
                  zIndex={2}
                  pos='sticky'
                  w='full'
                >
                  <Text
                    fontWeight='bold'
                    fontSize={{ base: 16, md: 16 }}
                    pl={3}
                  >
                    Cooperative members
                  </Text>
                </Flex>
                <Box px={4} pt={2}>
                  {data?.users?.map(item => (
                    <Flex
                      py='5px'
                      px={{ base: 4, md: 4, lg: 4 }}
                      key={item?.id}
                      justify='space-between'
                    >
                      <Text fontSize={{ base: 16, md: 16 }} fontWeight='bold'>
                        {item?.info?.firstName || item?.info?.lastName
                          ? item?.info?.firstName + ' ' + item?.info?.lastName
                          : 'Annonymous'}
                      </Text>
                      <Text fontSize={{ base: 16, md: 16 }}>Invited</Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
              <Box
                height={{ md: '80%', lg: '85%', xl: '20rem' }}
                width={{
                  base: 'full',
                  md: '30rem',
                  xl: '30rem',
                  '3xl': '40rem'
                }}
                rounded='md'
                borderWidth={1}
                borderColor='gray.300'
              >
                <Flex
                  bg='#F8F8F8'
                  p='17px'
                  top={0}
                  zIndex={2}
                  pos='sticky'
                  w='full'
                >
                  <Text
                    fontWeight='bold'
                    fontSize={{ base: 16, md: 16 }}
                    pl={5}
                  >
                    Farm Manager
                  </Text>
                </Flex>
                <ManagerProfile
                  item={doc}
                  size='2xl'
                  px={5}
                  rounded={0}
                  height='80%'
                  border='0px'
                />
              </Box>
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
                <Button btntitle='continue' w='310px' fontSize={20} h='48px' />
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
