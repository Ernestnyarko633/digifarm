/* eslint-disable */
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import DynamicCard from '../Sidebar';
import FetchCard from 'components/FetchCard';
export default function FarmRightSidebar({
  state,
  digitalFarmerFarm,
  eosStats,
  location,
  ScheduledTasks,
  reloads,
  farmfeeds,
  WeatherForeCasts,
  loading,
  error,
  _error,
}) {
  if (loading) {
    return (
      <Stack p={10} mt={24} spacing={4}>
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
        <Skeleton bg='gray.100' height='200px' rounded='lg' />
      </Stack>
    );
  }

  return (
    <Box
      py={8}
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      as='rightsidebar'
      bottom={0}
      pos={{ md: 'fixed' }}
      px={{ base: 4, md: 8 }}
      h={{ lg: '84vh' }}
      w={{ md: '30%' }}
      my={{ base: 20, md: 0 }}
      shadow={{ md: 'md' }}
      overflowY={{ md: 'scroll' }}
    >
      <DynamicCard
        card={state}
        scheduledTasks={ScheduledTasks}
        weatherForeCasts={WeatherForeCasts}
        farmfeeds={farmfeeds}
        farm={digitalFarmerFarm}
        loading={loading}
        error={error}
        _error={_error}
        eosStats={eosStats}
      />
      {(loading || error || _error) && (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => {
            (error || _error) && reloads[0]();
          }}
          loading={loading}
          error={error || _error}
          text={
            loading
              ? 'Standby as we load the data'
              : (error || _error) && "Something went wrong, don't fret"
          }
        />
      )}
    </Box>
  );
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string,
  digitalFarmerFarm: PropTypes.any.isRequired,
  eosStats: PropTypes.any,
  location: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  farmfeeds: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.any,
};
