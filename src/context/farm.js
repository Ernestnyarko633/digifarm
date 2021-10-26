/* eslint-disable no-console */
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScreenshot } from 'use-react-screenshot'
import useApi from 'context/api'
import useComponent from 'context/component'
import { useQuery } from 'react-query'
import { dateIntervals } from 'helpers/misc'
import PropTypes from 'prop-types'

const FarmContext = createContext()

export const FarmContextProvider = ({ children }) => {
  const [id, setId] = useState(undefined)
  const { state } = useLocation()
  const [location, setLocation] = useState([])
  const [center, setCenter] = useState([])
  const { setInViewProduct } = useComponent()

  const ref = React.useRef(null)
  const [component, setComponent] = useState('compA')
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(true)
  const [image, takeScreenShot] = useScreenshot()
  const { compState, setCompState } = useComponent()

  React.useEffect(() => {
    let mounted = true
    if (mounted) {
      setComponent('compA')
      setOpen(true)
      setIsOpen(false)
      setCompState('compA')
    }
    return () => (mounted = false)
  }, [id, setCompState])

  const onClose = () => setIsOpen(false)
  const closed = () => setOpen(false)

  const onOpen = () => setIsOpen(true)

  const getImage = () => {
    takeScreenShot(ref.current)
    onOpen()
  }

  const {
    getMyFarmFeeds,
    getAllTasks,
    getMyFarm,
    getActivities,
    getMyScheduledTasks,
    eosTask,
    eosSearch,
    eosWeather,
    eosStats
  } = useApi()

  const {
    data: farm,
    isLoading: farmIsLoading,
    error: farmHasError,
    refetch: farmRefetch
  } = useQuery(`selectedFarm_${id}`, () => {
    if (id && !state) {
      return getMyFarm(id)
    }
    return null
  })

  const DigitalFarmerFarm = id
    ? state?.order?.product?._id || farm?.data?.order?.product?._id
    : null

  const digiFarmId = state?._id || farm?.data?._id

  const triggerFarmReload = () => farmRefetch()

  useEffect(() => {
    if (farm?.data?.order?.product?._id || state?.order?.product?._id) {
      setInViewProduct(
        farm?.data?.order?.product._id || state?.order?.product?._id
      )
    }
  }, [farm?.data?.order?.product, setInViewProduct, state?.order?.product?._id])
  // lifecycle event to handle parsing of fms to coords to suitable data type for eos
  useEffect(() => {
    const new_location_coords = []
    const new_location_center = []
    const farm_location =
      state?.order?.product?.location || farm?.data?.order?.product?.location
    const farm_location_center = farm_location?.center
    // fms coords are in strings "1.2334,0.4543434"
    // function splits strings to two strings and then converts or parses them to numbers
    const strToNumber = (value, array) =>
      value?.forEach(coordinate => {
        return array?.push(
          coordinate
            .split(',')
            ?.reverse()
            .map(item => {
              return parseFloat(item, 10)
            })
        )
      })
    strToNumber(farm_location?.coords, new_location_coords)
    strToNumber(farm_location_center, new_location_center)
    setLocation(new_location_coords)
    setCenter(new_location_center)
  }, [farm?.data?.order?.product?.location, state?.order?.product?.location])

  const {
    data: farmFeeds,
    isLoading: farmFeedsIsLoading,
    error: farmFeedsHasError,
    refetch: farmFeedsRefetch
  } = useQuery([`farm_feeds_${DigitalFarmerFarm}`, DigitalFarmerFarm], () => {
    if (DigitalFarmerFarm) {
      return getMyFarmFeeds({
        farm: DigitalFarmerFarm
      })
    }
    return null
  })

  const {
    data: ScheduledTasks,
    isLoading: ScheduledTasksIsLoading,
    error: ScheduledTasksHasError,
    refetch: ScheduledTasksRefetch
  } = useQuery(
    [`scheduled_tasks_farm_${DigitalFarmerFarm}`, DigitalFarmerFarm],
    () => {
      if (DigitalFarmerFarm) {
        return getMyScheduledTasks({
          farm: DigitalFarmerFarm
        })
      }
      return null
    }
  )

  const {
    data: myFarmActivities,
    isLoading: myFarmActivitiesIsLoading,
    error: myFarmActivitiesHasError,
    refetch: myFarmActivitiesRefetch
  } = useQuery(
    [`activities_farm_${DigitalFarmerFarm}`, DigitalFarmerFarm],
    () => {
      if (DigitalFarmerFarm) {
        return getActivities({
          farm: DigitalFarmerFarm
        })
      }
      return null
    }
  )

  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksHasError,
    refetch: tasksRefetch
  } = useQuery([`tasks_farm_${DigitalFarmerFarm}`, DigitalFarmerFarm], () => {
    if (DigitalFarmerFarm) {
      return getAllTasks({
        farm: DigitalFarmerFarm
      })
    }
    return null
  })

  // trigger Reloads
  const triggerActivitiesReload = () => myFarmActivitiesRefetch()
  const triggerTasksReload = () => tasksRefetch()
  const triggerFarmFeedsReload = () => farmFeedsRefetch()
  const triggerScheduledTasksReload = () => ScheduledTasksRefetch()

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
  } = useQuery([`${digiFarmId}_eos_view_id`, digiFarmId, location], () => {
    if (location?.length && digiFarmId) {
      return eosSearch(eosViewIdPayload, 'sentinel2')
    }
    return null
  })

  // payload of health eos task_id creation
  const EOSTaskForStats = {
    type: 'mt_stats',
    params: {
      bm_type: ['NDVI', 'EVI', 'CCCI'],
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
    [`${digiFarmId}_eos_task_stats_for_health`, digiFarmId, location],
    () => {
      if (location?.length && digiFarmId) {
        return eosTask(EOSTaskForStats)
      }
      return null
    }
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
    [`${digiFarmId}_eos_weather_forecasts`, digiFarmId, location],
    () => {
      if (location?.length && digiFarmId) {
        return eosWeather(weatherForeCastsPayload)
      }
      return null
    }
  )

  // for health card stats
  const {
    data: EOSStatistics,
    isLoading: EOSStatisticsIsLoading,
    error: EOSStatisticsHasError,
    refetch: EOSStatisticsRefetch
  } = useQuery(
    [`${_eosTask?.data?.task_id}_stats`, _eosTask?.data?.task_id, location],
    () => {
      if (_eosTask?.data?.task_id) {
        return eosStats({
          task: _eosTask?.data?.task_id
        })
      }
      return null
    }
  )

  const triggerEosStatsReload = () => EOSStatisticsRefetch()

  //trigger Reloads
  const triggerEosTaskReload = () => _eosTaskRefetch()
  const triggerEosSearchReload = () => EOSViewIDRefetch()
  const triggerEosWeatherReload = () => WeatherForeCastsRefetch()

  return (
    <FarmContext.Provider
      value={{
        EOSStatistics: EOSStatistics?.data?.length
          ? EOSStatistics?.data
              ?.slice()
              ?.sort((a, b) => new Date(b?.date) - new Date(a?.date))
          : [],
        EOSStatisticsIsLoading,
        EOSStatisticsHasError,
        triggerEosStatsReload,
        triggerEosTaskReload,
        triggerEosSearchReload,
        triggerEosWeatherReload,
        triggerActivitiesReload,
        triggerTasksReload,
        triggerFarmFeedsReload,
        triggerScheduledTasksReload,
        tasks: tasks?.data || [],
        tasksIsLoading,
        tasksHasError,
        tasksRefetch,
        myFarmActivities: myFarmActivities?.data || [],
        myFarmActivitiesHasError,
        myFarmActivitiesRefetch,
        myFarmActivitiesIsLoading,
        ScheduledTasks: ScheduledTasks?.data || [],
        ScheduledTasksHasError,
        ScheduledTasksIsLoading,
        ScheduledTasksRefetch,
        farmFeeds: farmFeeds?.data || [],
        farmFeedsIsLoading,
        farmFeedsRefetch,
        farmFeedsHasError,
        farmIsLoading,
        farm: state || farm?.data,
        farmHasError,
        farmRefetch,
        triggerFarmReload,
        location,
        center,
        WeatherForeCasts: WeatherForeCasts?.data || [],
        WeatherForeCastsHasError,
        WeatherForeCastsRefetch,
        WeatherForeCastsIsLoading,
        _eosTask: _eosTask?.data || [],
        eosTaskHasError,
        eosTaskIsLoading,
        _eosTaskRefetch,
        EOSViewID: EOSViewID?.data?.results || [],
        EOSViewIDIsLoading,
        EOSViewIDHasError,
        EOSViewIDRefetch,
        component,
        setComponent,
        isOpen,
        open,
        image,
        compState,
        setCompState,
        onClose,
        closed,
        getImage,
        setId,
        ref
      }}
    >
      {children}
    </FarmContext.Provider>
  )
}

FarmContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useFarm = () => useContext(FarmContext)

export default useFarm
