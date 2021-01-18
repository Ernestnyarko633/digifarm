import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Grid, Heading } from '@chakra-ui/react'

import ArrowButton from 'components/Button/ArrowButton'
import FarmCard from 'components/Cards/FarmCard'
// import OrderCard from './OrderCard'

const FarmOrderSection = ({ farms, orders }) => {
  const [state, setState] = React.useState('farms')
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
              color={state === 'farms' ? 'cf.400' : 'gray.700'}
              onClick={() => setState('farms')}
              fontWeight={state === 'farms' ? 'bold' : 'normal'}
              cursor='pointer'
              borderBottomWidth={state === 'farms' && 2}
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
        <Flex>
          {state === 'farms' && <FarmCard data={farms} />}
          {state === 'orders' && <FarmCard data={orders} />}
        </Flex>
      </Box>
    </Box>
  )
}

FarmOrderSection.propTypes = {
  farms: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired
}

export default FarmOrderSection
