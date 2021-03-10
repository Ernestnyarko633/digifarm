import React, { useState } from 'react'
import Layout from 'container/Layout'
import { Heading, Box, Flex, Icon, Text, Spinner } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'
import WarehouseCard2 from 'components/Cards/WarehouseCard2'
import useApi from 'context/api'
import useAuth from 'context/auth'

const Warehouse = () => {
  document.title = 'Complete Farmer | Warehouse'
  const { getMyFarms, getMyOrders, getFarms } = useApi()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [farms, setFarms] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState('fetching')
  const [myFarms, setMyFarms] = useState([])
  const [setWarehouses] = useState([])
  const [setOrders] = useState([])

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
      <Box pos='absolute' top={{ md: 40 }} left={{ md: 60 }} w='100%'>
        <Heading>Warehouse</Heading>
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

        <Box mt={20} p={16}>
          <Flex my={3} w='62%' align='center' direction='column'>
            {loading === 'fetching' && <Spinner size='lg' color='cf.400' />}
            {loading === 'done' &&
              myFarms?.map(myfarm => (
                <WarehouseCard2
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
      </Box>
    </Layout>
  )
}

export default Warehouse
