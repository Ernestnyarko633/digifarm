import React from 'react'
import PropTypes from 'prop-types'
import { Text, Flex, Box } from '@chakra-ui/react'
import FetchCard from 'components/FetchCard'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({
  eosStats,
  EOSStatisticsIsLoading,
  EOSStatisticsHasError
}) {
  return (
    <Box>
      {EOSStatisticsIsLoading || EOSStatisticsHasError ? (
        <Box pt={{ md: 10 }}>
          <FetchCard
            direction='column'
            align='center'
            justify='center'
            w='100%'
            mx='auto'
            reload={() => null}
            loading={EOSStatisticsIsLoading}
            error={EOSStatisticsHasError}
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
            <Flex>
              <Text>
                Crop health is currently unvailable, it would be updated as soon
                as possible.
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
  EOSStatisticsHasError: PropTypes.any
}
