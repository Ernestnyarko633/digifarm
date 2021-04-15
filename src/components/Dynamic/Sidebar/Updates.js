import { Grid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Updates as FarmUpdates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates({ farmfeeds, error }) {
  const [feeds, setFeeds] = React.useState([])
  React.useEffect(() => {
    const getFeeds = () =>
      farmfeeds?.forEach(feed => {
        setFeeds(p => [...p, ...feed.data])
      })

    getFeeds()
  }, [farmfeeds])
  return (
    <React.Fragment>
      <Grid gap={8} mb={8}>
        {feeds?.length > 0 &&
          feeds?.map(feed => (
            <FarmUpdateCard
              key={feed._id}
              title='FARM MANAGER UPDATES'
              duration={`${feed?.task?.duration} h`}
              subtitle={`${feed?.task?.title}`}
              text={feed?.feed?.summary.replace(/<[^>]*>/g, '')}
              icon={FarmUpdates}
            />
          ))}
      </Grid>
      {farmfeeds?.length === 0 && (
        <Flex w='100%' justify='center' align='center'>
          <Text
            w='100%'
            fontSize='xl'
            color='cf.400'
            textAlign={{ base: 'center', md: 'initial' }}
          >
            No updates currently available.
          </Text>
        </Flex>
      )}
    </React.Fragment>
  )
}
Updates.propTypes = {
  farmfeeds: PropTypes.any,
  error: PropTypes.any
}
