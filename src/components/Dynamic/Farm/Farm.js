import { Box, Flex } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import FarmLayout from './FarmLayout'
import Map from 'components/Map/Map'
import useEosApi from 'context/eosApi'
import useFetch from 'hooks/useFetch'
export default function Farm({
  onOpen,
  digitalFarmerFarm,
  EOSStatistics,
  WeatherForeCasts,
  ScheduledTasks,
  EOSViewID,
  reload,
  location,
  loading,
  error,
  _error,
  farmfeeds,
  reloads
}) {
  const [_loading, _setLoading] = React.useState(false)
  const [__error, _setError] = React.useState(null)
  const { getEOSStatistics, createEOSTaskForStats } = useEosApi()

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

  const {
    data: EOSTaskForStatsCreated,
    isLoading: EOSTaskForStatsCreationIsLoading,
    error: EOSTaskForStatsCreationHasError
  } = useFetch(
    'eos_task_stats_creation',
    createEOSTaskForStats,
    reload,
    EOSTaskForStatsCreationPayload
  )

  const DownloadVisual = async downloadTaskID => {
    try {
      _setError(null)
      _setLoading(true)
      await getEOSStatistics(downloadTaskID)
      _setLoading(false)
    } catch (error) {
      _setError(error)
      _setLoading(false)
    }
  }

  return (
    <FarmLayout
      digitalFarmerFarm={digitalFarmerFarm}
      EOSStatistics={EOSStatistics}
      WeatherForeCasts={WeatherForeCasts}
      ScheduledTasks={ScheduledTasks}
      EOSViewID={EOSViewID}
      location={location}
      farmfeeds={farmfeeds}
      loading={loading}
      reloads={reloads}
      error={error}
      _error={_error}
    >
      <Box h={{ md: 128 }} w='100%'>
        <Box
          h='100%'
          w='100%'
          objectFit='cover'
          as={Map}
          viewID={EOSViewID?.results[0]?.view_id}
          loading={loading || EOSTaskForStatsCreationIsLoading}
          error={error}
          _error={_error || EOSTaskForStatsCreationHasError}
          center={[-1.531048, 5.578849]}
          reloads={reloads}
        />
      </Box>
      <Flex align='center' justify='flex-end' my={{ md: 6 }} px={{ md: 6 }}>
        <Button
          btntitle='Download'
          bg='white'
          borderWidth={2}
          borderColor='cf.400'
          rounded='30px'
          mr={6}
          _hover={{ bg: 'white' }}
          color='cf.400'
          h={12}
          w={{ md: 40 }}
          shadow='none'
          isLoading={_loading}
          isDisabled={_loading}
          isError={__error}
          onClick={() => DownloadVisual(EOSTaskForStatsCreated?.task_id)}
        />
        <Button
          btntitle='Share'
          rounded='30px'
          h={12}
          w={{ md: 40 }}
          onClick={onOpen}
        />
      </Flex>
    </FarmLayout>
  )
}

Farm.propTypes = {
  reload: PropTypes.any,
  onOpen: PropTypes.func,
  digitalFarmerFarm: PropTypes.any,
  EOSStatistics: PropTypes.any,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  location: PropTypes.any,
  farmfeeds: PropTypes.any,
  error: PropTypes.any,
  _error: PropTypes.any,
  loading: PropTypes.any,
  reloads: PropTypes.any
}
