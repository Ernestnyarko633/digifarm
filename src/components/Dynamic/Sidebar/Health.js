import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@chakra-ui/react'
import FetchCard from 'components/FetchCard'
import CropHealthCard from '../Cards/CropHealthCard'
import useFarm from 'context/farm'

export default function Health() {
  const {
    EOSStatisticsIsLoading,
    EOSStatisticsHasError,
    eosTaskHasError,
    eosTaskIsLoading,
    _eosTaskRefetch,
    triggerEosStatsReload,
    EOSStatistics: eosStats
  } = useFarm()

  return (
    <Box mx={8} my={8}>
      {EOSStatisticsIsLoading ||
      EOSStatisticsHasError ||
      eosTaskHasError ||
      eosTaskIsLoading ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => {
              eosTaskHasError && _eosTaskRefetch()
              EOSStatisticsHasError && triggerEosStatsReload()
            }}
            loading={EOSStatisticsIsLoading || eosTaskIsLoading}
            error={EOSStatisticsHasError || eosTaskHasError}
            text={"Standby as we load your farm's stats"}
          />
        </Box>
      ) : (
        <>
          {eosStats?.length > 0 &&
            eosStats?.map(stat => (
              <CropHealthCard
                key={stat?.date}
                date={stat?.date}
                eosStat={stat}
              />
            ))}

          {!EOSStatisticsHasError && !eosStats?.length && (
            <Flex w='100%' justify='center' align='center'>
              <Text w='100%' color='cf.green' fontSize='xl' textAlign='center'>
                Crop health is currently unavailable, it would be updated as
                soon as possible.
              </Text>
            </Flex>
          )}
        </>
      )}
    </Box>
  )
}

Health.propTypes = {
  eosStats: PropTypes.any,
  EOSStatisticsIsLoading: PropTypes.bool,
  EOSStatisticsHasError: PropTypes.any,
  eosTaskIsLoading: PropTypes.bool,
  eosTaskHasError: PropTypes.any,
  reloads: PropTypes.array
}
