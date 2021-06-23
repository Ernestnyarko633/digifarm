import React from 'react'
import { Avatar, Box, Divider, Flex, Text, Tooltip } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import useAuth from 'context/auth'

import { getFormattedMoney } from 'helpers/misc'
import TableMenu from './TableMenu'
import { InfoIcon } from '@chakra-ui/icons'

const CooperativeCard = ({ item, order, data, handleClick }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { acreage } = item
  const {
    type: { discount },
    product: { pricePerAcre }
  } = data

  const calculateCost = (acreage_, pricePerAcre_, discount_) => {
    let cost = 0
    let price = 0

    price = pricePerAcre_ - pricePerAcre_ * discount_
    cost = price * acreage_

    return cost
  }
  return (
    <Box borderWidth={1} borderColor='gray.300' rounded='8px' my={4}>
      <Flex p={3}>
        <Avatar
          name={item?.info?.firstName || item?.info?.avatar || 'Annonymous'}
          src={item?.info?.avatar}
          size='sm'
          mt={2}
        />
        <Box pl='12px' pt={1}>
          <Flex>
            <Text fontSize='14px' fontWeight='bold' lineHeight='18px'>
              {item?.info?.firstName
                ? `${item?.info?.firstName + ' ' + item?.info?.lastName}`
                : 'Annonymous'}
            </Text>

            {data?.users[0]?.email === item?.email && (
              <Box bg='#D6F2D5' rounded='4px' ml='7px' h='20px'>
                <Text
                  fontSize='10px'
                  textAlign='center'
                  color='#004C46'
                  px='5px'
                  pt='2px'
                >
                  Admin
                </Text>
              </Box>
            )}

            {!item?.info?.firstName && (
              <Tooltip
                hasArrow
                label='Member has not accepted invitation'
                fontSize='12px'
                bg='#022D2B'
                placement='top'
              >
                <InfoIcon color='#31BC2E' mt='2px' ml={1} />
              </Tooltip>
            )}

            {user?.email === data?.users[0].email &&
              item.email !== user?.email &&
              !item.id && (
                <Box mt={-1} ml={16} pos='relative'>
                  <TableMenu id={data._id} email={item.email} />
                </Box>
              )}
          </Flex>
          <Text fontSize='12px' color='gray.600'>
            {item?.info?.email || item?.email}
          </Text>
        </Box>
        {item?.status === 'PAID' || order?.status === 'PROCESSING' ? null : (
          <>
            {item?.email === user?.email && (
              <Button
                btntitle='Pay'
                colorScheme='linear'
                width='60px'
                h='35px'
                fontSize='14px'
                py='10px'
                onClick={handleClick}
                ml={6}
                my={1}
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
            ${getFormattedMoney(calculateCost(acreage, pricePerAcre, discount))}
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
  order: PropTypes.any,
  data: PropTypes.any,
  handleClick: PropTypes.any
}
export default CooperativeCard
