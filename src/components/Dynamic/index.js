import React from 'react'
import PropTypes from 'prop-types'
import useEosApi from 'context/eosApi'
import useFetch from 'hooks/useFetch'

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
  farm,
  onOpen,
  digitalFarmerFarm,
  ScheduledTasks,
  dateIntervals,
  reloads,
  farmfeeds,
  loading,
  location,
  reload,
  error
}) => {
  const SelectedFarm = components[farm]
  const {
    getEOSViewID,
    createEOSTaskForStats,
    getEOSStatistics,
    getEOSWeatherForeCast
  } = useEosApi()

  let eosViewIdPayload = {
    fields: ['sceneID', 'cloudCoverage'],
    limit: 1,
    page: 1,
    search: {
      date: {
        from: dateIntervals()?._30DaysAgo,
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
  } = useFetch('eos_view_id', getEOSViewID, reload, eosViewIdPayload)

  // payload of health eos task_id creation
  let EOSTaskForStats = {
    type: 'mt_stats',
    params: {
      bm_type: '(B08-B04)/(B08+B04)',
      date_start: dateIntervals()?._30DaysAgo,
      date_end: dateIntervals()?.today,
      geometry: {
        coordinates: [location],
        type: 'Polygon'
      },
      reference: 'ref_20210208-00-00',
      sensors: ['sentinel2'],
      max_cloud_cover_in_aoi: 0,
      limit: 1
    }
  }

  //creates stats task_id for stats health card

  const {
    data: eosStats,
    isLoading: eosStatsIsLoading,
    error: eosStatsHasError
  } = useFetch(
    'eos_task_stats_for_health',
    createEOSTaskForStats,
    reload,
    EOSTaskForStats
  )

  // for health card stats

  const {
    data: EOSStatistics,
    isLoading: EOSStatisticsIsLoading,
    error: EOSStatisticsHasError
  } = useFetch('eos_task_stats', getEOSStatistics, reload, eosStats?.task_id)

  let weatherForeCastsPayload = {
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
    'eos_weather_forecasts',
    getEOSWeatherForeCast,
    reload,
    weatherForeCastsPayload
  )

  const isLoading =
    EOSViewIDIsLoading ||
    WeatherForeCastsIsLoading ||
    EOSStatisticsIsLoading ||
    eosStatsIsLoading

  const eosHasError =
    EOSViewIDHasError ||
    EOSStatisticsHasError ||
    WeatherForeCastsHasError ||
    EOSStatisticsHasError ||
    eosStatsHasError

  return (
    <React.Fragment>
      {!loading && EOSViewID && (
        <SelectedFarm
          reload={reload}
          reloads={reloads}
          onOpen={onOpen}
          digitalFarmerFarm={digitalFarmerFarm}
          farmfeeds={farmfeeds}
          EOSStatistics={EOSStatistics}
          EOSViewID={EOSViewID}
          WeatherForeCasts={WeatherForeCasts}
          ScheduledTasks={ScheduledTasks}
          location={location}
          loading={loading || isLoading}
          error={error}
          _error={eosHasError}
        />
      )}
    </React.Fragment>
  )
}

DynamicFarm.propTypes = {
  farm: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  digitalFarmerFarm: PropTypes.any,
  farmfeeds: PropTypes.any,
  EOSStatistics: PropTypes.any,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  EOSTaskForStatsCreated: PropTypes.any,
  reloads: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.any,
  location: PropTypes.any,
  reload: PropTypes.any,
  dateIntervals: PropTypes.any
}

export default DynamicFarm
