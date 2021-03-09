import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'

export default function FarmLayout({
  children,
  digitalFarmerFarm,
  EOSStatistics,
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
  const [state, setState] = React.useState('compA')
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='17% 53% 30%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem shadow='xl'>
        <FarmLeftSideBar state={state} setState={setState} />
      </GridItem>
      <GridItem>
        <Box
          minW={{ lg: '53%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          minH='100vh'
          {...rest}
        >
          {children}
        </Box>
      </GridItem>
      <GridItem shadow='xl'>
        {!loading && (
          <FarmRightSidebar
            farmfeeds={farmfeeds}
            WeatherForeCasts={WeatherForeCasts}
            ScheduledTasks={ScheduledTasks}
            loading={loading}
            error={error}
            _error={_error}
            state={state}
            reloads={reloads}
            eosStats={EOSStatistics?.result}
            digitalFarmerFarm={digitalFarmerFarm}
            location={location}
          />
        )}
      </GridItem>
    </Grid>
  )
}

FarmLayout.propTypes = {
  children: PropTypes.node.isRequired,
  digitalFarmerFarm: PropTypes.any,
  EOSStatistics: PropTypes.any,
  WeatherForeCasts: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  EOSViewID: PropTypes.any,
  location: PropTypes.any,
  rest: PropTypes.any,
  farmfeeds: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  _error: PropTypes.any,
  reloads: PropTypes.any
}
