import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Box, Flex, Icon, Text, Heading } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import BuyerCard from 'components/Cards/BuyerCard'
// import IllustrationImage from '../assets/images/home/illustration.png'
// import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard'
// import ArrowButton from '../components/Button/ArrowButton'
import useApi from '../context/api'
import useAuth from 'context/auth'
/* eslint-disable */
import { motion } from 'framer-motion'
import AboutBuyer from 'components/Modals/AboutBuyer'
import useFetch from 'hooks/useFetch'
import { Button } from 'carbon-components-react'
import useComponent from 'context/component'
import {useLocation} from 'react-router-dom'


// const MotionFlex = motion.custom(Flex)
// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Marketplace = () => {
  document.title = "Complete Farmer | Farmer's Market" 
  const { getSourcingOrders, getMyFarms} = useApi()
  const [ varieties, setVarieties ] = useState([])
  const [ buyers, setBuyers ] = useState([])
  const {isAuthenticated} = useAuth()
  const {user} = isAuthenticated()
  const [loading, setLoading] = useState("fetching")
  const [reload, setReload] = React.useState(0)
  const [state , setState] = React.useState(0)
  const {state: myfarm} = useLocation()


  const toggle = (value) => {
    return setState(value)
  }
  console.log(myfarm,'farms')

  const {
    data: SourcingOrders,
    isLoading: SourcingOrdersIsLoading,
    error: SourcingOrdersHasError
  } = useFetch('sourcing_orders', getSourcingOrders, reload, {
    cropVariety: myfarm?.order?.product?.cropVariety?._id
  }) 

  return (
    <Layout>
      <Box h="1500px" py={50} mt={-20} pos='absolute' top={{ md: 40 }} left={{ md: 60 }} w='100%' bg='cf-dark.400'>
        <Heading ml={24}>Farmer's Market </Heading>
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
                <WarehouseCard
                sellButton={false}
                  _id={myfarm._id}
                  key={myfarm?.name}
                  name={`${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
                  location={`${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`}
                  image={`${myfarm?.order?.product?.cropVariety?.imageUrl}`}
                  quantity={myfarm?.storage?.quantity}
                  weight={myfarm?.storage?.weight}
                  bags={myfarm?.storage?.numberOfBags}
                  mr={3}
                  ml={14}
                />
          
          </Flex>
        </Box> 
        <Box mt ={-5} p={16} bgColor='cf-dark.300' h='2500px' >
          <Heading ml={10} mb={4}>Buyers you can sell to</Heading>
          <Flex ml={10}  align='center'
            borderBottomWidth={1}
            borderBottomColor='cf-dark.300' pb={-1}>
              <Box 
              cursor='pointer'   
              fontWeight={state === 0 ? 'bold' : 'normal'}
              cursor='pointer'
              onClick={() => toggle(0)}
              borderBottomWidth={state === 0 && 2}
              borderBottomColor='cf.400'
              pb={3}
              color={state === 0 ?'cf.400' : 'gray.700'} >
                Ready Buyers
                </Box>
              <Box mx={10} />
              <Box 
              cursor='pointer'   
              fontWeight={state === 1 ? 'bold' : 'normal'}
              cursor='pointer'
              onClick={() => toggle(1)}
              borderBottomWidth={state === 1 && 2} 
              borderBottomColor='cf.400'
              pb={3}
              color={state === 1 ?'cf.400' : 'gray.700'}>
                Ongoing Transations
                </Box>
              <Box mx={10} />
              <Box 
              cursor='pointer'   
              fontWeight={state === 2 ? 'bold' : 'normal'}
              cursor='pointer'
              onClick={() => toggle(2)}
              borderBottomWidth={state === 2 && 2} 
              borderBottomColor='cf.400'
              pb={3}
              color={state === 2 ?'cf.400' : 'gray.700'}>
                 Past Buyers
              </Box>
          </Flex>
        {
          <Box>
            <Flex my={3} w='62%' align='center' direction='column'>
            {SourcingOrders?.map(buyers =>(
            <BuyerCard
            _id={buyers._id}
            key={buyers._id}
            buyers={buyers}
          />
          ))} 
          </Flex>
          </Box>
}
        </Box>   
      </Box>
    </Layout>
   
  )
}

export default Marketplace
