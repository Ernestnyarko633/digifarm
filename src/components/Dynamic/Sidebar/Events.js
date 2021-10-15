import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { BiTime } from 'react-icons/bi'
import FetchCard from 'components/FetchCard'
import FarmUpdateCard from '../Cards/FarmUpdateCard'
import { Status } from 'helpers/misc'
import useFarm from 'context/farm'

export default function Events() {
  const {
    ScheduledTasks: scheduledTasks,
    ScheduledTasksHasError,
    ScheduledTasksIsLoading,
    triggerScheduledTasksReload
  } = useFarm()

  const sortedScheduledTasks = scheduledTasks
    ?.slice()
    ?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    ?.filter(task => task.status !== Status.COMPLETED)
    ?.filter(
      (task, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(task)
        ) === index
    )
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
            reload={() => triggerScheduledTasksReload()}
            loading={ScheduledTasksIsLoading}
            error={ScheduledTasksHasError}
            text={"Standby as we load your farm's scheduled tasks"}
          />
        </Box>
      ) : (
        <>
          <Grid gap={8} mx={8} my={8}>
            {sortedScheduledTasks?.length > 0 &&
              sortedScheduledTasks?.map(task => (
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
          {sortedScheduledTasks?.length === 0 && (
            <Flex w='100%' justify='center' align='center'>
              <Text w='100%' color='cf.green' fontSize='xl' textAlign='center'>
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
  ScheduledTasksIsLoading: PropTypes.bool,
  reloads: PropTypes.array
}
