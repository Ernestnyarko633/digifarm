import React from 'react'
import { Box, Grid, Heading, Text, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FetchCard from 'components/FetchCard'

const WeatherCard = ({
  farmfeeds,
  weatherForeCasts,
  WeatherForeCastsIsLoading,
  WeatherForeCastsHasError,
  farmFeedsIsLoading,
  farmFeedsHasError,
  reloads
}) => {
  return (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={8} my={{ md: 8 }}>
      {farmFeedsIsLoading || farmFeedsHasError ? (
        <Box pt={{ base: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => reloads[2]()}
            loading={farmFeedsIsLoading}
            error={farmFeedsHasError}
            text={"Standby as we load your farm's feed"}
          />
        </Box>
      ) : (
        <>
          {farmfeeds?.length > 0 && (
            <Box
              w='100%'
              rounded='lg'
              filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
              p={6}
              minH={{ base: 150 }}
              bg='white'
            >
              <Text textAlign='center' fontWeight={300}>
                Plant population
              </Text>
              <Flex mt={2} justify='center' align='center'>
                <Heading fontSize={{ md: '3xl' }} fontWeight={900} mt={1}>
                  {
                    farmfeeds[farmfeeds?.length - 1]?.feed?.plantInfo
                      ?.population
                  }
                </Heading>
              </Flex>
            </Box>
          )}
        </>
      )}

      {WeatherForeCastsIsLoading || WeatherForeCastsHasError ? (
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
            text={"Standby as we load your farm's feed"}
          />
        </Box>
      ) : (
        <>
          {weatherForeCasts.length > 0 && (
            <Box
              w='100%'
              rounded='lg'
              filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
              p={6}
              minH={{ base: 150 }}
              bg='white'
            >
              <Text fontWeight={300} textAlign='center'>
                Weather today
              </Text>
              <Flex mt={2} align='center' justify='center' direction='column'>
                {/* <Icon as={Cloud} boxSize={10} /> */}
                <Heading fontSize={{ md: '3xl' }} fontWeight={900} mt={1}>
                  {(
                    (weatherForeCasts[0]?.Temp_land_min +
                      weatherForeCasts[0]?.Temp_land_max) /
                    2
                  )?.toFixed(0)}{' '}
                  C
                </Heading>
              </Flex>
            </Box>
          )}
        </>
      )}
    </Grid>
  )
}

WeatherCard.propTypes = {
  farmfeeds: PropTypes.any,
  weatherForeCasts: PropTypes.any,
  WeatherForeCastsIsLoading: PropTypes.bool,
  farmFeedsIsLoading: PropTypes.bool,
  WeatherForeCastsHasError: PropTypes.any,
  farmFeedsHasError: PropTypes.any,
  reloads: PropTypes.array
}

export default WeatherCard
