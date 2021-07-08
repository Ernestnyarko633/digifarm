import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmFeedCard from 'components/FarmBoard/Cards/FarmFeedCard'
import NewsCard from 'components/FarmBoard/Cards/NewsCard'
import WeeklyVideoCard from 'components/FarmBoard/Cards/WeeklyVideoCard'
import { latestDateForFarmFeed } from 'helpers/misc'

const RenderCards = ({
  status,
  content,
  filter,
  farms,
  activeFarmIndex,
  comparant,
  loading
}) => {
  // switch for data type using status
  const renderCard = (status, content) => {
    switch (status) {
      case 'news':
        return (
          <>
            {filter === comparant && (
              <NewsCard content={content} status={status} loading={loading} />
            )}
          </>
        )
      case 'weekly_videos':
        return (
          <>
            {filter === comparant && (
              <WeeklyVideoCard
                content={content}
                status={status}
                loading={loading}
              />
            )}
          </>
        )
      default:
        return (
          <>
            {filter === comparant &&
              farms[activeFarmIndex]?.order?.product?._id === content?.farm && (
                <FarmFeedCard
                  activeFarm={farms[activeFarmIndex]}
                  content={content}
                  loading={loading}
                  status={status}
                  timestamp={new Date(
                    latestDateForFarmFeed(content)
                  ).toLocaleDateString()}
                />
              )}
          </>
        )
    }
  }

  return renderCard(status, content)
}

export const renderEmpty = type => {
  return (
    <Flex w='100%' align='center' justify='center'>
      <Text color='cf.green' fontSize={{ base: 'md' }}>
        Oops, {type} unavailable currently
      </Text>
    </Flex>
  )
}

RenderCards.propTypes = {
  status: PropTypes.any,
  content: PropTypes.object,
  filter: PropTypes.string,
  farms: PropTypes.array,
  activeFarmIndex: PropTypes.number,
  comparant: PropTypes.string,
  loading: PropTypes.bool
}

export default RenderCards
