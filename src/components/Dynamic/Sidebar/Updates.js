import { Grid } from '@chakra-ui/react'
import React from 'react'
import { Updates as FarmUpdates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates() {
  return (
    <Grid gap={8} mb={8}>
      <FarmUpdateCard
        title='FARM MANAGER UPDATE'
        duration='3m ago'
        subtitle='Harrowing'
        text='Can you imagine what we will be downloading in another twenty years?'
        icon={FarmUpdates}
      />
    </Grid>
  )
}
