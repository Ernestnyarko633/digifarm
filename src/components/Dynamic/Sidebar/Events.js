import { Grid } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { BiTime } from 'react-icons/bi'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Events({ scheduledTasks, error }) {
  return (
    <Grid gap={8} mb={8}>
      {scheduledTasks &&
        scheduledTasks?.map(task => (
          <FarmUpdateCard
            key={task._id}
            title='TODAY’S TASK'
            duration={`${task?.taskId.duration} h`}
            subtitle={`${task?.taskId.name}`}
            text={`${task?.description.replace(/<[^>]*>/g, '')}`}
            icon={BiTime}
          />
        ))}
    </Grid>
  )
}

Events.propTypes = {
  scheduledTasks: PropTypes.any,
  error: PropTypes.any
}
