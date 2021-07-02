import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicDocument from '../Document'
import FarmReceiptCard from '../Cards/FarmReceiptCard'
import { Scrollbars } from 'react-custom-scrollbars-2'

export default function Document({
  digitalFarmerFarm,
  activities,
  tasks,
  ScheduledTasks,
  farmfeeds,
  farmFeedsHasError,
  ScheduledTasksHasError,
  myFarmActivitiesHasError,
  tasksHasError,
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  myFarmActivitiesIsLoading,
  tasksIsLoading,
  reloads
}) {
  let state = 'compA'

  return (
    <Grid
      templateRows={{ md: 'repeat(1 1fr)' }}
      templateColumns={{ md: '70% 30%' }}
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
      px={{ base: 4, md: 0 }}
    >
      <GridItem>
        <Box
          minW={{ lg: '65%' }}
          as='main'
          color='gray.800'
          bg={{ md: 'gray.50' }}
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 36 }}
          px={{ md: 24 }}
          mt={{ base: 36, md: 0 }}
          minH={{ lg: '100vh' }}
        >
          <Box mt={{ md: 10 }}>
            <DynamicDocument
              document={state}
              //data
              activities={activities}
              tasks={tasks}
              ScheduledTasks={ScheduledTasks}
              digitalFarmerFarm={digitalFarmerFarm}
              farmfeeds={farmfeeds}
              //errors
              farmFeedsHasError={farmFeedsHasError}
              ScheduledTasksHasError={ScheduledTasksHasError}
              myFarmActivitiesHasError={myFarmActivitiesHasError}
              tasksHasError={tasksHasError}
              //loading
              farmFeedsIsLoading={farmFeedsIsLoading}
              ScheduledTasksIsLoading={ScheduledTasksIsLoading}
              myFarmActivitiesIsLoading={myFarmActivitiesIsLoading}
              tasksIsLoading={tasksIsLoading}
              reloads={reloads}
            />
          </Box>
        </Box>
      </GridItem>
      <GridItem mt={{ base: 16, md: 0 }} mb={{ base: 32, md: 0 }}>
        <Box
          py={16}
          right={{ md: 0 }}
          bg='white'
          as='rightsidebar'
          bottom={{ md: 0 }}
          pos={{ md: 'fixed' }}
          px={{ md: 8 }}
          h={{ lg: '84vh' }}
          w={{ md: '30%' }}
          shadow={{ md: 'md' }}
          overflowY={{ md: 'hidden' }}
        >
          <Scrollbars style={{ height: '100vh' }}>
            <Grid gap={8} d={{ base: 'block', md: 'grid' }}>
              <React.Fragment>
                <FarmReceiptCard
                  title='Agreement'
                  type='agreement'
                  farm={digitalFarmerFarm}
                />
                <FarmReceiptCard
                  title='Receipt'
                  type='receipt'
                  farm={digitalFarmerFarm}
                />
                <FarmReceiptCard
                  title='Invoice'
                  type='invoice'
                  farm={digitalFarmerFarm}
                />
              </React.Fragment>
            </Grid>
          </Scrollbars>
        </Box>
      </GridItem>
    </Grid>
  )
}

Document.propTypes = {
  digitalFarmerFarm: PropTypes.object,
  activities: PropTypes.array,
  tasks: PropTypes.array,
  ScheduledTasks: PropTypes.array,
  farmfeeds: PropTypes.array,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  myFarmActivitiesHasError: PropTypes.any,
  tasksHasError: PropTypes.any,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  myFarmActivitiesIsLoading: PropTypes.bool,
  tasksIsLoading: PropTypes.bool,
  reloads: PropTypes.array
}
