import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import ArrowButton from 'components/Button/ArrowButton'
import React from 'react'
import FarmCard from './FarmCard'

const OrdersCard = () => {
  const [state, setState] = React.useState('current')

  return (
    <Box p={20}>
      <Box mb={10}>
        <Heading as='h4' fontSize={{ md: '2xl' }} mb={6}>
          Here’s how your farm(s) are doing
        </Heading>
        <Grid templateColumns={{ md: '70% 20%' }} gap={{ md: '10%' }}>
          <Flex
            align='center'
            borderBottomWidth={1}
            borderBottomColor='gray.200'
          >
            <Box
              color={state === 'current' ? 'cf.400' : 'gray.700'}
              onClick={() => setState('current')}
              fontWeight={state === 'current' ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === 'current' && 2}
              borderBottomColor='cf.400'
              pb={3}
            >
              Current farms
            </Box>
            <Box mx={10} />
            <Box
              color={state === 'orders' ? 'cf.400' : 'gray.700'}
              onClick={() => setState('orders')}
              fontWeight={state === 'orders' ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === 'orders' && 2}
              borderBottomColor='cf.400'
              pb={3}
            >
              Orders
            </Box>
          </Flex>

          <Box>
            <ArrowButton />
          </Box>
        </Grid>
      </Box>

      <Box>
        {state === 'current' && (
          <Flex>
            <FarmCard />
          </Flex>
        )}
        {state === 'orders' && (
          <Flex>
            <FarmCard />
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default OrdersCard
