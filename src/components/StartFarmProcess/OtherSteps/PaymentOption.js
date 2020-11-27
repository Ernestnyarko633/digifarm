import React from 'react';
import {
  Box,
  Flex,
  Image,
  Heading,
  Icon,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/core';
import ginger from '../../../assets/images/startfarm/ginger.png';
import FarmInfo from 'components/Cards/FarmInfo';
import { Support, Schedule, Update } from 'theme/Icons';
import PayOption from 'components/Cards/PayOption';
import visa from '../../../assets/images/startfarm/visa.png';
import { useMutation, useQueryCache } from 'react-query';
import useAPI from 'context/apiContext';

const PaymentOption = () => {
  const { payment } = useAPI();
  const queryCache = useQueryCache();

  const [cardData, setCardData] = React.useState({
    orderId: '5225013d1c4b4034',
    amount: 750.5,
    purpose: 'FARM_PURCHASE',
    transaction_type: 'CARD',
  });

  const [mutate] = useMutation(payment);

  const paymentlick = async () => {
    try {
      const res = await mutate(cardData);
      console.log('result', res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem p={{ md: 10 }}>
        <Box py={{ md: 10 }} m={8}>
          <Image src={ginger} alt='ginger' />
        </Box>

        <Flex align='center' justify='space-between' mt={{ md: 20 }}>
          <Box textAlign='center' w={{ md: '100%' }} px={8}>
            <Heading as='h6' fontSize='md'>
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
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        p={{ md: 10 }}
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth',
        }}
      >
        <Box css={{ direction: 'ltr' }}>
          <Flex direction='column'>
            <Heading as='h6' fontSize='2xl' ml={5}>
              Choose your payment Option
            </Heading>
            <PayOption
              icon={visa}
              title='Card'
              theme='For card payments'
              description='Stated USD prices are converted to Ghana cedis equivalent to the current exchange rate and payments it is processed in.'
              notice='All transactions are charged a transaction fee of'
              percent='1.95%'
              onClick={paymentlick}
            />
            <PayOption
              icon={visa}
              title='Bank Payment'
              theme='For bank payment'
              description='Please note that bank transfer will take at most 2 weeks before money is transferred'
              notice='Contact support for any help'
              dropDown
            />
          </Flex>

          <FarmInfo />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PaymentOption;
