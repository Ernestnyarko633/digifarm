/* eslint-disable */

import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Heading, Box, Flex, Icon, Text, Spinner } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import WarehouseCard from 'components/Cards/WarehouseCard'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'
import FarmsEmptyState from 'components/EmptyStates/FarmsEmptyState'
import Greetings from 'components/Utils/Greetings'
import { getCurrentDayParting } from 'helpers/misc'




const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'
  const { getMyFarms } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [reload, setReload] = React.useState(0)
  const { message } = getCurrentDayParting()

  const {
    data: myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmssHasError
  } = useFetch('my_farms', getMyFarms, reload, { user: user?._id })
  console.log(myfarms, 'farms')

  return (
    <Layout>
      {(myfarms?.length >0 )? (
        <Box h="880px" py={50} mt={-20} pos='absolute' top={{ md: 40 }} left={{ md: 60 }} w='100%' bg='cf-dark.400' >
        <Heading ml={24}>Warehouse</Heading>
        <Box
          mt={2}
          mb={2}
          ml={24}
          borderRadius={40}
          borderWidth={2}
          borderColor='rgba(208, 143, 49, 0.1)'
          bgColor='rgba(208, 143, 49, 0.1)'
          p={2}
          position='absolute'
        >
          <Flex>
            <Icon as={IoWarningOutline} color='#D08F31' w={5} h={5} />
            <Text
              as='span'
              fontWeight='bold'
              fontSize='14px'
              color='#D08F31'
              px={2}
            >
              If produce in the warehouse are not sold within 2 weeks, they will
              automatically be sold to a buyer
            </Text>
          </Flex>
        </Box>
        <Box mt={2} p={16}>
          <Flex my={3} w='62%' align='center' direction='column'>
            { myfarms?.map( myfarm => (
            <WarehouseCard
              sellButton={true}
              _id={myfarm._id}
              key={myfarm?.name}
              mr={3}
              ml={14}
              myfarm={myfarm}
            />
            ))}

            <Box>
              <Text fontSize='md' ml={2} color='cf.400'>
                
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box> 
      
      ):(
      <>
      <Greetings
        title={`${message} Farmer ${user?.firstName}`}
        text='Get started by farming individually or with a group.'
      />
      <FarmsEmptyState mt={50}/>
      </>
      )}
    </Layout>
  )
}

export default Warehouse
