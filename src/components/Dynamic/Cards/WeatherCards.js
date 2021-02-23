import React from 'react'
import { Cloud } from 'theme/Icons'
import { Box, Grid, Heading, Icon, Text } from '@chakra-ui/react'
// import useEosApi from 'context/eosApi'
import PropTypes from 'prop-types'

export default function WeatherCard({
  farmfeeds,
  loading,
  error,
  weatherForeCasts
}) {
  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={8} my={{ md: 8 }}>
      {farmfeeds && (
        <Box
          w='100%'
          rounded='lg'
          filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
          p={6}
          bg='white'
        >
          <Text textAlign='center' fontWeight={300}>
            Plant population
          </Text>
          <Box mt={2}>
            <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
              {farmfeeds[0]?.plantInfo?.population}
            </Heading>
          </Box>
        </Box>
      )}
      {weatherForeCasts && (
        <React.Fragment>
          <Box
            w='100%'
            rounded='lg'
            filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
            p={6}
            bg='white'
          >
            <Text fontWeight={300}>Weather today</Text>
            <Box mt={2}>
              <Icon as={Cloud} boxSize={10} />
              <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
                {(
                  (weatherForeCasts[0]?.Temp_land_min +
                    weatherForeCasts[0]?.Temp_land_max) /
                  2
                )?.toFixed(0)}{' '}
                C
              </Heading>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Grid>
  )
}

WeatherCard.propTypes = {
  farmfeeds: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  weatherForeCasts: PropTypes.any
}
