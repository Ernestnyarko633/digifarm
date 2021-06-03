import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Tag,
  Text,
  useToast
} from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import useStartFarm from 'context/start-farm'
import { Status } from 'helpers/misc'
import { saveAs } from 'file-saver'
import useApi from 'context/api'

const OrderCard = ({ order, onOpen }) => {
  // eslint-disable-next-line no-console
  console.log('order', order)
  const { PENDING } = Status
  const { setOrder } = useStartFarm()
  const [loading, setLoading] = React.useState(false)
  const toast = useToast()
  const { downloadFile } = useApi()

  const _downloadOrder = async query => {
    try {
      setLoading(true)
      const res = await downloadFile('orders', query)
      let blob = new Blob([res.data], {
        type: 'application/pdf;charset=utf-8'
      })
      toast({
        title: 'Download starting',
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      saveAs(blob, `${query.reference}-agreement.pdf`)
    } catch (error) {
      toast({
        title: 'Download failed',
        description:
          error?.message || error?.data?.message || 'Unexpected error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box
      bg='white'
      minW={{ base: 82, md: 115 }}
      p={{ base: 4, md: 8 }}
      rounded={{ base: '15px', md: '30px' }}
      filter={{
        base: 'none',
        lx: 'drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
      }}
      mr={6}
    >
      <Flex>
        <Avatar
          bgColor='white'
          borderWidth='1px'
          borderColor='gray.300'
          src={order?.product?.cropVariety?.imageUrl}
        />
        <Box ml={4}>
          <Flex align='center'>
            <Heading as='h4' fontSize={{ base: 'lg', md: '2xl' }}>
              {order?.product?.cropVariety?.crop?.name}
            </Heading>
            <Text
              ml={1}
              as='span'
              fontSize={{ base: 'tiny', md: 'sm' }}
              color='gray.500'
            >
              ({order?.product?.cropVariety?.name}) {order?.product?.name}
            </Text>
          </Flex>

          <Text
            color='gray.500'
            mt={-1}
            fontSize={{ base: 'sm', md: 'md' }}
            textTransform='uppercase'
          >
            {order?.product?.location?.name},{' '}
            {order?.product?.location?.country}
          </Text>
        </Box>
      </Flex>
      <Divider orientation='horizontal' borderColor='gray.300' my={5} />

      <Flex justify='space-between'>
        <List
          fontWeight={{ base: 600, md: 800 }}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          <ListItem>Order number: {order?.reference}</ListItem>
          <ListItem>{order?.acreage} Acres</ListItem>
          <ListItem>USD {order?.cost}</ListItem>
        </List>

        <Box textAlign='center'>
          <Tag
            bg='cf.300'
            color='cf.800'
            px={{ base: 2, md: 6 }}
            py={{ md: 2 }}
            fontSize={{ base: 'xs', md: 'sm' }}
            rounded='30px'
          >
            {order.status === PENDING ? 'Pending ' : 'Processing '}
            Order
          </Tag>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            {order.status === PENDING ? '50' : '80'}% Complete
          </Text>
        </Box>
      </Flex>

      {order.status === PENDING && (
        <Box mt={6} w='90%' mx='auto'>
          <Button
            btntitle='Complete order'
            rounded='30px'
            w='100%'
            h={{ base: 12, md: 16 }}
            fontSize={{ md: 'lg' }}
            onClick={() => {
              setOrder(order)
              onOpen()
            }}
          />
        </Box>
      )}

      {order.status === PENDING && (
        <Box mt={6} w='90%' mx='auto'>
          <Button
            btntitle='Download invoice'
            rounded='30px'
            colorScheme='none'
            color='cf.800'
            w='100%'
            isLoading={loading}
            isDisabled={loading}
            h={{ base: 8 }}
            fontSize={{ md: 'lg' }}
            onClick={() => {
              return _downloadOrder({
                reference: order?.reference,
                type: 'invoice'
              })
            }}
          />
        </Box>
      )}
    </Box>
  )
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    reference: PropTypes.string,
    cost: PropTypes.number,
    payment: PropTypes.string,
    acreage: PropTypes.number,
    product: PropTypes.object,
    location: PropTypes.object,
    status: PropTypes.string
  }),
  onOpen: PropTypes.func
}

export default OrderCard
