/* eslint-disable */
import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import FarmLeftSideBar from '../Container/FarmLeftSideBar';
import FarmRightSidebar from '../Container/FarmRightSidebar';
import useApi from 'context/api';
import useFetch from 'hooks/useFetch';
import useComponent from 'context/component';
export default function FarmLayout({
  children,
  reload,
  digitalFarmerFarm,
  eosTask,
  WeatherForeCasts,
  ScheduledTasks,
  EOSViewID,
  location,
  loading,
  farmfeeds,
  error,
  _error,
  reloads,
  ...rest
}) {
  const { compState, setCompState } = useComponent();
  const { eosStats } = useApi();
  // for health card stats
  const {
    data: EOSStatistics,
    isLoading: EOSStatisticsIsLoading,
    error: EOSStatisticsHasError,
  } = useFetch(null, eosTask?.task_id ? eosStats : null, reload, {
    task: eosTask?.task_id,
  });
  return (
    <Grid
      templateRows={{ md: 'repeat(1 1fr)' }}
      templateColumns={{ md: '17% 53% 30%' }}
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
      px={{ base: 4, md: 0 }}
    >
      <GridItem shadow='xl' d={{ base: 'none', md: 'block' }}>
        <FarmLeftSideBar state={compState} setState={setCompState} />
      </GridItem>
      <GridItem>
        <Box
          minW={{ base: '100%', lg: '53%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          minH={{ md: '100vh' }}
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow={{ md: 'xl' }}>
        {!loading && !EOSStatisticsIsLoading && (
          <FarmRightSidebar
            farmfeeds={farmfeeds}
            WeatherForeCasts={WeatherForeCasts}
            ScheduledTasks={ScheduledTasks}
            loading={loading || EOSStatisticsIsLoading}
            error={error || EOSStatisticsHasError}
            _error={_error}
            state={compState}
            reloads={reloads}
            eosStats={EOSStatistics}
            digitalFarmerFarm={digitalFarmerFarm}
            location={location}
          />
        )}
      </GridItem>
    </Grid>
  );
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  digitalFarmerFarm: PropTypes.any,
  eosTask: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  EOSViewID: PropTypes.any,
  location: PropTypes.any,
  rest: PropTypes.any,
  farmfeeds: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.array,
  reload: PropTypes.number,
};
