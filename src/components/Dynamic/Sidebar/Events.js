import { Grid } from '@chakra-ui/react'
import React from 'react'
import { BiTime } from 'react-icons/bi'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Events() {
  return (
    <Grid gap={8} mb={8}>
      <FarmUpdateCard
        title='TODAY’S TASK'
        duration='3m ago'
        subtitle='Harrowing'
        text='Can you imagine what we will be downloading in another twenty years?'
        icon={BiTime}
      />
    </Grid>
  )
}
