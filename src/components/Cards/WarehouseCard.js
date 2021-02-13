import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Heading,
  Flex,
  ListItem,
  List,
  Avatar,
  Text,
  Image
} from '@chakra-ui/react'
import Button from 'components/Button'

const WarehouseCard = ({
  name,
  location,
  image,
  weight,
  bags,
  quantity,
  condition,
  status,
  mr,
  orderStatus,
  ml
}) => (
  <Flex mr={6}>
    <Box
      rounded='lg'
      bg='white'
      p={6}
      minW={{ md: 108 }}
      overflow='hidden'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      <Flex justify='space-between'>
        <Flex mb={4}>
          <Avatar bg='gray.100'>
            <Image src={image} />
          </Avatar>
          <Box ml={2}>
            <Heading as='h6' mb={{ md: 2 }} fontSize={{ md: 'lg' }}>
              {name}
            </Heading>
            <Text mt={{ md: -2 }} fontSize='sm' color='gray.500'>
              {location}
            </Text>
          </Box>
        </Flex>
        <Box ml={6}>
          <Box rounded='40px' bg='cf.200' my={1} pt={1} px={2}>
            <Text color='cf.400' fontSize='xs' textAlign='center'>
              {orderStatus ? `${orderStatus}` : 'Pending Order'}
            </Text>
          </Box>
          <Text as='h6' fontSize='xs' ml={2} fontWeight='bold'>
            {orderStatus === 'PAID' ? '100%' : '80% Complete'}
          </Text>
        </Box>
      </Flex>
      <Divider borderColor='gray.300' />
      <Box>
        <Flex>
          <List my={3} w='100%' mr={{ md: 16 }} fontSize='sm'>
            <ListItem
              d='flex'
              justifyContent='space-between'
              alignItems='center'
              py={1}
            >
              <Text color='gray.500'>Volume</Text>
              <Text as='span' textAlign='left'>
                - {quantity}
              </Text>
            </ListItem>
            <ListItem
              d='flex'
              justifyContent='space-between'
              alignItems='center'
              py={1}
            >
              <Text color='gray.500'>Weight</Text>
              <Text as='span' textAlign='left'>
                - {weight}
              </Text>
            </ListItem>
            <ListItem
              d='flex'
              justifyContent='space-between'
              alignItems='center'
              py={1}
            >
              <Text color='gray.500'>Number of Bags</Text>
              <Text as='span' textAlign='left'>
                - {bags}
              </Text>
            </ListItem>
            <ListItem
              d='flex'
              justifyContent='space-between'
              alignItems='center'
              py={1}
            >
              <Text color='gray.500'>Yeild conditions</Text>
              <Text as='span' textAlign='left'>
                - {condition}
              </Text>
            </ListItem>
          </List>
        </Flex>

        {quantity && (
          <Flex align='center' justify='space-between' mt={6}>
            <Box>
              <Button
                btntitle='View auditor report'
                rounded='30px'
                h={12}
                w={40}
                shadow='none'
                bg='white'
                borderWidth={1}
                borderColor='cf.400'
                color='cf.400'
                _hover={{ bg: 'white' }}
              />
            </Box>
            <Box>
              <Button btntitle='Sell produce' rounded='30px' h={12} w={40} />
            </Box>
          </Flex>
        )}

        {!quantity && (
          <Flex align='center' justify='center' mt={6}>
            <Button
              btntitle='sold'
              bg='gray.400'
              color='gray.100'
              cursor='not-allowed'
              _hover={{ bg: 'gray.400' }}
              _action={{ bg: 'gray.400' }}
              rounded='30px'
              shadow='none'
              h={12}
              w={56}
            />
          </Flex>
        )}
      </Box>
    </Box>
  </Flex>
)

WarehouseCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  buttontitle: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  bags: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  mr: PropTypes.any,
  ml: PropTypes.any,
  status: PropTypes.string,
  orderStatus: PropTypes.any
}

export default WarehouseCard
