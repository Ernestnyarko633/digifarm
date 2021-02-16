import { Grid } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Weather as WeatherIcon } from 'theme/Icons'
import WeatherCard from '../Cards/WeatherCard'

export default function Weather({ farm }) {
  return (
    <Grid gap={8} mb={8}>
      <WeatherCard title='WEATHER' icon={WeatherIcon} duration='Wed, 3m ago' />
      <WeatherCard title='WEATHER' icon={WeatherIcon} duration='Wed, 3m ago' />
      <WeatherCard title='WEATHER' icon={WeatherIcon} duration='Wed, 3m ago' />
    </Grid>
  )
}

Weather.propTypes = {
  farm: PropTypes.any
}
