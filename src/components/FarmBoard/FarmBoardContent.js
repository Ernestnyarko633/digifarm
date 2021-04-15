/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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
//import { StyledCountrySelectDropdownDialcodeColumn } from 'baseui/phone-input'

const FarmBoardContent = ({ farms }) => {
  const [activeFarmIndex, setFarmIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [feeds, setFeeds] = React.useState([])
  const [news, setNewsData] = React.useState(null)
  const [videos, setVideosData] = React.useState(null)

  const { getMyFarmFeeds } = useApi()
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  React.useEffect(() => {
    let mounted = true
    if (mounted && !news && !videos) {
      const fetchData = async () => {
        try {
          setLoading(true)
          const [res1, res2] = await Promise.all([
            Client.query(Prismic.Predicates.at('document.type', 'news')),
            Client.query(
              Prismic.Predicates.at('document.type', 'weekly_videos')
            )
          ])
          if (res1) setNewsData(res1.results)
          if (res2) setVideosData(res2.results)
        } catch (err) {
          setError('Could not fetch data')
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [Client, news, videos])

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
        if (allFeeds && news && videos) {
          allFeeds.map(f => setFeeds(s => [...s, ...f]))
        }

        // news data
        if (news) {
          setFeeds(prev => [...prev, ...news])
        }

        // weekly videos
        if (videos) {
          setFeeds(prev => [...prev, ...videos])
        }

        setLoading(false)
      }

      fetchData()
    }

    return () => (mounted = false)
  }, [news, farms, videos, getMyFarmFeeds])

  //FIXME: larger feeds would slow down process
  const cleanedFeeds = feeds?.filter(
    (v, i, a) => a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i
  )

  const mapKey = i => i

  const renderCard = (status, content) => {
    switch (status) {
      case 'news':
        return (
          <NewsCard
            activeFarm={farms[activeFarmIndex]}
            content={content}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
      case 'weekly_videos':
        return (
          <WeeklyVideoCard
            activeFarm={farms[activeFarmIndex]}
            content={content}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
      default:
        return (
          <FarmFeedCard
            activeFarm={farms[activeFarmIndex]}
            content={content}
            status={status}
            timestamp={new Date(
              content?.data?.created || new Date()
            )?.toLocaleDateString()}
          />
        )
    }
  }

  return (
    <Flex w='100%' align='center' direction='column'>
      {loading && !cleanedFeeds ? (
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
            <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
              {cleanedFeeds.length
                ? "See what's happening in your farm(s)"
                : ''}
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
