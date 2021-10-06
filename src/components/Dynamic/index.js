/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
//import useExternalApi from 'context/external'
import { useQuery } from 'react-query'
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
    error: EOSViewIDHasError,
    refetch: EOSViewIDRefetch
  } = useQuery(
    [`${digitalFarmerFarm?._id}_eos_view_id`, digitalFarmerFarm?._id],
    () => digitalFarmerFarm?._id && eosSearch(eosViewIdPayload, 'sentinel2')
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
    error: eosTaskHasError,
    refetch: _eosTaskRefetch
  } = useQuery(
    [
      `${digitalFarmerFarm?._id}_eos_task_stats_for_health`,
      digitalFarmerFarm?._id
    ],
    () => digitalFarmerFarm?._id && eosTask(EOSTaskForStats)
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
    error: WeatherForeCastsHasError,
    refetch: WeatherForeCastsRefetch
  } = useQuery(
    [`${digitalFarmerFarm?._id}_eos_weather_forecasts`, digitalFarmerFarm?._id],
    () => digitalFarmerFarm?._id && eosWeather(weatherForeCastsPayload)
  )

  //trigger Reloads
  const triggerEosTaskReload = () => _eosTaskRefetch()
  const triggerEosSearchReload = () => EOSViewIDRefetch()
  const triggerEosWeatherReload = () => WeatherForeCastsRefetch()

  return (
    <React.Fragment>
      {
        <SelectedFarm
          //reloads funcs
          reloads={[
            ...reloads,
            triggerEosTaskReload,
            triggerEosSearchReload,
            triggerEosWeatherReload
          ]}
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
          eosTask={_eosTask?.data}
          EOSViewID={EOSViewID?.data}
          WeatherForeCasts={WeatherForeCasts?.data}
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
  digitalFarmerFarm: PropTypes.object,
  farmfeeds: PropTypes.array,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.array,
  EOSTaskForStatsCreated: PropTypes.any,
  reloads: PropTypes.array,
  location: PropTypes.array.isRequired,
  dateIntervals: PropTypes.func,
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
