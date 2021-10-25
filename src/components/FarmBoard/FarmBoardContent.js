import React, { useEffect } from 'react'
import { Heading, Flex, Box, Text } from '@chakra-ui/react'
import FarmFeedCard from 'components/FarmBoard/Cards/FarmFeedCard'
import NewsCard from 'components/FarmBoard/Cards/NewsCard'
import YourFarmCard from '../Cards/YourFarmCard'
import WeeklyVideoCard from 'components/FarmBoard/Cards/WeeklyVideoCard'
import FetchCard from 'components/FetchCard/index'
import PropTypes from 'prop-types'
import { usePrismic, useFeeds } from 'hooks/useFarmBoard'
import { latestDateForFarmFeed } from 'helpers/misc'
import { useLocation } from 'react-router-dom'
import { checkProperties } from 'helpers/misc'

const FarmBoardContent = ({ farms = [] }) => {
  const [component, setComponent] = React.useState('FEEDS')
  const [hasBeenClicked, setHasBeenClicked] = React.useState(false)
  const useQuery = () => new URLSearchParams(useLocation().search)

  //initial states
  const [activeFarmIndex, setActiveFarmIndex] = React.useState(0)
  const {
    loading: prismicLoading,
    news,
    videos,
    blogs,
    error: prismicError
  } = usePrismic()
  const { loading: feedsLoading, feeds, error: feedsError } = useFeeds()
  const queriedElement = React.useRef(null)
  const [farmName, setFarmName] = React.useState(
    farms?.length ? farms[0]?.name : null
  )

  const executeScroll = () => queriedElement?.current?.scrollIntoView()

  //changing state variables
  let loading = prismicLoading || feedsLoading
  let error = prismicError || feedsError

  // initializing useQuery hook
  let q = useQuery()

  // returns a memorized value. anytime q changes
  const query = React.useMemo(
    () => ({
      type: q.get('type'),
      id: q.get('id'),
      title: q.get('title')
    }),
    [q]
  )

  //this hook runs if theres query
  useEffect(() => {
    //if all values of query are present
    if (checkProperties(query)) {
      //set filter to type 'news' or 'videos'
      if (query?.type === 'NEWS') {
        const isBlog = blogs?.find(item => item?.id === query?.id)
        const isNews = news?.find(item => item?.id === query?.id)
        if (isBlog) {
          setComponent('BLOGS')
        }
        if (isNews) {
          setComponent('NEWS')
        }
      } else {
        if (query.type === 'weekly_videos') {
          setComponent('VIDEOS')
        } else {
          setComponent('FEEDS')
        }
      }

      // make sure index of farm is null
      setActiveFarmIndex(null)
    }
  }, [blogs, news, query])

  // lifecycle component that executes when query filter or activeFarmIndex has changes
  // positions content to screen or scrolls to content
  useEffect(() => {
    let mounted = true
    if (mounted && hasBeenClicked) {
      executeScroll()
      setHasBeenClicked(false)
    }
    return () => (mounted = false)
  }, [component, activeFarmIndex, query, hasBeenClicked])

  const mapKey = i => i

  const EmptyComponent = ({ type }) => (
    <Flex w='100%' align='center' justify='center'>
      <Text color='cf.green' fontSize={{ base: 'md' }}>
        Oops, {type} unavailable currently
      </Text>
    </Flex>
  )

  EmptyComponent.propTypes = {
    type: PropTypes.string
  }

  const DECISION = {
    FEEDS: feeds?.filter(
      feed => farms[activeFarmIndex]?.order?.product?._id === feed?.farm
    )?.length ? (
      feeds
        ?.filter(
          feed => farms[activeFarmIndex]?.order?.product?._id === feed?.farm
        )
        ?.map((feed, index) => (
          <FarmFeedCard
            key={mapKey(index)}
            activeFarm={farms[activeFarmIndex]}
            content={feed}
            loading={loading}
            status='FEEDS'
            timestamp={new Date(
              latestDateForFarmFeed(feed)
            ).toLocaleDateString()}
          />
        ))
    ) : (
      <EmptyComponent type='Feeds' />
    ),
    VIDEOS: videos?.length ? (
      videos?.map((video, index) => {
        return (
          <WeeklyVideoCard
            key={mapKey(index)}
            content={video}
            status='VIDEOS'
            loading={loading}
          />
        )
      })
    ) : (
      <EmptyComponent type='Videos' />
    ),

    NEWS: news?.length ? (
      news?.map((newsItem, index) => {
        return (
          <NewsCard
            key={mapKey(index)}
            content={newsItem}
            status='NEWS'
            loading={loading}
          />
        )
      })
    ) : (
      <EmptyComponent type='News' />
    ),

    BLOGS: blogs?.length ? (
      blogs?.map((blog, index) => {
        return (
          <NewsCard
            key={mapKey(index)}
            content={blog}
            status='BLOGS'
            loading={loading}
          />
        )
      })
    ) : (
      <EmptyComponent type='Blogs' />
    )
  }

  return (
    <Flex w='100%' align='center' direction='column' mt={{ base: 16, md: 0 }}>
      {loading ? (
        <>
          <FetchCard
            p={15}
            direction='column'
            align='center'
            justify='center'
            mx='auto'
            reload={() => null}
            loading={loading}
            error={error}
            text='Stand by as we load your farm board'
          />
        </>
      ) : (
        <>
          <YourFarmCard
            filter={component}
            farms={farms}
            setHasBeenClicked={setHasBeenClicked}
            setFilter={setComponent}
            activeFarmIndex={activeFarmIndex}
            setActiveFarmIndex={setActiveFarmIndex}
            farmName={farmName}
            setFarmName={setFarmName}
          />
          <Box p={{ base: 4, md: 16 }} ref={queriedElement}>
            <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
              {feeds?.length && farms?.length
                ? "See what's happening in your farm(s)"
                : news?.length || videos?.length
                ? "See what's happening"
                : ''}
            </Heading>
            <Box> {DECISION[component]} </Box>
          </Box>
        </>
      )}
    </Flex>
  )
}

FarmBoardContent.propTypes = {
  farms: PropTypes.array.isRequired,
  farmLoader: PropTypes.bool
}

export default FarmBoardContent
