import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import useComponent from 'context/component'
export default function FarmLayout({
  children,
  digitalFarmerFarm,
  eosTask,
  WeatherForeCasts,
  ScheduledTasks,
  location,
  farmfeeds,
  reloads,
  //loading
  farmFeedsIsLoading,
  ScheduledTasksIsLoading,
  WeatherForeCastsIsLoading,
  //errors
  WeatherForeCastsHasError,
  farmFeedsHasError,
  ScheduledTasksHasError,
  ...rest
}) {
  const { compState, setCompState } = useComponent()
  const { eosStats } = useApi()
  const [eosStatsReload, setEosStatsReload] = React.useState(0)

  const triggerEosStatsReload = () => setEosStatsReload(prev => prev + 1)
  // for health card stats
  const {
    data: EOSStatistics,
    isLoading: EOSStatisticsIsLoading,
    error: EOSStatisticsHasError
  } = useFetch(
    eosTask?.task_id ? `${eosTask?.task_id}_stats` : null,
    eosTask?.task_id ? eosStats : null,
    eosStatsReload,
    {
      task: eosTask?.task_id
    }
  )
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
        <FarmRightSidebar
          // data
          farmfeeds={farmfeeds}
          WeatherForeCasts={WeatherForeCasts}
          ScheduledTasks={ScheduledTasks}
          eosStats={EOSStatistics}
          digitalFarmerFarm={digitalFarmerFarm}
          location={location}
          state={compState}
          //extras
          reloads={[...reloads, triggerEosStatsReload]}
          //loadings
          farmFeedsIsLoading={farmFeedsIsLoading}
          WeatherForeCastsIsLoading={WeatherForeCastsIsLoading}
          ScheduledTasksIsLoading={ScheduledTasksIsLoading}
          EOSStatisticsIsLoading={EOSStatisticsIsLoading}
          //errors
          WeatherForeCastsHasError={WeatherForeCastsHasError}
          farmFeedsHasError={farmFeedsHasError}
          ScheduledTasksHasError={ScheduledTasksHasError}
          EOSStatisticsHasError={EOSStatisticsHasError}
        />
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  digitalFarmerFarm: PropTypes.any,
  eosTask: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  location: PropTypes.any,
  rest: PropTypes.any,
  farmfeeds: PropTypes.array,
  reloads: PropTypes.array,
  farmFeedsIsLoading: PropTypes.bool,
  ScheduledTasksIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any
}
