import { Grid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { BiTime } from 'react-icons/bi'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Events({ scheduledTasks, error }) {
  return (
    <React.Fragment>
      {!error && scheduledTasks && (
        <Grid gap={8} mb={8}>
          {scheduledTasks?.length > 0 &&
            !error &&
            scheduledTasks?.map(task => (
              <FarmUpdateCard
                key={task._id}
                title='SCHEDULED TASK'
                duration={`${task?.task?.duration} h`}
                subtitle={`${task?.task?.title}`}
                text={`${task?.description.replace(/<[^>]*>/g, '')}`}
                icon={BiTime}
              />
            ))}
        </Grid>
      )}
      {scheduledTasks?.length === 0 && (
        <Flex w='100%' justify='center' align='center'>
          <Text w='100%' color='cf.400' fontSize='xl'>
            NO SCHEDULED EVENTS CURRENTLY AVAILABLE
          </Text>
        </Flex>
      )}
    </React.Fragment>
  )
}

Events.propTypes = {
  scheduledTasks: PropTypes.any,
  error: PropTypes.any
}
