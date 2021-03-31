import { Box, Grid } from '@chakra-ui/react'
import ComponentWrapper from 'components/Wrapper/ComponentWrapper'
import CooperativeFarmCard from 'components/Cards/CooperativeFarmCard'
import React from 'react'

const Cooperative = () => {
  const [state, setState] = React.useState('current')

  return (
    <ComponentWrapper
      state={state}
      setState={setState}
      firstStateValue='current'
      secondStateValue='orders'
      firstBoxTitle='Current Farms'
      secondBoxTitle='Orders'
    >
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
    </ComponentWrapper>
  )
}

export default Cooperative
