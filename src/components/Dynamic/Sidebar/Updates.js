import { Grid, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Updates as FarmUpdates } from 'theme/Icons'
import FarmUpdateCard from '../Cards/FarmUpdateCard'

export default function Updates({ farmfeeds, error }) {
  return (
    <React.Fragment>
      <Grid gap={8} mb={8}>
        {farmfeeds?.length > 0 &&
          farmfeeds?.map(feed => (
            <FarmUpdateCard
              key={feed._id}
              title='FARM MANAGER UPDATES'
              duration={`${feed?.task?.duration} h`}
              subtitle={`${feed?.task?.title}`}
              text={feed?.summary.replace(/<[^>]*>/g, '')}
              icon={FarmUpdates}
            />
          ))}
      </Grid>
      {farmfeeds?.length === 0 && (
        <Flex w='100%' justify='center' align='center'>
          <Text w='100%' fontSize='xl' color='cf.400'>
            NO UPDATES CURRENTLY AVAILABLE
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
