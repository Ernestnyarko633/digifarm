import { Grid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { BiTime } from 'react-icons/bi'
import FetchCard from 'components/FetchCard'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import { Box } from '@chakra-ui/react'
export default function Events({
  scheduledTasks,
  ScheduledTasksHasError,
  ScheduledTasksIsLoading
}) {
  return (
    <>
      {ScheduledTasksIsLoading || ScheduledTasksHasError ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => null}
            loading={ScheduledTasksIsLoading}
            error={ScheduledTasksHasError}
            text={"Standby as we load your farm's scheduled tasks"}
          />
        </Box>
      ) : (
        <>
          <Grid gap={8} mb={8}>
            {scheduledTasks?.length > 0 &&
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
          {scheduledTasks?.length === 0 && (
            <Flex w='100%' justify='center' align='center'>
              <Text
                w='100%'
                color='cf.400'
                fontSize='xl'
                textAlign={{ base: 'center', md: 'initial' }}
              >
                No scheduled events currently available.
              </Text>
            </Flex>
          )}
        </>
      )}
    </>
  )
}

Events.propTypes = {
  scheduledTasks: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  ScheduledTasksIsLoading: PropTypes.bool
}
