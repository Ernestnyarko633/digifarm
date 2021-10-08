import React from 'react'
import PropTypes from 'prop-types'

import Individual from './Individual'
import useFarm from 'context/farm'
//import Cooperative from './Cooperative'

const components = {
  compA: Individual
  // compB: Cooperative
}

const DynamicDocument = ({ document, digitalFarmerFarm }) => {
  const SelectedCard = components[document]
  const {
    tasks,
    ScheduledTasks,
    farmFeeds: farmfeeds,
    myFarmActivities: activities,
    farmFeedsHasError,
    ScheduledTasksHasError,
    myFarmActivitiesHasError,
    tasksHasError,
    farmFeedsIsLoading,
    ScheduledTasksIsLoading,
    myFarmActivitiesIsLoading,
    tasksIsLoading
  } = useFarm()
  return (
    <SelectedCard
      digitalFarmerFarm={digitalFarmerFarm}
      ScheduledTasks={ScheduledTasks}
      activities={activities}
      tasks={tasks}
      farmfeeds={farmfeeds}
      viewDoc={true}
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
    />
  )
}

DynamicDocument.propTypes = {
  document: PropTypes.string.isRequired,
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

export default DynamicDocument
