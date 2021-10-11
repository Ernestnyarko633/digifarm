/* eslint-disable no-console */
import { Grid, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Weather as WeatherIcon } from 'theme/Icons'
import WeatherCard from '../Cards/WeatherCard'
import FetchCard from 'components/FetchCard'
import useFarm from 'context/farm'

export default function Weather() {
  const {
    WeatherForeCastsIsLoading,
    WeatherForeCastsHasError,
    triggerEosWeatherReload,
    WeatherForeCasts
  } = useFarm()

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
            reload={() => triggerEosWeatherReload()}
            loading={WeatherForeCastsIsLoading}
            error={WeatherForeCastsHasError}
            text={"Standby as we load your farm's weather forecasts"}
          />
        </Box>
      ) : WeatherForeCasts?.length > 0 ? (
        WeatherForeCasts?.map(weather => (
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

Weather.propTypes = {}
