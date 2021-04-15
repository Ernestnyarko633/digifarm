/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import FarmLayout from './FarmLayout';
import Map from 'components/Map/Map';
import useApi from 'context/api';
import EmptyMap from 'assets/images/map.png';
import Fade from 'react-reveal/Fade';

import FetchCard from 'components/FetchCard';

export default function Farm({
  onOpen,
  center,
  zoom = 14,
  eosTask,
  digitalFarmerFarm,
  WeatherForeCasts,
  ScheduledTasks,
  EOSViewID,
  reload,
  location,
  loading,
  error,
  _error,
  farmfeeds,
  reloads,
}) {
  const [_loading, _setLoading] = React.useState(false);
  // const [band, setBand] = React.useState('NDVI')

  const [
    EOSTaskForStatsCreationIsLoading,
    setEOSTaskForStatsCreationIsLoading,
  ] = useState(false);
  const [
    EOSTaskForStatsCreationHasError,
    setEOSTaskForStatsCreationHasError,
  ] = useState(null);
  const [EOSTaskForStatsCreated, setEOSTaskForStatsCreated] = useState({});
  const [__error, _setError] = React.useState(null);
  const { eosStats, createTask } = useApi();

  useEffect(() => {
    let mounted = true;
    let EOSTaskForStatsCreationPayload = {
      type: 'lbe',
      params: {
        view_id: EOSViewID?.results[0]?.view_id,
        bands: ['B02', 'B03', 'B04'],
        geometry: {
          type: 'Polygon',
          coordinates: [location],
        },
        merge: true,

        reference: 'ref_datetime',
      },
    };

    const fetchData = async (payload) => {
      try {
        let key = `${EOSViewID?.results[0]?.view_id}_os_task_stats_creation`;
        const dataFromStorage = JSON.parse(sessionStorage.getItem(key));
        if (dataFromStorage) {
          return setEOSTaskForStatsCreated(dataFromStorage);
        } else {
          setEOSTaskForStatsCreationHasError(null);
          setEOSTaskForStatsCreationIsLoading(true);
          const res = await createTask(payload);
          if (mounted) {
            key && sessionStorage.setItem(key, JSON.stringify(res?.data));
          }
          setEOSTaskForStatsCreated(res?.data);
          setEOSTaskForStatsCreationIsLoading(false);
        }
      } catch (error) {
        setEOSTaskForStatsCreationHasError(error);
        setEOSTaskForStatsCreationIsLoading(false);
      }
    };
    if (mounted) {
      EOSViewID && location && fetchData(EOSTaskForStatsCreationPayload);
    }

    return () => (mounted = false);
  }, [location, EOSViewID, reload, createTask]);

  const DownloadVisual = async (downloadTaskID) => {
    try {
      _setError(null);
      _setLoading(true);
      await eosStats({ task: downloadTaskID });
      _setLoading(false);
    } catch (error) {
      _setError(error);
      _setLoading(false);
    }
  };

  return (
    <FarmLayout
      digitalFarmerFarm={digitalFarmerFarm}
      WeatherForeCasts={WeatherForeCasts}
      ScheduledTasks={ScheduledTasks}
      EOSViewID={EOSViewID}
      location={location}
      farmfeeds={farmfeeds}
      loading={loading}
      reloads={reloads}
      eosTask={eosTask}
      error={error}
      _error={_error}
    >
      <Box h={{ base: 90, md: 128 }} w='100%' mt={{ base: 32, md: 0 }}>
        {EOSViewID && (
          <Box
            h='100%'
            w='100%'
            objectFit='cover'
            as={Map}
            viewID={EOSViewID?.results[0]?.view_id}
            loading={loading || EOSTaskForStatsCreationIsLoading}
            error={error}
            band={null}
            _error={_error || EOSTaskForStatsCreationHasError}
            center={center || location[0]}
            zoom={zoom}
            reloads={reloads}
          />
        )}
        {!loading && !EOSViewID && (
          <Flex w='100%' h='100%' direction='column'>
            <Box w='100%' h='100%'>
              <Image fit='cover' w='100%' h='100%' src={EmptyMap} />
            </Box>
            <Box pt={{ md: 10 }}>
              <FetchCard
                direction='column'
                align='center'
                justify='center'
                mx='auto'
                reload={() => {
                  (error || _error || __error) && reloads[0]();
                }}
                loading={loading}
                error={error || _error || __error}
                text={
                  !error || !_error
                    ? 'Standby as we load your current farms and pending orders'
                    : 'Something went wrong, please dont fret'
                }
              />
            </Box>
          </Flex>
        )}
      </Box>
      {EOSViewID && (
        <Flex align='center' justify='flex-end' my={6} px={{ base: 4, md: 6 }}>
          <Fade right>
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
              isDisabled={_loading || !EOSTaskForStatsCreated?.task_id}
              //isError={__error}
              onClick={
                () => DownloadVisual({ task: EOSTaskForStatsCreated?.task_id })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
            <Button
              btntitle='Share'
              rounded='30px'
              h={12}
              w={{ base: 20, md: 40 }}
              onClick={onOpen}
            />
          </Fade>
        </Flex>
      )}
    </FarmLayout>
  );
}

Farm.propTypes = {
  center: PropTypes.array,
  reload: PropTypes.any,
  onOpen: PropTypes.func,
  digitalFarmerFarm: PropTypes.object,
  EOSStatistics: PropTypes.any,
  EOSViewID: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.array,
  location: PropTypes.array,
  farmfeeds: PropTypes.array,
  error: PropTypes.any,
  _error: PropTypes.any,
  loading: PropTypes.any,
  reloads: PropTypes.any,
  zoom: PropTypes.number,
  band: PropTypes.string,
  eosTask: PropTypes.any,
};
