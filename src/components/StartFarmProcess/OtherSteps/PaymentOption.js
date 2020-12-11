import React from 'react'
import {
  Box,
  Flex,
  Image,
  Heading,
  Icon,
  Text,
  Grid,
  GridItem
} from '@chakra-ui/react'
import FarmInfo from 'components/Cards/FarmInfo'
import { Support, Schedule, Update } from 'theme/Icons'
import PayOption from 'components/Cards/PayOption'
import { useMutation } from 'react-query'
import useAPI from 'context/apiContext'
import visa from '../../../assets/images/visa.png'
import ginger from '../../../assets/images/ginger.png'
import { motion } from 'framer-motion'

const MotionGrid = motion.custom(Grid)

const PaymentOption = () => {
  const { payment } = useAPI()

  const [cardData] = React.useState({
    amount          : 100,
    purpose         : 'FARM_PURCHASE',
    order_id        : '5fbba7e2dd7f2d24059ffca2',
    transaction_type: 'CARD',
  })

  const [mutate] = useMutation(payment)

  const paymentlick = async () => {
    try {
      const res = await mutate(cardData)
      // console.log('result', res);
      window.location.assign(res?.url)
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <MotionGrid layout templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem p={{ md: 10 }}>
        <Box py={{ md: 10 }} m={8}>
          <Image src={ginger} alt='ginger' />
        </Box>

        <Flex align='center' justify='space-between' mt={{ md: 20 }}>
          <Box textAlign='center' w={{ md: '100%' }} px={8}>
            <Heading as='h6' fontSize='md' mb={3}>
              What is included in this farm
            </Heading>
            <Flex justify='space-between' align='center' fontSize='sm'>
              <Flex align='center'>
                <Icon as={Update} color='cf.400' boxSize={5} />
                <Text ml={1}>Farm Updates</Text>
              </Flex>
              <Flex align='center'>
                <Icon as={Support} color='cf.400' boxSize={5} />
                <Text ml={1}>Support</Text>
              </Flex>
              <Flex align='center'>
                <Icon as={Schedule} color='cf.400' boxSize={5} />
                <Text ml={1}>Scheduled Farm Visits</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
      <GridItem borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        p={{ md: 10 }}
        css={{
          direction     : 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth',
        }}>
        <Box css={{ direction: 'ltr' }}>
          <Flex direction='column'>
            <Heading as='h6' fontSize='xl' ml={5}>
              Choose your payment Option
            </Heading>
            <PayOption icon={visa}
              title='Card'
              theme='For card payments'
              description='Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in.'
              notice='All transactions are charged a transaction fee of'
              percent='1.95%'
              onClick={paymentlick} />
            <PayOption icon={visa}
              title='Bank Payment'
              theme='For bank payment'
              description='Please note that bank transfer will take at most 2 weeks before money is transferred'
              notice='Contact support for any help'
              dropDown />
          </Flex>

          <FarmInfo />
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

export default PaymentOption
