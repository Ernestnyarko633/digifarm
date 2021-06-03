import React, { useEffect } from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'
import FarmBoardEmptyState from 'components/FarmBoard/EmptyState/FarmBoardEmptyState'
import YourFarmCard from '../Cards/YourFarmCard'
import FetchCard from 'components/FetchCard/index'
import RenderCards from 'components/FarmBoard/Cards/RenderCards'
import PropTypes from 'prop-types'
import { renderEmpty } from './Cards/RenderCards'
import { useNews, useVideos, useFeeds } from 'hooks/useFarmBoard'
import { useLocation } from 'react-router-dom'

const FarmBoardContent = ({ farms = [] }) => {
  const useQuery = useLocation()
  const [activeFarmIndex, setActiveFarmIndex] = React.useState(0)
  const { loading: newsLoading, news, error: newsError } = useNews()
  const { loading: videosLoading, videos, error: videosError } = useVideos()
  const { loading: feedsLoading, feeds, error: feedsError } = useFeeds()
  const [filter, setFilter] = React.useState(farms.length ? 'feeds' : 'videos')
  const [farmName, setFarmName] = React.useState(
    farms?.length ? farms[0]?.name : null
  )
  let loading = newsLoading || videosLoading || feedsLoading
  let error = newsError || videosError || feedsError

  useEffect(() => {
    let mounted = true

    if (mounted && useQuery.search) {
      if (useQuery.search === '?weekly_videos') setFilter('videos')
      if (useQuery.search === '?news') setFilter('news')
      if (useQuery.search === '?weekly_videos' || useQuery.search === '?news')
        setActiveFarmIndex(null)
    }
    return () => (mounted = false)
  }, [useQuery.search])
  const RenderDataType = filter => {
    const mapKey = i => i

    const data = { news, feeds, videos }
    if (!feeds?.length && !news?.length && !videos?.length) {
      return <FarmBoardEmptyState />
    }

    return Object.keys(data).map(key => {
      let array = []
      if (key === filter && data[key].length) {
        if (key === 'feeds')
          return data[key]?.filter(
            content =>
              farms[activeFarmIndex]?.order?.product?._id === content?.farm
          ).length
            ? (array = data[key]
                ?.filter(
                  content =>
                    farms[activeFarmIndex]?.order?.product?._id ===
                    content?.farm
                )
                .map((content, index) => (
                  <RenderCards
                    key={mapKey(index)}
                    filter={filter}
                    farms={farms}
                    comparant={key}
                    activeFarmIndex={activeFarmIndex}
                    status={content?.type}
                    content={content}
                  />
                )))
            : renderEmpty(key)
        array = data[key]?.map((content, index) => (
          <RenderCards
            key={mapKey(index)}
            filter={filter}
            farms={farms}
            comparant={key}
            activeFarmIndex={activeFarmIndex}
            status={content?.type}
            content={content}
          />
        ))
      } else {
        if (filter === key) {
          return renderEmpty(filter)
        }
      }
      return array
    })
  }

  return (
    <Flex w='100%' align='center' direction='column'>
      {loading || error ? (
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
            filter={filter}
            farms={farms}
            setFilter={setFilter}
            activeFarmIndex={activeFarmIndex}
            setActiveFarmIndex={setActiveFarmIndex}
            farmName={farmName}
            setFarmName={setFarmName}
          />
          <Box p={{ base: 4, md: 16 }}>
            <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
              {feeds?.length && farms?.length
                ? "See what's happening in your farm(s)"
                : news?.length || videos?.length
                ? "See what's happening"
                : ''}
            </Heading>
            {RenderDataType(filter)}
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
