/* eslint-disable*/
import { Grid } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Updates as FarmUpdates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates({ scheduledTasks }) {
  return (
    <Grid gap={8} mb={8}>
        {scheduledTasks?.map((task) => 

<FarmUpdateCard
  title='FARM MANAGER UPDATES'
  duration={`${task?.taskId.duration} h`}
  subtitle={`${task?.taskId.name}`}
  text={task?.comments.replace(/<[^>]*>/g, '')}
  icon={FarmUpdates}
/>
) }

    </Grid>
  )
}
Updates.propTypes = {
  scheduledTasks: PropTypes.any
}
