import React from 'react'
import Layout from 'container/Layout'
import { Heading, Box, Icon, Text, Grid, Flex } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import WarehouseCard from 'components/Cards/WarehouseCard'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'
// import FarmsEmptyState from 'components/EmptyStates/FarmsEmptyState'
// import Greetings from 'components/Utils/Greetings'
// import { getCurrentDayParting } from 'helpers/misc'
// import BuyerEmptyState from 'components/EmptyStates/BuyerEmptyState'
// import vector from '../assets/images/vector.png'
import FetchCard from 'components/FetchCard'

const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'
  const { getMyFarms } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = React.useState(0)
  // const { message } = getCurrentDayParting()

  const triggerReload = () => setReload(prevState => prevState + 1)
  const {
    data: myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmsHasError
  } = useFetch('my_farms', getMyFarms, reload, { user: user?._id })

  const isLoading = myFarmsIsLoading
  const hasError = myFarmsHasError
  // const filteredFarms = myfarms?.filter(farm => farm.storage.quantity > 0)

  return isLoading || hasError ? (
    <FetchCard
      reload={() => !myfarms.length && triggerReload()}
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
      {/* {myfarms?.length > 0 ? ( */}
      <>
        {/* {myfarms?.length === 1 && myfarms[0].storage.quantity === 0 ? ( */}
        {/* <>
              <Greetings title='Warehouse' />
              <Box
                borderRadius={10}
                borderWidth={2}
                borderColor='rgba(255, 246, 216, 1)'
                bgColor='rgba(255, 246, 216, 1)'
                p={1}
                mt={{ base: 6, md: -90 }}
                pos={{ md: 'absolute' }}
                ml={{ md: 16 }}
              >
                <Icon as={IoWarningOutline} color='#D08F31' w={5} h={5} />
                <Text as='span' fontSize='14px' color='black' px={2}>
                  If produce in the warehouse are not sold within 2 weeks, they
                  will automatically be sold to a buyer
                </Text>
              </Box>
              <Center>
                <BuyerEmptyState
                  image={vector}
                  note='Warehouse is currently empty'
                  info='Warehouse will automatically show up when the produce are harvested and ready to sell'
                  ml={90}
                />
              </Center>
            </>
          ) : ( */}
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
              {myfarms?.map(myfarm => (
                <WarehouseCard
                  sellButton='true'
                  _id={myfarm._id}
                  key={myfarm?._id}
                  myfarm={myfarm}
                />
              ))}
            </Grid>
          </Flex>
        </>
        {/* )} */}
      </>
      {/* ) : ( */}
      {/* <>
          <Greetings
            title={`${message} Farmer ${user?.firstName}`}
            text='Get started by farming individually or with a group.'
          />
          <FarmsEmptyState />
        </> */}
      {/* )} */}
    </Layout>
  )
}

export default Warehouse
