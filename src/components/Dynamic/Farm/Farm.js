import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import FarmLayout from './FarmLayout'
import Map from 'components/Map/Map'
import EmptyMap from 'assets/images/map404.png'
import useApi from 'context/api'
import Sat from 'assets/images/sateilite.png'
import FetchCard from 'components/FetchCard'
import FarmLegend from './FarmLegend'

export default function Farm({
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  myFarmActivitiesIsLoading,
  EOSViewIDIsLoading,
  WeatherForeCastsIsLoading,
  tasksIsLoading,
  onOpen,
  center,
  zoom = 14,
  eosTask,
  digitalFarmerFarm,
  WeatherForeCasts,
  ScheduledTasks,
  EOSViewID,
  location,
  farmfeeds,
  reloads,
  EOSViewIDHasError,
  WeatherForeCastsHasError,
  eosTaskHasError,
  eosTaskIsLoading,
  farmFeedsHasError,
  ScheduledTasksHasError,
  myFarmActivitiesHasError,
  tasksHasError
}) {
  const [_loading, _setLoading] = React.useState(false)
  // const [band, setBand] = React.useState('NDVI')
  const ENV = process.env.REACT_APP_ENVIRONMENT
  const [
    EOSTaskForStatsCreationIsLoading,
    setEOSTaskForStatsCreationIsLoading
  ] = useState(false)
  const [EOSTaskForStatsCreationHasError, setEOSTaskForStatsCreationHasError] =
    useState(null)
  const [EOSTaskForStatsCreated, setEOSTaskForStatsCreated] = useState({})
  const [__error, _setError] = React.useState(null)
  const { eosStats, eosTask: createTask } = useApi()

  useEffect(() => {
    let mounted = true
    let EOSTaskForStatsCreationPayload = {
      type: 'lbe',
      params: {
        view_id: EOSViewID?.results[0]?.view_id,
        bands: ['B02', 'B03', 'B04'],
        geometry: {
          type: 'Polygon',
          coordinates: [location]
        },
        merge: true,

        reference: 'ref_datetime'
      }
    }

    const fetchData = async payload => {
      try {
        let key = `${EOSViewID?.results[0]?.view_id}_os_task_stats_creation`
        const dataFromStorage = JSON.parse(sessionStorage.getItem(key))
        if (dataFromStorage) {
          return setEOSTaskForStatsCreated(dataFromStorage)
        } else {
          setEOSTaskForStatsCreationHasError(null)
          setEOSTaskForStatsCreationIsLoading(true)
          const res = await createTask(payload)
          if (mounted) {
            key && sessionStorage.setItem(key, JSON.stringify(res?.data))
          }
          setEOSTaskForStatsCreated(res?.data)
          setEOSTaskForStatsCreationIsLoading(false)
        }
      } catch (error) {
        setEOSTaskForStatsCreationHasError(error)
        setEOSTaskForStatsCreationIsLoading(false)
      }
    }
    if (mounted) {
      EOSViewID && location && fetchData(EOSTaskForStatsCreationPayload)
    }

    return () => (mounted = false)
  }, [location, EOSViewID, createTask])

  const DownloadVisual = async downloadTaskID => {
    try {
      _setError(null)
      _setLoading(true)
      await eosStats({ task: downloadTaskID })
      _setLoading(false)
    } catch (error) {
      _setError(error)
      _setLoading(false)
    }
  }

  return (
    <FarmLayout
      //data
      digitalFarmerFarm={digitalFarmerFarm || {}}
      WeatherForeCasts={WeatherForeCasts || []}
      ScheduledTasks={ScheduledTasks || []}
      location={location || []}
      farmfeeds={farmfeeds || []}
      eosTask={eosTask}
      //loading
      farmFeedsIsLoading={farmFeedsIsLoading}
      ScheduledTasksIsLoading={ScheduledTasksIsLoading}
      WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
      eosTaskIsLoading={eosTaskIsLoading}
      //errors
      WeatherForeCastsHasError={WeatherForeCastsHasError}
      farmFeedsHasError={farmFeedsHasError}
      ScheduledTasksHasError={ScheduledTasksHasError}
      eosTaskHasError={eosTaskHasError}
      //extras
      reloads={reloads}
    >
      {EOSTaskForStatsCreationHasError || __error}
      <Box h={{ base: 90, md: 128 }} w='100%' mt={{ base: 32, md: 0 }}>
        {EOSViewIDIsLoading || EOSViewIDHasError ? (
          <Flex w='100%' h='100%' direction='column'>
            {!EOSViewID && (
              <Box display={{ base: 'block' }} w='100%' h='100%'>
                <Image fit='cover' w='100%' h='100%' src={EmptyMap} />
                <Box
                  pos='absolute'
                  top={{ base: '20%', md: '40%' }}
                  left={{ base: '10%', md: '33%' }}
                  w={{ base: '80%', md: '20%' }}
                  h='auto'
                >
                  <Flex direction='column' align='center' justify='center'>
                    <Image src={Sat} boxSize={12} />
                    <Text
                      textAlign='center'
                      color='white'
                      fontWeight={900}
                      fontSize='xl'
                    >
                      satellite imagery currently not available
                    </Text>
                  </Flex>
                </Box>
              </Box>
            )}
            <Box pt={{ md: 10 }}>
              <FetchCard
                direction='column'
                align='center'
                justify='center'
                mx='auto'
                reload={() => reloads[5]()}
                loading={EOSViewIDIsLoading}
                error={EOSViewIDHasError}
                text={"Standby as we load your farm's map"}
              />
            </Box>
          </Flex>
        ) : (
          <>
            {EOSViewID && ENV === 'PROD' && (
              <Box
                h='100%'
                w='100%'
                objectFit='cover'
                as={Map}
                viewID={EOSViewID?.results[0]?.view_id}
                loading={EOSViewIDIsLoading || EOSTaskForStatsCreationIsLoading}
                error={EOSViewIDHasError}
                band={null}
                center={center || location[0]}
                zoom={zoom}
                reloads={reloads}
              />
            )}
            {ENV !== 'PROD' && (
              <Box display={{ base: 'block' }} w='100%' h='100%'>
                <Image fit='cover' w='100%' h='100%' src={EmptyMap} />
                <Box
                  pos='absolute'
                  top={{ base: '20%', md: '40%' }}
                  left={{ base: '10%', md: '33%' }}
                  w={{ base: '80%', md: '20%' }}
                  h='auto'
                >
                  <Flex direction='column' align='center' justify='center'>
                    <Image src={Sat} boxSize={12} />
                    <Text
                      textAlign='center'
                      color='white'
                      fontWeight={900}
                      fontSize='xl'
                    >
                      satellite imagery currently not available
                    </Text>
                  </Flex>
                </Box>
              </Box>
            )}
            {EOSViewID && ENV === 'LOCAL' && (
              <Flex
                align='center'
                justify='space-between'
                my={6}
                px={{ base: 4, md: 6 }}
              >
                <FarmLegend />
                <Button
                  btntitle='Download'
                  bg='white'
                  borderWidth={2}
                  borderColor='cf.green'
                  rounded='30px'
                  mr={6}
                  _hover={{ bg: 'white' }}
                  color='cf.green'
                  h={12}
                  w={{ md: 40 }}
                  shadow='none'
                  isLoading={_loading}
                  isDisabled={_loading || !EOSTaskForStatsCreated?.task_id}
                  //isError={__error}
                  onClick={
                    () =>
                      DownloadVisual({ task: EOSTaskForStatsCreated?.task_id })
                    // eslint-disable-next-line react/jsx-curly-newline
                  }
                />
                {/* <Button
              btntitle='Share'
              rounded='30px'
              h={12}
              isDisabled
              w={{ base: 20, md: 40 }}
              onClick={onOpen}
            /> */}
              </Flex>
            )}
          </>
        )}
      </Box>
    </FarmLayout>
  )
}

Farm.propTypes = {
  center: PropTypes.array,
  onOpen: PropTypes.func,
  digitalFarmerFarm: PropTypes.object,
  EOSStatistics: PropTypes.any,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.array,
  location: PropTypes.array,
  farmfeeds: PropTypes.array,
  reloads: PropTypes.any,
  zoom: PropTypes.number,
  band: PropTypes.string,
  eosTask: PropTypes.array,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  myFarmActivitiesIsLoading: PropTypes.bool,
  EOSViewIDIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  eosTaskIsLoading: PropTypes.bool,
  tasksIsLoading: PropTypes.bool,
  EOSViewIDHasError: PropTypes.any,
  WeatherForeCastsHasError: PropTypes.any,
  eosTaskHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  myFarmActivitiesHasError: PropTypes.any,
  tasksHasError: PropTypes.any
}
