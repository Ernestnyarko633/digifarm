import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Grid, GridItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'

import FarmInfo from 'components/Cards/FarmInfo'
import PayOption from 'components/Cards/PayOption'

import Constants from 'constant'
import Support from 'components/Support'
import Tazapay from 'assets/images/taz.svg'

const MotionGrid = motion(Grid)

const PaymentOption = ({ farm }) => {
  const {
    order,
    currency,
    exchangeRate,
    paymentOption,
    setPaymentOption,
    convertedAmount,
    PAYSTACK_LIMIT
  } = useStartFarm()

  return (
    <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem p={{ base: 4, md: 10 }}>
        <Box>
          <FarmInfo
            farm={farm}
            order={order}
            currency={currency}
            rate={exchangeRate}
          />
        </Box>

        <Box>
          <Support />
        </Box>
      </GridItem>
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.200'
        overflowY='scroll'
        p={{ base: 4, md: 10 }}
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        <Box css={{ direction: 'ltr' }}>
          <Flex direction='column' align={{ base: 'center', md: 'initial' }}>
            <Heading as='h6' fontSize='xl' ml={{ md: 5 }}>
              Choose your payment Option
            </Heading>
            <PayOption
              leftImage='bank'
              rightImage='transaction'
              height={6}
              title='Bank Payment'
              theme='For bank payment'
              description='Please note that bank transfer will take at most 2 weeks before money is transferred'
              notice='Contact support for any help'
              selected={paymentOption === Constants.paymentOptions[2]}
              onClick={e => {
                return (
                  e.preventDefault() &&
                  setPaymentOption(Constants.paymentOptions[2])
                )
              }}
              dropDown
            />
            {convertedAmount < PAYSTACK_LIMIT && (
              <PayOption
                filter='grayScale(100%)'
                leftImage='mastercard'
                rightImage='visa'
                height={4}
                title='Card'
                theme='For card payments'
                description='Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in.'
                notice='All transactions are charged a transaction fee of'
                extraCharge='1.95%'
                selected={paymentOption === Constants.paymentOptions[0]}
                onClick={e => {
                  return (
                    e.preventDefault() &&
                    setPaymentOption(Constants.paymentOptions[0])
                  )
                }}
              />
            )}
            <PayOption
              support
              filter='grayScale(100%)'
              leftImage='tazapay'
              rightImage='zpay'
              LeftPicture={Tazapay}
              height={4}
              title='Escrow'
              theme='For escrow payments'
              description='Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in.'
              selected={paymentOption === Constants.paymentOptions[1]}
              onClick={e => {
                return (
                  e.preventDefault() &&
                  setPaymentOption(Constants.paymentOptions[1])
                )
              }}
            />
          </Flex>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

PaymentOption.propTypes = {
  farm: PropTypes.object.isRequired
}

export default PaymentOption
