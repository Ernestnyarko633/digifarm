import { Grid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Updates as FarmUpdates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates({ scheduledTasks, error }) {
  return (
    <React.Fragment>
      <Grid gap={8} mb={8}>
        {scheduledTasks &&
          scheduledTasks?.map(task => (
            <FarmUpdateCard
              key={task._id}
              title='FARM MANAGER UPDATES'
              duration={`${task?.taskId.duration} h`}
              subtitle={`${task?.taskId.name}`}
              text={task?.comments.replace(/<[^>]*>/g, '')}
              icon={FarmUpdates}
            />
          ))}
      </Grid>
      {scheduledTasks?.length === 0 && (
        <Flex w='100%' justify='center' align='center'>
          <Text w='100%' fontSize='xl' color='cf.400'>
            NO UPDATES CURRENTLY AVAILABLE
          </Text>
        </Flex>
      )}
    </React.Fragment>
  )
}
Updates.propTypes = {
  scheduledTasks: PropTypes.any,
  error: PropTypes.any
}
