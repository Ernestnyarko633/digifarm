import { Grid, Box, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Weather as WeatherIcon } from 'theme/Icons'
import WeatherCard from '../Cards/WeatherCard'
import FetchCard from 'components/FetchCard'

export default function Weather({
  weatherForeCasts,
  WeatherForeCastsHasError,
  WeatherForeCastsIsLoading,
  reloads
}) {
  return (
    <Grid gap={8} mx={8} mb={8}>
      {WeatherForeCastsHasError || WeatherForeCastsIsLoading ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => reloads[6]()}
            loading={WeatherForeCastsIsLoading}
            error={WeatherForeCastsHasError}
            text={"Standby as we load your farm's weather forecasts"}
          />
        </Box>
      ) : weatherForeCasts?.length > 0 ? (
        weatherForeCasts?.map(weather => (
          <WeatherCard
            key={weather.Date}
            title='WEATHER'
            icon={WeatherIcon}
            value={(weather.Temp_land_max + weather.Temp_land_min) / 2}
            duration={new Date(weather.Date).toLocaleDateString()}
          />
        ))
      ) : (
        <Text color='cf.400' textAlign='center' fontSize='lg'>
          Weather conditions are currently unavailable
        </Text>
      )}
    </Grid>
  )
}

Weather.propTypes = {
  weatherForeCasts: PropTypes.any,
  WeatherForeCastsHasError: PropTypes.any,
  WeatherForeCastsIsLoading: PropTypes.bool,
  reloads: PropTypes.array
}
