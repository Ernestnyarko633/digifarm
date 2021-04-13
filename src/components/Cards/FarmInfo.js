import React from 'react'
import PropTypes from 'prop-types'

import { QuestionIcon } from '@chakra-ui/icons'
import { Heading, Text, Box, Flex } from '@chakra-ui/react'
import { getFormattedMoney } from 'helpers/misc' // getDiscount

const FarmInfo = ({ farm, order, width = 108, margin = 4 }) => {
  // const discount = getDiscount(
  //   order?.product?.discounts || farm?.discounts,
  //   order?.acreage || acreage
  // )

  return (
    <Box mb={{ md: 20 }}>
      <Box as='table' w={{ base: 82, md: width }} m={margin}>
        <Box as='tbody'>
          <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
            <Flex as='td' align='center' justify='space-between' pb={2}>
              <Flex direction='column'>
                <Heading as='h3' fontSize='xl' textTransform='uppercase'>
                  {order?.product?.cropVariety?.crop?.name ||
                    farm?.cropVariety?.crop?.name}
                </Heading>
                <Text as='span' fontSize='xs' textColor='gray.500'>
                  (
                  {order?.product?.cropVariety?.name || farm?.cropVariety?.name}
                  ) #{order?.product?.name || farm?.name}
                </Text>
              </Flex>
              <Text>
                $
                {getFormattedMoney(
                  order?.product?.pricePerAcre || farm?.pricePerAcre
                )}
                /acre
              </Text>
            </Flex>
          </Box>
          <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
            <Flex as='td' align='center' justify='space-between' py={2}>
              <Flex align='center'>
                <Text mr={2} color='gray.600'>
                  Management Fee
                </Text>
                <QuestionIcon color='cf.400' />
              </Flex>
              <Text>Inclusive</Text>
            </Flex>
          </Box>
          <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
            <Flex as='td' align='center' justify='space-between' py={2}>
              <Text mr={2} color='gray.600'>
                VAT
              </Text>
              <Text>Inclusive</Text>
            </Flex>
          </Box>
          <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
            <Flex as='td' align='center' justify='space-between' py={2}>
              <Text fontWeight={500} mr={2}>
                Total
              </Text>
              <Flex direction='column' textAlign='right'>
                {/* {discount && (
                  <Text
                    mb={-1}
                    as='span'
                    fontSize='tiny'
                    textColor='cf.400'
                    textDecor='line-through'
                  >
                    {discount}
                  </Text>
                )} */}
                <Text fontWeight={700}>${getFormattedMoney(order?.cost)}</Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

FarmInfo.propTypes = {
  width: PropTypes.any,
  margin: PropTypes.any,
  order: PropTypes.object.isRequired,
  farm: PropTypes.object
}

export default FarmInfo
