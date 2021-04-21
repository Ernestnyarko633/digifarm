import React from 'react'
import PropTypes from 'prop-types'
//import useExternalApi from 'context/external'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'

const { default: Document } = require('./Farm/Document')
const { default: Farm } = require('./Farm/Farm')
const { default: Gallery } = require('./Farm/Gallery')
const { default: Warehouse } = require('./Farm/Warehouse')

const components = {
  compA: Farm,
  compB: Document,
  compC: Gallery,
  compD: Warehouse
}

const DynamicFarm = ({
  center,
  farm,
  tasks,
  onOpen,
  digitalFarmerFarm,
  ScheduledTasks,
  dateIntervals,
  reloads,
  farmfeeds,
  activities,
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  myFarmActivitiesIsLoading,
  tasksIsLoading,
  location,
  reload,
  farmFeedsHasError,
  ScheduledTasksHasError,
  myFarmActivitiesHasError,
  tasksHasError
}) => {
  // const [type, setType] = useState('/sentinel2')
  const SelectedFarm = components[farm]
  const { eosTask, eosSearch, eosWeather } = useApi()

  const eosViewIdPayload = {
    fields: ['sceneID', 'cloudCoverage'],
    limit: 1,
    page: 1,
    search: {
      date: {
        from: dateIntervals()?.ThirtyDaysAgo,
        to: dateIntervals()?.today
      },
      cloudCoverage: {
        from: 0,
        to: 60
      },
      shape: {
        type: 'Polygon',
        coordinates: [location]
      }
    },
    sort: {
      date: 'desc'
    }
  }

  const {
    data: EOSViewID,
    isLoading: EOSViewIDIsLoading,
    error: EOSViewIDHasError
  } = useFetch(
    `${digitalFarmerFarm?._id}_eos_view_id`,
    digitalFarmerFarm?._id ? eosSearch : null,
    reload,
    eosViewIdPayload,
    'sentinel2'
  )

  // payload of health eos task_id creation
  const EOSTaskForStats = {
    type: 'mt_stats',
    params: {
      bm_type: ['NDVI', 'MSI', 'EVI', 'CCCI', 'NDRE', 'GCI'],
      date_start: dateIntervals()?.SixtyDaysAgo,
      date_end: dateIntervals()?.today,
      geometry: {
        coordinates: [location],
        type: 'Polygon'
      },
      reference: 'ref_20210208-00-00',
      sensors: ['sentinel2']
    }
  }

  //creates stats task_id for stats health card
  const {
    data: _eosTask,
    isLoading: eosTaskIsLoading,
    error: eosTaskHasError
  } = useFetch(
    `${digitalFarmerFarm?._id}_eos_task_stats_for_health`,
    digitalFarmerFarm?._id ? eosTask : null,
    reload,
    EOSTaskForStats
  )

  const weatherForeCastsPayload = {
    geometry: {
      type: 'Polygon',
      coordinates: [location]
    }
  }

  const {
    data: WeatherForeCasts,
    isLoading: WeatherForeCastsIsLoading,
    error: WeatherForeCastsHasError
  } = useFetch(
    `${digitalFarmerFarm?._id}_eos_weather_forecasts`,
    digitalFarmerFarm?._id ? eosWeather : null,
    reload,
    weatherForeCastsPayload
  )

  // const isLoading =
  //   EOSViewIDIsLoading || WeatherForeCastsIsLoading || eosTaskIsLoading

  // const eosHasError =
  //   EOSViewIDHasError || WeatherForeCastsHasError || eosTaskHasError

  return (
    <React.Fragment>
      {
        <SelectedFarm
          reload={reload}
          reloads={reloads}
          onOpen={onOpen}
          //loadings
          farmFeedsIsLoading={farmFeedsIsLoading}
          ScheduledTasksIsLoading={ScheduledTasksIsLoading}
          myFarmActivitiesIsLoading={myFarmActivitiesIsLoading}
          tasksIsLoading={tasksIsLoading}
          EOSViewIDIsLoading={EOSViewIDIsLoading}
          WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
          eosTaskIsLoading={eosTaskIsLoading}
          //data
          digitalFarmerFarm={digitalFarmerFarm}
          farmfeeds={farmfeeds}
          activities={activities}
          eosTask={_eosTask}
          EOSViewID={EOSViewID}
          WeatherForeCasts={WeatherForeCasts}
          ScheduledTasks={ScheduledTasks}
          location={location}
          tasks={tasks}
          center={center}
          //errors
          EOSViewIDHasError={EOSViewIDHasError}
          WeatherForeCastsHasError={WeatherForeCastsHasError}
          eosTaskHasError={eosTaskHasError}
          farmFeedsHasError={farmFeedsHasError}
          ScheduledTasksHasError={ScheduledTasksHasError}
          myFarmActivitiesHasError={myFarmActivitiesHasError}
          tasksHasError={tasksHasError}
          //setType={setType}
        />
      }
    </React.Fragment>
  )
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  digitalFarmerFarm: PropTypes.object.isRequired,
  farmfeeds: PropTypes.array.isRequired,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.array.isRequired,
  EOSTaskForStatsCreated: PropTypes.any,
  reloads: PropTypes.array,
  location: PropTypes.array.isRequired,
  reload: PropTypes.any,
  dateIntervals: PropTypes.func.isRequired,
  activities: PropTypes.any,
  tasks: PropTypes.array.isRequired,
  center: PropTypes.array.isRequired,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  myFarmActivitiesIsLoading: PropTypes.bool,
  tasksIsLoading: PropTypes.bool,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  myFarmActivitiesHasError: PropTypes.any,
  tasksHasError: PropTypes.any
}

export default DynamicFarm
