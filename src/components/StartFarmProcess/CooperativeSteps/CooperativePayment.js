import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Grid, GridItem, Divider } from '@chakra-ui/react'
import Tazapay from 'assets/images/taz.svg'
import { motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'

import PayOption from 'components/Cards/PayOption'

import Constants from 'constant'
import Support from 'components/Support'
import { Avatar } from '@chakra-ui/avatar'
import { Text } from '@chakra-ui/layout'
import CropItemInfo from './CropItemInfo'
import { QuestionIcon } from '@chakra-ui/icons'
import { FirstLettersToUpperCase, getFormattedMoney } from 'helpers/misc'
import { useQuery } from 'react-query'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'

const MotionGrid = motion(Grid)

const CooperativePayment = ({ farm, asMember }) => {
  const { getCooperativeById } = useApi()
  const {
    order,
    paymentOption,
    coopImg,
    setPaymentOption,
    cooperative,
    convertedAmount,
    PAYSTACK_LIMIT
  } = useStartFarm()

  const { data, isLoading, error, refetch } = useQuery(
    [
      `welcome_to_coop_${asMember?.cooperative?._id || cooperative?._id}`,
      asMember?.cooperative?._id || cooperative?._id
    ],
    (asMember?.cooperative?._id || cooperative?._id) &&
      getCooperativeById(asMember?.cooperative?._id || cooperative?._id)
  )

  const triggerReload = () => refetch()
  return (
    <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem overflowY='hidden'>
        <Box p={{ base: 8, md: 6 }}>
          <Box rounded='lg' p={4} bg='#F2F6F6'>
            <Flex align='center' justify='space-between'>
              <Flex align='center'>
                <Avatar
                  src={
                    coopImg
                      ? URL.createObjectURL(coopImg)
                      : require('../../../assets/images/user-avatar.png')
                          .default
                  }
                  size='lg'
                />
                <Box ml={2}>
                  <Text fontWeight={700} fontSize={{ md: 'xl' }}>
                    {cooperative?.name || asMember?.cooperative?.name}
                  </Text>
                  {isLoading || error ? (
                    <FetchCard
                      loading={isLoading}
                      error={error}
                      reload={() => triggerReload()}
                    />
                  ) : (
                    <Text mt={-1} fontSize='sm' color='gray.500'>
                      created by{' '}
                      {data?.data?.users[0]?.info?.firstName +
                        data?.data?.users[0]?.info?.lastName}
                    </Text>
                  )}
                </Box>
              </Flex>

              <Box>
                <Text color='gray.400' fontSize='sm'>
                  Cooperative Type
                </Text>
                <Text fontWeight={700} textAlign='right'>
                  {FirstLettersToUpperCase(cooperative?.type?.name) ||
                    FirstLettersToUpperCase(asMember?.cooperative?.type?.name)}
                </Text>
              </Box>
            </Flex>
            <Divider orientation='horizontal' my={4} />
            <CropItemInfo farm={farm} order={order} />
          </Box>

          <Divider orientation='horizontal' mt={8} mb={3} />

          <Box as='table' mb={6} w={{ base: 80, md: '100%' }}>
            <Box as='tbody'>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' pb={2}>
                  <Flex direction='column'>
                    <Text fontSize='md' color='gray.500'>
                      Acreage assigned
                    </Text>
                  </Flex>
                  <Text fontWeight={900}>{order?.acreage}</Text>
                </Flex>
              </Box>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' py={2}>
                  <Flex align='center'>
                    <Text mr={2} color='gray.500'>
                      Unit Amount
                    </Text>
                  </Flex>
                  <Text fontWeight={900}>
                    $ {farm?.pricePerAcre || order?.product?.pricePerAcre}
                  </Text>
                </Flex>
              </Box>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' py={2}>
                  <Flex align='center'>
                    <Text mr={2} color='gray.500'>
                      Discount
                    </Text>
                  </Flex>
                  <Text fontWeight={900}>
                    {cooperative?.type?.discount * 100 ||
                      asMember?.cooperative?.type?.discount * 100}
                    %
                  </Text>
                </Flex>
              </Box>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' py={2}>
                  <Flex align='center' mr={2}>
                    <Text mr={2} color='gray.500'>
                      Management Fee
                    </Text>
                    <QuestionIcon color='cf.green' />
                  </Flex>
                  <Text fontWeight={900}>Inclusive</Text>
                </Flex>
              </Box>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' py={2}>
                  <Text mr={2} color='gray.500'>
                    VAT
                  </Text>
                  <Text fontWeight={900}>Inclusive</Text>
                </Flex>
              </Box>
              <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
                <Flex as='td' align='center' justify='space-between' py={2}>
                  <Text fontWeight={500} mr={2}>
                    Total
                  </Text>
                  <Flex direction='column' textAlign='right'>
                    <Text fontWeight={900}>
                      $ {getFormattedMoney(order?.cost)}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Box>

          <Box>
            <Support />
          </Box>
        </Box>
      </GridItem>
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.200'
        overflowY='scroll'
        p={{ base: 4, md: 10 }}
        css={{
          direction: 'ltr',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
      >
        <Box css={{ direction: 'ltr' }} p={8}>
          <Flex direction='column' align={{ base: 'center', md: 'initial' }}>
            <Heading as='h6' fontSize='xl' ml={{ md: 5 }}>
              Choose your payment Option
            </Heading>
            {convertedAmount < PAYSTACK_LIMIT && (
              <PayOption
                leftImage='mastercard'
                rightImage='visa'
                height={4}
                title='Card'
                theme='For card payments'
                description='Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in.'
                notice='All transactions are charged a transaction fee of'
                extraCharge='1.95%'
                selected={paymentOption === Constants.paymentOptions[0]}
                onClick={() => setPaymentOption(Constants.paymentOptions[0])}
              />
            )}
            <PayOption
              support
              // filter='grayScale(100%)'
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
                  // e.preventDefault() &&
                  setPaymentOption(Constants.paymentOptions[1])
                )
              }}
            />
            <PayOption
              leftImage='bank'
              rightImage='transaction'
              height={6}
              title='Bank Payment'
              theme='For bank payment'
              description='Please note that bank transfer will take at most 2 weeks before money is transferred'
              notice='Contact support for any help'
              selected={paymentOption === Constants.paymentOptions[2]}
              onClick={() => setPaymentOption(Constants.paymentOptions[2])}
              dropDown
            />
          </Flex>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

CooperativePayment.propTypes = {
  farm: PropTypes.object.isRequired,
  asMember: PropTypes.object.isRequired
}

export default CooperativePayment
