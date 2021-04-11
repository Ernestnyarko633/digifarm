import React from 'react'
import PropTypes from 'prop-types'

import { QuestionIcon } from '@chakra-ui/icons'
import { Heading, Text, Box, Flex } from '@chakra-ui/react'
import { getFormattedMoney } from 'helpers/misc'

const FarmInfo = ({
  order,
  farm,
  currency,
  rate = 1,
  width = 108,
  margin = 4
}) => {
  const getDiscount = () => {
    // if discount exist then apply discount to cost
    if (order?.product?.discounts) {
      // get discounts user may qualify for
      const discounts = order?.product?.farm?.discounts.filter(
        ({ point }) => point <= order?.product?.order?.acreage
      )
      // get highest discount user qualified for
      if (discounts?.length) {
        const discountQualifiedFor = discounts.reduce((a, b) =>
          a.point > b.point ? a : b
        ).percent

        return `${100 - 100 * (1 - discountQualifiedFor)}% off`
      }
      return null
    }
    return null
  }

  return (
    <Box as='table' w={{ base: 82, md: width }} m={margin}>
      <Box as='tbody'>
        <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
          <Flex as='td' align='center' justify='space-between' pb={2}>
            <Flex direction='column'>
              <Heading as='h3' fontSize='xl' textTransform='uppercase'>
                {order?.product?.cropVariety?.crop?.name || farm?.name}
              </Heading>
              <Text as='span' fontSize='xs' textColor='gray.500'>
                ({order?.product?.cropVariety?.name || farm?.cropVariety?.name})
                #{order?.product?.name || farm?.name}
              </Text>
            </Flex>
            <Text>
              {currency?.currencySymbol}
              {getFormattedMoney(
                order?.product?.pricePerAcre || farm?.pricePerAcre * rate
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
              {getDiscount() && (
                <Text
                  mb={-1}
                  as='span'
                  fontSize='tiny'
                  textColor='cf.400'
                  textDecor='line-through'
                >
                  {getDiscount()}
                </Text>
              )}
              <Text fontWeight={700}>
                {currency?.currencySymbol}
                {getFormattedMoney(order?.cost * rate)}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

FarmInfo.propTypes = {
  width: PropTypes.any,
  margin: PropTypes.any,
  rate: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  farm: PropTypes.object.isRequired
}

export default FarmInfo
