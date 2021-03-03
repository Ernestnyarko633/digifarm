import React, { useState } from 'react'
import Layout from 'container/Layout'
import {
  Box,
  Heading,
  Image,
  Text,
  Flex,
  Alert,
  AlertIcon,
  Spinner,
  Center
} from '@chakra-ui/react'
import BuyerCard from 'components/Cards/BuyerCard'
import IllustrationImage from '../assets/images/home/illustration.png'
// import Oval from '../assets/images/Oval.svg'
import WarehouseCard from 'components/Cards/WarehouseCard'
import ArrowButton from '../components/Button/ArrowButton'
import useApi from '../context/api'
import useAuth from 'context/auth'
/* eslint-disable */
import { motion } from 'framer-motion'
import AboutBuyer from 'components/Modals/AboutBuyer'


const MotionFlex = motion.custom(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

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
    setLoading("fetching")
    setError(null)
     const res = await getMyOrders({user: user?._id})
     setOrders(res.data)
     setLoading("done")
     } catch (error) {
       setError(error)
       setLoading("done")
     }
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
     try {
    setLoading("fetching")
    setError(null)
     const res = await getFarms()
     setFarms(res.data)
     setLoading("done")
     } catch (error) {
       setError(error)
       setLoading("done")
     }
    }
    fetchData()
  }, [])

  const filterFarmsByProduct = (farms = [], orders = []) => {
    let array = []
    orders.map(order => {
      farms.map((farm) => {
        if(farm._id === order.product._id){
          array.push(farm)
        }
      })
    })

    return array
  }
  

  React.useEffect(() => {
    let filteredFarms = filterFarmsByProduct(farms, orders)
    const fetchData = async (query = {}) => {
     try {
    setLoading("fetching")
     const res = await getBuyers(query)
     setBuyers(res.data)
     setLoading("done")
     } catch (error) {
       setError(error)
       setLoading("done")
     }
    }
    
    
    filteredFarms.forEach(async (_farm) => {
      try {
        setLoading("fetching")
        console.log(_farm.cropVariety, "clopValiety")
       const _res = await fetchData({cropVariety: _farm?.cropVariety?._id})
       setBuyers([...new Set(...buyers, ..._res.data)])
       setLoading("done")
      } catch (error) {
        setError(error)
        setLoading("done")
        
      }
    })
    
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
     try {
    setLoading("fetching")
    setError(null)
     const res = await getMyFarms()
     setMyFarms(res.data)
     setLoading("done")
     } catch (error) {
       setError(error)
       setLoading("done")
     }
    }
    fetchData()
    myFarms.forEach(farm => {
     const temp = farms.find(_farm =>_farm._id === farm.order?.product?._id)
     if(temp){
       farm.order.product = temp
       setWarehouses([farm])
       setLoading("done")
     }
    })
  }, [])

  const [currentSlide, setCurrentSlide] = React.useState(0)

  const handleClick = direction => {
    setCurrentSlide(prevState => {
      return (
        (myFarms.storage.length + prevState + direction) % myFarms.storage.length
      )
    })
  }

  return (
    <Layout>
      <Box pos='relative'>
        <Image
          src={IllustrationImage}
          h={{ md: 115 }}
          w='100%'
          objectFit='cover'
        />
        <Box pos='absolute' top={{ md: 40 }} left={{ md: 16 }}>
          <Heading as='h3' fontSize={{ md: '4xl' }}>
            Welcome to your marketplace
          </Heading>
          <Text>Sell your produce to the right buyer at a good price</Text>
        </Box>
      </Box>
      <Flex align='center' justify='space-between' p={{ md: 16 }}>
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Here are the crops in your warehouse
        </Heading>
        <ArrowButton handleClick={handleClick} />
      </Flex>
     
      <Box>
      <MotionFlex
      animate={{
        x: `-${26.5 * currentSlide}rem`,
        transition: { duration: 0.6, ...transition }
      }}
      pos='relative'
      minW={{ md: 130 }}
      mx='auto'
      ml={{ md: 16 }}
    >
      
      {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}
        {loading === 'done' && myFarms?.map(myfarm => (
          <WarehouseCard
            key={myfarm?.name}
            name={`${myfarm?.order?.product?.cropVariety?.crop?.name} Warehouse`}
            location={`${myfarm?.order?.product?.location?.name},${myfarm?.order?.product?.location?.state}`}
            image={`${myfarm?.order?.product?.cropVariety?.imageUrl}`}
            quantity={myfarm?.storage?.quantity}
            weight={myfarm?.storage?.weight}
            bags={myfarm?.storage?.numberOfBags}
            condition={myfarm?.storage?.yieldConditions}
            ml={14}
          />
        ))}        
        {/* {loading === 'done' && error &&(
          <Box>
            <Text fontSize="md" ml={2} color="cf.400">
              Something went wrong
            </Text>
          </Box>
        )} */}
      </MotionFlex>
      
      <Center>
        <Box mt={16} md={16}>
          <Alert status="info" bgColor='white' borderRadius={40} padding={5} borderWidth={1} borderColor='black'>
          <AlertIcon color='cf.400'/>
            <Text fontWeight="bold" fontSize="18px">
              Note: 
              <Text as='span' pl={1} fontWeight="light">
                 Crops in the warehouse that are not sold in 2 weeks will automatically be sold to a buyer
              </Text>
            </Text>
        </Alert>
        </Box>
      </Center>


      </Box>
      
      <Box my={10} mx={14} px={14} >
        <Heading as='h4' fontSize={{ md: '2xl' }}>
          Buyers you can sell to
        </Heading>
      </Box>
      <AboutBuyer/>
      <Box>
      {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}

        {loading === 'done' &&buyers?.map(buyer => (
          
          <BuyerCard
            key={buyer._id}
            name={`${buyer?.user?.firstName} ${buyer?.user?.lastName}`}
            address={`${buyer?.onboarding?.info?.address?.state} | ${buyer?.onboarding?.info?.name}`}
            image={buyer?.user?.avatar}
            amtLeft={buyer.demand - buyer.supply}
            amtNeeded={buyer.demand}
            amtBought={buyer.supply}
            price={buyer.cost}
            />
            ))}
          {/* {loading === 'done' && error &&(
          <Box>
            <Text fontSize="md" ml={2} color="cf.400">
              Something went wrong{error.message}
            </Text>
          </Box>
        )} */}
      </Box>

    </Layout>
  )
}

export default Marketplace
