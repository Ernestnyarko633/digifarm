/* eslint-disable no-console */
import React from 'react'
import { Heading, Flex, Box, Text } from '@chakra-ui/react'
import FarmBoardEmptyState from 'components/FarmBoard/EmptyState/FarmBoardEmptyState'
import YourFarmCard from '../Cards/YourFarmCard'
import FarmFeedCard from 'components/FarmBoard/Cards/FarmFeedCard'
import NewsCard from 'components/FarmBoard/Cards/NewsCard'
import WeeklyVideoCard from 'components/FarmBoard/Cards/WeeklyVideoCard'
import FetchCard from 'components/FetchCard/index'
import PropTypes from 'prop-types'
import { useNews, useVideos, useFeeds } from 'hooks/useFarmBoard'

const FarmBoardContent = ({ farms = [] }) => {
  const [activeFarmIndex, setActiveFarmIndex] = React.useState(0)
  const { loading: newsLoading, news, error: newsError } = useNews()
  const { loading: videosLoading, videos, error: videosError } = useVideos()
  const { loading: feedsLoading, feeds, error: feedsError } = useFeeds()
  const [filter, setFilter] = React.useState(
    farms.length ? 'all' : 'weekly videos'
  )
  const [farmName, setFarmName] = React.useState(
    farms?.length ? farms[0]?.name : null
  )
  let loading = newsLoading || videosLoading || feedsLoading
  let error = newsError || videosError || feedsError

  const renderEmpty = ({ type }) => {
    return (
      <Flex w='100%' align='center' justify='center'>
        <Text color='cf.800' fontSize={{ base: 'md' }}>
          Oops, unavailable currently
        </Text>
      </Flex>
    )
  }

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
          <React.Fragment>
            {filter === 'weekly videos' && (
              <WeeklyVideoCard
                activeFarm={farms[activeFarmIndex]}
                content={content}
                status={status}
                timestamp={new Date(
                  content?.data?.created || new Date()
                )?.toLocaleDateString()}
              />
            )}
          </React.Fragment>
        )
      default:
        return (
          <>
            {filter === 'all' &&
              farms[activeFarmIndex]?.order?.product?._id === content?.farm && (
                <FarmFeedCard
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
    }
  }

  return (
    <Flex w='100%' align='center' direction='column'>
      {loading && !feeds.length ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => null}
          loading={loading}
          error={error}
          text='Stand by as we load your farm board'
        />
      ) : (
        <>
          {feeds?.length > 0 && (
            <YourFarmCard
              filter={filter}
              farms={farms}
              setFilter={setFilter}
              activeFarmIndex={activeFarmIndex}
              setActiveFarmIndex={setActiveFarmIndex}
              farmName={farmName}
              setFarmName={setFarmName}
            />
          )}
          <Box p={{ base: 4, md: 16 }}>
            <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
              {feeds?.length && farms?.length
                ? "See what's happening in your farm(s)"
                : news?.length || videos?.length
                ? "See what's happening"
                : ''}
            </Heading>

            {feeds?.length > 0 && filter === 'all'
              ? feeds.map(content => {
                  return <>{renderCard(content?.type, content)}</>
                })
              : filter === 'all' && renderEmpty('Feeds')}
            {news?.length > 0 && filter === 'news'
              ? news?.map(content => {
                  return <>{renderCard(content?.type, content)}</>
                })
              : filter === 'news' && renderEmpty('News')}
            {videos?.length > 0 && filter === 'weekly videos'
              ? videos?.map(content => {
                  return <>{renderCard(content?.type, content)}</>
                })
              : filter === 'weekly videos' && renderEmpty('Videos')}

            {!feeds?.length && !news?.length && !videos?.length && (
              <FarmBoardEmptyState />
            )}
          </Box>
        </>
      )}
    </Flex>
  )
}

FarmBoardContent.propTypes = {
  farms: PropTypes.array.isRequired
}

export default FarmBoardContent
