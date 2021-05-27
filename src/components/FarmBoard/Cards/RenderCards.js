/* eslint-disable no-console */
import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FarmFeedCard from 'components/FarmBoard/Cards/FarmFeedCard'
import NewsCard from 'components/FarmBoard/Cards/NewsCard'
import WeeklyVideoCard from 'components/FarmBoard/Cards/WeeklyVideoCard'
import { latestDateForFarmFeed } from 'helpers/misc'

const RenderCards = ({ status, content, filter, farms, activeFarmIndex }) => {
  const renderCard = (status, content) => {
    switch (status) {
      case 'news':
        return (
          <>
            {filter === 'news' && (
              <NewsCard
                activeFarm={farms[activeFarmIndex]}
                content={content}
                status={status}
                timestamp={new Date(
                  content?.data?.created || new Date()
                )?.toLocaleDateString()}
              />
            )}
          </>
        )
      case 'weekly_videos':
        return (
          <>
            {filter === 'videos' && (
              <WeeklyVideoCard
                activeFarm={farms[activeFarmIndex]}
                content={content}
                status={status}
                timestamp={new Date(
                  content?.data?.created || new Date()
                )?.toLocaleDateString()}
              />
            )}
          </>
        )
      default:
        return (
          <>
            {filter === 'feeds' &&
              farms[activeFarmIndex]?.order?.product?._id === content?.farm && (
                <FarmFeedCard
                  activeFarm={farms[activeFarmIndex]}
                  content={content}
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

export const renderEmpty = () => {
  return (
    <Flex w='100%' align='center' justify='center'>
      <Text color='cf.800' fontSize={{ base: 'md' }}>
        Oops, unavailable currently
      </Text>
    </Flex>
  )
}

RenderCards.propTypes = {
  status: PropTypes.any,
  content: PropTypes.object,
  filter: PropTypes.string,
  farms: PropTypes.array,
  activeFarmIndex: PropTypes.number
}

export default RenderCards
