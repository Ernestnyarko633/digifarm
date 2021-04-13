import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Tag,
  Text
} from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import useStartFarm from 'context/start-farm'
// import useApi from 'context/api'

const OrderCard = ({ order, onOpen }) => {
  const { setOrder } = useStartFarm()

  return (
    <Box
      bg='white'
      minW={{ base: 82, md: 115 }}
      p={{ base: 4, md: 8 }}
      rounded={{ base: '15px', md: '30px' }}
      filter={{
        base: 'none',
        md: 'drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
      }}
      mr={6}
    >
      <Flex>
        <Avatar
          bgColor='white'
          borderWidth='1px'
          borderColor='gray.300'
          src={
            order?.product?.cropVariety?.imageUrl ||
            require('../../assets/images/soya.png').default
          }
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
            color='cf.400'
            px={{ base: 2, md: 6 }}
            py={{ md: 2 }}
            fontSize={{ base: 'xs', md: 'sm' }}
            rounded='30px'
          >
            {order.status === 'PENDING' ? 'Pending' : 'Processing'} Order
          </Tag>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            {order.status === 'PENDING' ? '50' : '80'}% Complete
          </Text>
        </Box>
      </Flex>

      <Box mt={6} w='90%' mx='auto'>
        <Button
          btntitle='Complete order'
          rounded='30px'
          w='100%'
          disabled
          h={{ base: 12, md: 16 }}
          fontSize={{ md: 'lg' }}
          onClick={() => {
            setOrder(order)
            onOpen()
          }}
        />
      </Box>
    </Box>
  )
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    reference: PropTypes.string,
    cost: PropTypes.number,
    acreage: PropTypes.number,
    product: PropTypes.object,
    location: PropTypes.object,
    status: PropTypes.string
  }),
  onOpen: PropTypes.func
}

export default OrderCard
