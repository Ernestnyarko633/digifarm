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
      filter='drop-shadow(0px 2px 50px rgba(0, 0, 0, 0.1))'
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
          <Heading as='h4' fontSize={{ md: 'lg' }}>
            {order?.product?.cropVariety?.crop?.name}(
            {order?.product?.cropVariety?.name}) Farm
          </Heading>
          <Text color='gray.600'>
            {order?.product?.location?.name}, {order?.product?.location?.state}
          </Text>
        </Box>
      </Flex>
      <Divider orientation='horizontal' borderColor='gray.300' my={5} />

      <Flex justify='space-between'>
        <List fontWeight='800'>
          <ListItem>Order number: {order?.reference}</ListItem>
          <ListItem>{order?.acreage} Acres</ListItem>
          <ListItem>USD {order?.cost}</ListItem>
        </List>

        <Box textAlign='center'>
          <Tag
            bg='cf.300'
            color='cf.400'
            px={{ md: 6 }}
            py={{ md: 2 }}
            rounded='30px'
          >
            Pending Order
          </Tag>
          <Text fontSize='sm'>80% Complete</Text>
        </Box>
      </Flex>

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
    location: PropTypes.object
  }),
  onOpen: PropTypes.func
}

export default OrderCard
