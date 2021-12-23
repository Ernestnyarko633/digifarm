import React from 'react'
import Layout from 'container/Layout'
import { Box, Flex, Icon, Text, Heading } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import BuyerCard from 'components/Cards/BuyerCard'
// import transaction1 from '../assets/images/transaction1.png'
// import transaction2 from '../assets/images/transaction2.png'
import group from '../assets/images/group.png'
import WarehouseCard from 'components/Cards/WarehouseCard'
import useApi from '../context/api'

import BuyerEmptyState from 'components/EmptyStates/BuyerEmptyState'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'

const Marketplace = () => {
  document.title = "Complete Farmer | Farmer's Market"
  const { getDummyBuyers } = useApi()
  const [state, setState] = React.useState(0)
  const { state: myFarm } = useLocation()

  const toggle = value => {
    return setState(value)
  }

  const {
    data: dummyBuyers,
    isLoading,
    error,
    refetch
  } = useQuery(
    [
      `s_orders_${myFarm?.order?.product?.cropVariety?._id}`,
      myFarm?.order?.product?.cropVariety?._id
    ],
    async () => {
      return await getDummyBuyers()
    }
  )

  // const triggerReload = () => refetch()
  return (
    <Layout>
      <Box
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 24 }}
        mt={{ base: 10, md: 0 }}
      >
        <Heading>Farmer's Market </Heading>
        <Flex
          borderRadius={40}
          borderWidth={2}
          borderColor='rgba(208, 143, 49, 0.1)'
          bgColor='rgba(208, 143, 49, 0.1)'
          p={2}
          align='center'
          position='absolute'
        >
          {false && refetch()}
          <Icon as={IoWarningOutline} color='#D08F31' w={5} h={5} />
          <Text
            as='span'
            fontSize={{ base: 'xs', md: 'sm' }}
            fontWeight='bold'
            color='#D08F31'
            px={2}
          >
            If produce in the warehouse are not sold within 2 weeks, they will
            automatically be sold to a buyer
          </Text>
        </Flex>
      </Box>
      <Box
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 24 }}
        mt={{ base: 10, md: 0 }}
      >
        <WarehouseCard
          sellButton={false}
          _id={myFarm?._id}
          key={myFarm?.name}
          name={`${myFarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
          location={`${myFarm?.order?.product?.location?.name},${myFarm?.order?.product?.location?.state}`}
          image={`${myFarm?.order?.product?.cropVariety?.imageUrl}`}
          quantity={
            myFarm?.status === 'SOLD'
              ? 0
              : myFarm?.order?.acreage * myFarm?.order?.product?.storagePerAcre
          }
          weight={
            myFarm?.status === 'SOLD'
              ? 0
              : myFarm?.order?.acreage *
                myFarm?.order?.product?.weightOfProducePerAcre
          }
          bags={
            myFarm?.status === 'SOLD'
              ? 0
              : myFarm?.order?.acreage *
                myFarm?.order?.product?.quantityOfStoragePerAcre
          }
          mr={3}
          ml={14}
        />
      </Box>

      <Box py={12} px={{ base: 2, md: 24 }}>
        <Heading>Buyers</Heading>
        <Flex
          align='center'
          borderBottomWidth={1}
          borderBottomColor='cf-dark.300'
          pb={-1}
          mt={4}
          justify='space-between'
        >
          <Box
            cursor='pointer'
            fontWeight={state === 0 ? 'bold' : 'normal'}
            onClick={() => toggle(0)}
            borderBottomWidth={state === 0 && 2}
            borderBottomColor='cf.green'
            pb={3}
            color={state === 0 ? 'cf.green' : 'gray.700'}
          >
            <Text
              as='span'
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight='bold'
              px={2}
            >
              Ready Buyers
            </Text>
          </Box>
          {/* <Box
            cursor='pointer'
            fontWeight={state === 1 ? 'bold' : 'normal'}
            onClick={() => toggle(1)}
            borderBottomWidth={state === 1 && 2}
            borderBottomColor='cf.green'
            pb={3}
            color={state === 1 ? 'cf.green' : 'gray.700'}
          >
            <Text
              as='span'
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight='bold'
              px={2}
            >
              Ongoing Transactions
            </Text>
          </Box> */}
          {/* <Box
            cursor='pointer'
            fontWeight={state === 2 ? 'bold' : 'normal'}
            onClick={() => toggle(2)}
            borderBottomWidth={state === 2 && 2}
            borderBottomColor='cf.green'
            pb={3}
            color={state === 2 ? 'cf.green' : 'gray.700'}
          >
            <Text
              as='span'
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight='bold'
              px={2}
            >
              Past Transactions
            </Text>
          </Box> */}
        </Flex>
        {state === 0 &&
          !isLoading &&
          !error &&
          dummyBuyers?.data?.map(buyers => (
            // add condition for when there are no buyer and error handling
            <BuyerCard
              _id={buyers?._id}
              key={buyers?._id}
              buyers={buyers}
              myFarm={myFarm}
            />
          ))}
        {state === 0 && dummyBuyers?.data?.length === 0 && (
          <BuyerEmptyState
            image={group}
            note='No buyers available'
            info='Ready buyers will be available here'
            mx='auto'
          />
        )}

        {/* {state === 1 && (
          <BuyerEmptyState
            image={transaction1}
            note='No ongoing transaction yet'
            info='Ongoing transactions will be available here'
            mx='auto'
          />
        )} */}
        {/* {state === 2 && (
          <BuyerEmptyState
            image={transaction2}
            note={"You haven't made any transactions"}
            info='Past transaction history will show here'
            mx='auto'
          />
        )} */}
      </Box>
    </Layout>
  )
}

export default Marketplace
