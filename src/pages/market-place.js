import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Box, Flex, Icon, Text, Heading, Spinner } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import BuyerCard from 'components/Cards/BuyerCard'
// import IllustrationImage from '../assets/images/home/illustration.png'
// import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard2'
// import ArrowButton from '../components/Button/ArrowButton'

import useApi from '../context/api'
import useAuth from 'context/auth'
/* eslint-disable */
import { motion } from 'framer-motion'
import AboutBuyer from 'components/Modals/AboutBuyer'


// const MotionFlex = motion.custom(Flex)
// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const Marketplace = () => {
  document.title = 'Complete Farmer | Marketplace'
  const { getBuyers, getMyFarms, getMyOrders, getFarms} = useApi()
  const {isAuthenticated} = useAuth()
  const {user} = isAuthenticated()
  const [orders, setOrders] = useState([])
  const [farms, setFarms] = useState([])
  const [buyers, setBuyers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState("fetching")
  const [myFarms, setMyFarms] = useState([])
  const [warehouses, setWarehouses] = useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        setError(null)
        const res = await getMyOrders({ user: user?._id })
        setOrders(res.data)
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        setError(null)
        const res = await getFarms()
        setFarms(res.data)
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('fetching')
        setError(null)
        const res = await getMyFarms()
        setMyFarms(res.data)
        setLoading('done')
      } catch (error) {
        setError(error)
        setLoading('done')
      }
    }
    fetchData()
    myFarms.forEach(farm => {
      const temp = farms.find(_farm => _farm._id === farm.order?.product?._id)
      if (temp) {
        farm.order.product = temp
        setWarehouses([farm])
        setLoading('done')
      }
    })
  }, [])

  return (
    <Layout>
      <Box pos='absolute' top={{md:40}} left={{md:60}} w='100%'>
        <Heading>Warehouse / Marketplace </Heading>
        <Box
          mt={2}
          mb={6}
          borderRadius={40}
          borderWidth={2}
          borderColor='rgba(208, 143, 49, 0.1)'
          bgColor='rgba(208, 143, 49, 0.1)'
          p={2}
          position='absolute'
        >
          <Flex>
            <Icon as={IoWarningOutline} color='#D08F31' w={7} h={7} />
            <Text
              as='span'
              fontWeight='bold'
              fontSize='18px'
              color='#D08F31'
              px={4}
            >
              If produce in the warehouse are not sold within 2 weeks, they will
              automatically be sold to a buyer
            </Text>
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex my={3} w='62%' align='center' direction='column'>
            {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}
            {loading === 'done' &&
              myFarms?.map(myfarm => (
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
            {loading === 'done' && error && (
              <Box>
                <Text fontSize='md' ml={2} color='cf.400'>
                  {/* Something went wrong */}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
        <Box>
          <BuyerCard/>
        </Box>

       
      
     
      </Box>
    </Layout>
   
  )
}

export default Marketplace
