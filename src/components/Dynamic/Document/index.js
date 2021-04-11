import React from 'react'
import PropTypes from 'prop-types'

import Individual from './Individual'
//import Cooperative from './Cooperative'

const components = {
  compA: Individual
  // compB: Cooperative
}

const DynamicDocument = ({
  document,
  digitalFarmerFarm,
  activities,
  farmfeeds,
  ScheduledTasks,
  tasks
}) => {
  const SelectedCard = components[document]
  return (
    <SelectedCard
      digitalFarmerFarm={digitalFarmerFarm}
      ScheduledTasks={ScheduledTasks}
      activities={activities}
      tasks={tasks}
      farmfeeds={farmfeeds}
      viewDoc={true}
    />
  )
}

DynamicDocument.propTypes = {
  document: PropTypes.string.isRequired,
  digitalFarmerFarm: PropTypes.any,
  activities: PropTypes.any,
  tasks: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any
}

export default DynamicDocument
