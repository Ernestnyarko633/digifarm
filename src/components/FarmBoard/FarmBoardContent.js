/* eslint-disable no-console */
import React from 'react'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Fade from 'react-reveal/Fade'
import Prismic from 'prismic-javascript'
import getConfig from 'utils/configs'

import FarmBoardCard from '../Cards/FarmBoardCard'
import YourFarmCard from '../Cards/YourFarmCard'
// import Crop from 'assets/images/crop.png'
// import SoyaBeanImg from 'assets/images/soya.png'
import PropTypes from 'prop-types'

import useApi from 'context/api'

const FarmBoardContent = ({ farms }) => {
  const { getMyFarmFeeds } = useApi()
  const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()
  const [activeFarmIndex, setFarmIndex] = React.useState(farms[0])
  const [feeds, setFeeds] = React.useState([])

  const Client = Prismic.client(PRISMIC_API, {
    accessToken: PRISMIC_ACCESS_TOKEN
  })

  const [doc, setDocData] = React.useState(null)
  const [_doc, _setDocData] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if (mounted && !doc) {
      const fetchData = async () => {
        const response = await Client.query(
          Prismic.Predicates.at('document.type', 'news')
        )

        if (response) {
          setDocData(response.results)
        }
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

        if (allFeeds && doc && _doc) {
          allFeeds.map(f => setFeeds(s => [...s, ...f]))
        }

        if (doc) {
          setFeeds(prev => [...prev, ...doc])
        }

        if (_doc) {
          setFeeds(prev => [...prev, ..._doc])
        }
      }

      fetchData()
    }

    return () => (mounted = false)
  }, [doc, farms, _doc, getMyFarmFeeds])

  console.log(_doc, 'doc')
  return (
    <Flex w='100%' align='center' direction='column'>
      <YourFarmCard farms={farms} setFarmIndex={setFarmIndex} />
      <Box p={{ base: 4, md: 16 }}>
        {false && feeds}
        <Heading as='h3' fontSize={{ md: 'xl' }} textAlign='center' mb={10}>
          See what's happening in your farm(s)
        </Heading>
        {feeds?.length > 0 &&
          feeds?.map(farm => {
            return (
              <Fade bottom key={farm.id}>
                <FarmBoardCard
                  doc={farm}
                  farms={farms}
                  content={farm}
                  status={farm?.type}
                  actionBtnTitle={farms[0]?.btntitle}
                  actionTag={farms[0]?.tag}
                  timestamp={new Date(
                    farm?.data?.created || new Date()
                  )?.toLocaleDateString()}
                  actionText={farms[0].actionText}
                  actionTitle={farms[0].actionTitle}
                  activeFarm={activeFarmIndex}
                />
              </Fade>
            )
          })}
      </Box>
    </Flex>
  )
}

FarmBoardContent.propTypes = {
  farms: PropTypes.any
}

export default FarmBoardContent
