import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import ArrowButton from 'components/Button/ArrowButton'
import CooperativeFarmCard from 'components/Cards/CooperativeFarmCard'
import React from 'react'

const Cooperative = () => {
  const [state, setState] = React.useState('current')

  return (
    <Box p={20}>
      <Box mb={10}>
        <Heading as='h4' fontSize={{ md: '2xl' }} mb={6}>
          Your current cooperative farm(s)
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
          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={{ md: 12 }}>
            <CooperativeFarmCard />
          </Grid>
        )}
        {state === 'orders' && (
          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={{ md: 12 }}>
            <CooperativeFarmCard />
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default Cooperative
