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
  const renderCard = (s, c) => {
    switch (s) {
      case 'news':
        return (
          <>
            {filter === comparant && (
              <NewsCard content={c} status={s} loading={loading} />
            )}
          </>
        )
      case 'weekly_videos':
        return (
          <>
            {filter === comparant && (
              <WeeklyVideoCard content={c} status={s} loading={loading} />
            )}
          </>
        )
      default:
        return (
          <>
            {filter === comparant &&
              farms[activeFarmIndex]?.order?.product?._id === c?.farm && (
                <FarmFeedCard
                  activeFarm={farms[activeFarmIndex]}
                  content={c}
                  loading={loading}
                  status={s}
                  timestamp={new Date(
                    latestDateForFarmFeed(c)
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
