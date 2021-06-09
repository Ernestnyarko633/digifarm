import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Grid, GridItem, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import useStartFarm from 'context/start-farm'

import PayOption from 'components/Cards/PayOption'

import Constants from 'constant'
import Support from 'components/Support'
import { Avatar } from '@chakra-ui/avatar'
import { Text } from '@chakra-ui/layout'
import CropItemInfo from './CropItemInfo'
import { QuestionIcon } from '@chakra-ui/icons'
import { getFormattedMoney } from 'helpers/misc'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import FetchCard from 'components/FetchCard'

const MotionGrid = motion(Grid)

const CooperativePayment = ({ farm, asMember }) => {
  const [reload, setReload] = React.useState(0)
  const { getCooperativeById } = useApi()
  const { order, paymentOption, coopImg, setPaymentOption, cooperative } =
    useStartFarm()
  const { data, isLoading, error } = useFetch(
    asMember?.cooperative?._id || cooperative?._id
      ? `welcome_to_coop_${asMember?.cooperative?._id || cooperative?._id}`
      : null,
    asMember?.cooperative?._id || cooperative?._id ? getCooperativeById : null,
    asMember?.cooperative?._id || cooperative?._id ? reload : null,
    asMember?.cooperative?._id || cooperative?._id
      ? asMember?.cooperative?._id || cooperative?._id
      : null
  )

  const triggerReload = () => setReload(p => p + 1)

  return (
    <MotionGrid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem p={{ base: 4, md: 6 }} overflowY='scroll'>
        <Box borderWidth={1} rounded='lg' p={4}>
          <Flex align='center' justify='space-between'>
            <Flex align='center'>
              <Avatar
                src={
                  coopImg
                    ? URL.createObjectURL(coopImg)
                    : require('../../../assets/images/user-avatar.png').default
                }
                size='lg'
              />
              <Box ml={2}>
                <Text fontWeight={700} fontSize={{ md: 'xl' }}>
                  {cooperative?.name || asMember?.cooperativeFromMember?.name}
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
                    {data?.users[0]?.info?.firstName +
                      data?.users[0]?.info?.lastName}
                  </Text>
                )}
              </Box>
            </Flex>

            <Box>
              <Text color='gray.400' fontSize='sm'>
                Cooperative Type
              </Text>
              <Text fontWeight={700} textAlign='right'>
                {cooperative?.type?.name?.toUpperCase() ||
                  asMember?.cooperativeFromMember?.type?.name?.toUpperCase()}
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
                    Sub Amount
                  </Text>
                </Flex>
                <Text fontWeight={900}>
                  $ {farm?.pricePerAcre || order?.product?.pricePerAcre}
                </Text>
              </Flex>
            </Box>
            <Box as='tr' borderBottomWidth={2} borderBottomColor='gray.100'>
              <Flex as='td' align='center' justify='space-between' py={2}>
                <Flex align='center' mr={2}>
                  <Text mr={2} color='gray.500'>
                    Management Fee
                  </Text>
                  <QuestionIcon color='cf.800' />
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
            <PayOption
              leftImage='bank'
              rightImage='transaction'
              height={6}
              title='Bank Payment'
              theme='For bank payment'
              description='Please note that bank transfer will take at most 2 weeks before money is transferred'
              notice='Contact support for any help'
              selected={paymentOption === Constants.paymentOptions[1]}
              onClick={() => setPaymentOption(Constants.paymentOptions[1])}
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
