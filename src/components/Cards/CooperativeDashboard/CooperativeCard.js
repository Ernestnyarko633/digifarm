import React from 'react'
import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import { BiCreditCard } from 'react-icons/bi'
import useAuth from 'context/auth'

import { getFormattedMoney } from 'helpers/misc'

const CooperativeCard = ({ item, orderType, data }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  // eslint-disable-next-line no-console
  //   console.log('item', item)
  // eslint-disable-next-line no-console
  //   console.log('data', data)
  return (
    <Box borderWidth={1} borderColor='gray.300' rounded='8px' my={4}>
      <Flex p={3}>
        <Avatar
          name={item?.info?.firstName || item?.info?.avatar || 'Annonymous'}
          src={item?.info?.avatar}
          size='md'
        />
        <Box pl='12px' pt={1}>
          <Flex>
            <Text fontSize='16px' fontWeight='semibold'>
              {item?.info?.firstName
                ? `${item?.info?.firstName + ' ' + item?.info?.lastName}`
                : 'Annonymous'}
            </Text>
            {data?.users[0]?.email === item?.email && (
              <Box ml={6}>
                <Text
                  fontSize={10}
                  textAlign='center'
                  // color='#004C46'
                  color='green.300'
                  mt={1}
                >
                  Admin
                </Text>
              </Box>
            )}
          </Flex>
          <Text fontSize='12px' color='gray.600'>
            {item?.info?.email || item?.email}
          </Text>
        </Box>
        {item?.status === 'PAID' || orderType?.length > 0 ? null : (
          <>
            {item?.email === user?.email && (
              <Button
                btntitle='Pay'
                colorScheme='linear'
                width='70px'
                py='10px'
                leftIcon={<BiCreditCard size={20} />}
                //   onClick={() => {
                //     handleModalClick('payment')
                //   }}
                ml={12}
                my={2}
              />
            )}
          </>
        )}
      </Flex>
      <Divider />
      <Flex justify='space-between' p={3} color='gray.500'>
        <Text>
          Acres assigned{' '}
          <Text color='black' as='span'>
            {item?.acreage}
          </Text>
        </Text>
        <Text>
          Cost{' '}
          <Text color='black' as='span'>
            {getFormattedMoney(
              item?.acreage * item?.product?.pricePerAcre * item?.type?.discount
            )}
          </Text>
        </Text>
      </Flex>
      <Divider />
      <Box w='100%' p={3}>
        {item?.status === 'PAID' ? (
          <Box bg='#D6F2D5' rounded='4px'>
            <Text fontSize='14px' color='#004C46' textAlign='center' py='4px'>
              {item?.status}
            </Text>
          </Box>
        ) : (
          <Box bg='#F2F2F2' rounded='4px'>
            <Text fontSize='14px' color='#828282' textAlign='center' py='4px'>
              {item?.status}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

CooperativeCard.propTypes = {
  item: PropTypes.any,
  orderType: PropTypes.any,
  data: PropTypes.any
}
export default CooperativeCard
