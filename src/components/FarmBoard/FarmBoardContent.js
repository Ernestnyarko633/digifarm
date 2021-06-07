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
import { checkProperties } from 'helpers/misc'

const FarmBoardContent = ({ farms = [] }) => {
  //using function to query search params
  const useQuery = () => new URLSearchParams(useLocation().search)

  //initial states
  const [activeFarmIndex, setActiveFarmIndex] = React.useState(0)
  const { loading: newsLoading, news, error: newsError } = useNews()
  const { loading: videosLoading, videos, error: videosError } = useVideos()
  const { loading: feedsLoading, feeds, error: feedsError } = useFeeds()
  const [filter, setFilter] = React.useState(farms.length ? 'feeds' : 'videos')
  const queriedElement = React.useRef(null)
  const [farmName, setFarmName] = React.useState(
    farms?.length ? farms[0]?.name : null
  )

  const executeScroll = () => queriedElement?.current?.scrollIntoView()

  //changing state variables
  let loading = newsLoading || videosLoading || feedsLoading
  let error = newsError || videosError || feedsError

  // initialising useQuery hook
  let q = useQuery()

  // returns a memorised value. antime q changes
  const query = React.useMemo(
    () => [
      {
        type: q.get('type'),
        id: q.get('id'),
        title: q.get('title')
      }
    ],
    [q]
  )

  //this hook runs if theres query
  useEffect(() => {
    //if all values of query are present
    if (checkProperties(query[0])) {
      //set filter to type 'news' or 'videos'
      setFilter(query[0].type)

      // make sure index of farm is null
      setActiveFarmIndex(null)
    }
  }, [query])

  //handles all rending of the board's content
  const RenderDataType = filter => {
    const mapKey = i => i
    // data is an object with fields newsm feeds and videos represents each board data type
    const data = { news, feeds, videos }

    //if we dont have any data return empty state
    if (!feeds?.length && !news?.length && !videos?.length) {
      return <FarmBoardEmptyState />
    }

    //proceed to render.
    return Object.keys(data).map(key => {
      let array = []
      // if filter is equal to current key and has data
      if (key === filter && data[key].length) {
        // if key is feeds filter the feed by farm and render else render empty for that farm
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

        //if key was not equal to feed filter if there is query[0] in params else return all data if there's none. key should be equal to filter as usual
        array = data[key]
          ?.filter(content =>
            checkProperties(query[0]) ? content.id === query[0]?.id : {}
          )
          .map((content, index) => (
            <RenderCards
              ref={queriedElement}
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
        //if empty render empty component
        if (filter === key) {
          return renderEmpty(filter)
        }
      }
      // return array
      return array
    })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) executeScroll()
    return () => (mounted = false)
  }, [filter, activeFarmIndex, query])

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
            <Box ref={queriedElement}>{RenderDataType(filter)}</Box>
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
