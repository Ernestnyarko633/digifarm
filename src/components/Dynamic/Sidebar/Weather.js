import { Grid } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Weather as WeatherIcon } from 'theme/Icons'
import WeatherCard from '../Cards/WeatherCard'

export default function Weather({ farm, weatherForeCasts, loading }) {
  return (
    <Grid gap={8} mb={8}>
      {loading === 'done' &&
        weatherForeCasts &&
        weatherForeCasts?.map(weather => (
          <WeatherCard
            key={weather.Date}
            title='WEATHER'
            icon={WeatherIcon}
            value={(weather.Temp_land_max + weather.Temp_land_min) / 2}
            duration={new Date(weather.Date).toLocaleDateString()}
          />
        ))}
    </Grid>
  )
}

Weather.propTypes = {
  farm: PropTypes.any,
  weatherForeCasts: PropTypes.any,
  loading: PropTypes.any
}
