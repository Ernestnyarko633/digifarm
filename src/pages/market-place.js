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

  const {
    data:myfarms,
    isLoading: myFarmsIsLoading,
    error: myFarmssHasError
  } = useFetch('my_farms', getMyFarms, reload, { user: user?._id })

  const {
    data: SourcingOrders,
    isLoading: SourcingOrdersIsLoading,
    error: SourcingOrdersHasError
  } = useFetch('sourcing_orders', getSourcingOrders, reload, {
    cropVariety: "602e1d1d7c083a1edd24fab9"
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
              {myfarms?.map(myfarm => (
                <WarehouseCard
                  _id={myfarm._id}
                  key={myfarm?.name}
                  name={`${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
                  location={`${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`}
                  image={`${myfarm?.order?.product?.cropVariety?.imageUrl}`}
                  quantity={myfarm?.storage?.quantity}
                  weight={myfarm?.storage?.weight}
                  bags={myfarm?.storage?.numberOfBags}
                  condition={myfarm?.storage?.yieldConditions}
                  mr={3}
                  ml={14}
                />
              ))}
          </Flex>
        </Box> 
        <Box mt ={-5} p={16} bgColor='cf-dark.300'>
          <Heading ml={10} mb={4}>Buyers you can sell to</Heading>
          <Flex ml={10}>
              <Box cursor='pointer'>Ready Buyers</Box>
              <Box mx={10} />
              <Box cursor='pointer'>Ongoing Transations</Box>
              <Box mx={10} />
              <Box cursor='pointer'>Past Buyers</Box>
          </Flex>
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
      </Box>
    </Layout>
   
  )
}

export default Marketplace
