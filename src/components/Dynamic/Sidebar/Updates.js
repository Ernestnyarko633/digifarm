import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Updates as FarmUpdates } from 'theme/Icons'
import FetchCard from 'components/FetchCard'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates({
  farmfeeds,
  farmFeedsIsLoading,
  farmFeedsHasError,
  reloads
}) {
  const [feeds, setFeeds] = React.useState([])
  React.useEffect(() => {
    const getFeeds = () =>
      farmfeeds?.forEach(feed => {
        setFeeds(p => [...p, ...feed.data])
      })

    getFeeds()
  }, [farmfeeds])
  const sortedFeeds = feeds
    ?.slice()
    ?.sort((a, b) => new Date(b.feed?.updatedAt) - new Date(a.feed?.updatedAt))
    ?.filter(
      (feed, index, self) =>
        self.findIndex(
          item => JSON.stringify(item) === JSON.stringify(feed)
        ) === index
    )

  return (
    <>
      {farmFeedsIsLoading || farmFeedsHasError ? (
        <Box pt={{ md: 10 }}>
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
          <Grid gap={8} mx={8} my={8}>
            {sortedFeeds?.length > 0 &&
              sortedFeeds?.map(feed => (
                <FarmUpdateCard
                  key={feed._id}
                  title='FARM MANAGER UPDATES'
                  duration={new Date(
                    feed?.feed?.updatedAt
                  ).toLocaleDateString()}
                  subtitle={`${feed?.task?.title}`}
                  text={feed?.feed?.summary.replace(/<[^>]*>/g, '')}
                  icon={FarmUpdates}
                />
              ))}
          </Grid>
          {sortedFeeds?.length === 0 && (
            <Flex w='100%' justify='center' align='center'>
              <Text w='100%' fontSize='xl' color='cf.800' textAlign='center'>
                No updates currently available.
              </Text>
            </Flex>
          )}
        </>
      )}
    </>
  )
}
Updates.propTypes = {
  farmfeeds: PropTypes.any,
  farmFeedsIsLoading: PropTypes.bool,
  farmFeedsHasError: PropTypes.any,
  reloads: PropTypes.array
}
