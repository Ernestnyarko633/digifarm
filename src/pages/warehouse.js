/* eslint-disable no-console */
import React from 'react'
import Layout from 'container/Layout'
import { Heading, Box, Icon, Text, Grid, Flex } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import WarehouseCard from 'components/Cards/WarehouseCard'
import useApi from 'context/api'
import useAuth from 'context/auth'
import FarmsEmptyState from 'components/EmptyStates/FarmsEmptyState'
import Greetings from 'components/Utils/Greetings'
import { getCurrentDayParting } from 'helpers/misc'
import FetchCard from 'components/FetchCard'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'

const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'
  const { getMyFarms } = useApi()
  const { isAuthenticated } = useAuth()
  const history = useHistory()
  const { user } = isAuthenticated()
  const { message } = getCurrentDayParting()
  const { state } = useLocation()
  const queryClient = useQueryClient()
  React.useEffect(() => {
    let mounted = true
    if (mounted && state?.reload) {
      queryClient.invalidateQueries('my_farms')
      // window.location.reload()
      history.push('/warehouses')
    }
  }, [history, queryClient, state])

  const {
    data: myFarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError,
    refetch
  } = useQuery('my_farms', () => getMyFarms())

  const isLoading = myFarmsIsLoading
  const hasError = myFarmsHasError

  const triggerReload = () => refetch()

  return isLoading || hasError ? (
    <FetchCard
      reload={() => hasError && triggerReload()}
      w='100%'
      mx='auto'
      align='center'
      justify='center'
      direction='column'
      error={hasError}
      loading={isLoading}
    />
  ) : (
    <Layout height='100vh' bgColor='none'>
      {myFarms?.data?.length === 0 ? (
        <>
          <Greetings
            title={`${message} Farmer ${user?.firstName}`}
            text='Get started by farming individually or with a group.'
          />
          <FarmsEmptyState />
        </>
      ) : (
        <>
          <Box
            py={{ base: 8, md: 12 }}
            px={{ base: 4, md: 20 }}
            mt={{ base: 10, md: 0 }}
          >
            <Box>
              <Heading as='h3' mb={{ base: 2, md: 0 }}>
                Warehouse
              </Heading>
              <Flex
                borderRadius={40}
                borderWidth={2}
                borderColor='rgba(208, 143, 49, 0.1)'
                bgColor='rgba(208, 143, 49, 0.1)'
                p={2}
                position={{ md: 'absolute' }}
                align='center'
              >
                <Icon as={IoWarningOutline} color='#D08F31' w={5} h={5} />
                <Text
                  as='span'
                  fontWeight='bold'
                  fontSize={{ base: 'xs', md: 'sm' }}
                  color='#D08F31'
                  px={2}
                >
                  If produce in the warehouse are not sold within 2 weeks, they
                  will automatically be sold to a buyer
                </Text>
              </Flex>
            </Box>
          </Box>
          <Flex justify='center' align='center' my={10}>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
              gap={6}
            >
              {myFarms?.data?.map(myFarm => (
                <WarehouseCard
                  sellButton='true'
                  _id={myFarm._id}
                  key={myFarm?._id}
                  myfarm={myFarm}
                />
              ))}
            </Grid>
          </Flex>
        </>
      )}
    </Layout>
  )
}

export default Warehouse
