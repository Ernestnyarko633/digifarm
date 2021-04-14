/* eslint-disable no-console */
import React from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'
import FarmBoardEmptyState from 'components/FarmBoard/EmptyState/FarmBoardEmptyState'
import YourFarmCard from '../Cards/YourFarmCard'
import FarmFeedCard from 'components/FarmBoard/Cards/FarmFeedCard'
import NewsCard from 'components/FarmBoard/Cards/NewsCard'
import WeeklyVideoCard from 'components/FarmBoard/Cards/WeeklyVideoCard'
import FetchCard from 'components/FetchCard/index'
// import Crop from 'assets/images/crop.png'
// import SoyaBeanImg from 'assets/images/soya.png'
import PropTypes from 'prop-types'

import useApi from 'context/api'

const FarmBoardContent = ({ farms }) => {
  const { getMyFarmFeeds } = useApi()
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()
  const [activeFarmIndex, setFarmIndex] = React.useState(farms[0])

  const [loading, setLoading] = React.useState(false)
  const [feeds, setFeeds] = React.useState([])

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)
  const [_doc, _setDocData] = React.useState(null)

  const mapKey = i => i

  // const hasBeenRendered = content => {
  //   const isThere = cleaner.find(
  //     feed => feed?.id === content?.id || feed?._id === content?._id
  //   )
  //   if (!isThere?.length) {
  //     setCleaner(p => [...p, content])
  //     return false
  //   }

  //   if (isThere?.length) {
  //     setCleaner(p => [...p, ...isThere])
  //     return true
  //   }
  // }

  const renderCard = (status, content) => {
    switch (status) {
      case 'news':
        return (
          <NewsCard
            activeFarm={activeFarmIndex}
            content={content}
            farms={farms}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
      case 'weekly_videos':
        return (
          <WeeklyVideoCard
            activeFarm={activeFarmIndex}
            content={content}
            farms={farms}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
      default:
        return (
          <FarmFeedCard
            activeFarm={activeFarmIndex}
            content={content}
            farms={farms}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
    }
  }

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        setLoading(true)
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'news')
        )

        if (response) {
          setDocData(response.results)
        }
        setLoading(false)
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, doc])

  React.useEffect(() => {
    let mounted = true
    if (mounted && !_doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'weekly_videos')
        )

        if (response) {
          _setDocData(response.results)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, _doc])

  React.useEffect(() => {
    let mounted = true

    if (mounted) {
      const fetchData = async () => {
        const feedPromises = farms.map(async farm => {
          const response = await getMyFarmFeeds({
            farm: farm?.order?.product?._id
          })
          if (response.data) {
            return response.data
          }
          return []
        })

        const allFeeds = await Promise.all(feedPromises)
        //combining all data now from prismic and farm feeds
        if (allFeeds && doc && _doc) {
          allFeeds.map(f => setFeeds(s => [...s, ...f]))
        }

        // news data
        if (doc) {
          setFeeds(prev => [...prev, ...doc])
        }

        // weekly videos
        if (_doc) {
          setFeeds(prev => [...prev, ..._doc])
        }
        setLoading(false)
      }

      fetchData()
    }

    return () => (mounted = false)
  }, [doc, farms, _doc, getMyFarmFeeds])

  // console.log(
  //   feeds?.filter(
  //     (v, i, a) =>
  //       a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i
  //   ),
  //   'doc'
  // )

  //larger feeds would slow down process
  const cleanedFeeds = feeds?.filter(
    (v, i, a) => a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  console.log(cleanedFeeds)

  return (
    <Flex w='100%' align='center' direction='column'>
      {loading ? (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => null}
          loading={loading}
          error={null}
          text='Stand by as we load your farm board'
        />
      ) : (
        <>
          <YourFarmCard farms={farms} setFarmIndex={setFarmIndex} />
          <Box p={{ base: 4, md: 16 }}>
            {false && feeds}
            <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
              See what's happening in your farm(s)
            </Heading>
            {cleanedFeeds?.length > 0 ? (
              cleanedFeeds.map((content, index) => {
                return (
                  <Fade bottom key={mapKey(index)}>
                    {renderCard(content?.type, content)}
                  </Fade>
                )
              })
            ) : (
              <FarmBoardEmptyState />
            )}
          </Box>
        </>
      )}
    </Flex>
  )
}

FarmBoardContent.propTypes = {
  farms: PropTypes.any
}

export default FarmBoardContent
