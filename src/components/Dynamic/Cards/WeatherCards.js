import React from 'react'
import { Cloud } from 'theme/Icons'
import { Box, Grid, Heading, Icon, Text, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function WeatherCard({
  farmfeeds,
  loading,
  error,
  weatherForeCasts
}) {
  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={8} my={{ md: 8 }}>
      {farmfeeds?.length > 0 && (
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
          <Flex mt={2} justify='center' align='center'>
            <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
              {farmfeeds[0]?.plantInfo?.population}
            </Heading>
          </Flex>
        </Box>
      )}
      {weatherForeCasts.length > 0 && (
        <React.Fragment>
          <Box
            w='100%'
            rounded='lg'
            filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
            p={6}
            bg='white'
          >
            <Text fontWeight={300} textAlign='center'>
              Weather today
            </Text>
            <Flex mt={2} align='center' justify='center' direction='column'>
              <Icon as={Cloud} boxSize={10} />
              <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
                {(
                  (weatherForeCasts[0]?.Temp_land_min +
                    weatherForeCasts[0]?.Temp_land_max) /
                  2
                )?.toFixed(0)}{' '}
                C
              </Heading>
            </Flex>
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
