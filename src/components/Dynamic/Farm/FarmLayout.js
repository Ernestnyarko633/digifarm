/* eslint-disable no-console */
import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmLeftSideBar from '../Container/FarmLeftSideBar'
import FarmRightSidebar from '../Container/FarmRightSidebar'
import useComponent from 'context/component'
export default function FarmLayout({ children, ...rest }) {
  const { compState, setCompState } = useComponent()

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
        <FarmRightSidebar state={compState} />
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
  eosTaskIsLoading: PropTypes.bool,
  WeatherForeCastsIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  ScheduledTasksHasError: PropTypes.any,
  eosTaskHasError: PropTypes.any
}
