/* eslint-disable no-console */
import React from 'react'
import getConfig from 'utils/configs'
import Prismic from 'prismic-javascript'
import useApi from 'context/api'
import useFetch from './useFetch'
import { latestDateForFarmFeed } from 'helpers/misc'

const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

const Client = Prismic.client(PRISMIC_API, {
  accessToken: PRISMIC_ACCESS_TOKEN
})

export const usePrismic = () => {
  const [news, setNewsData] = React.useState(null)
  const [videos, setVideosData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    let mounted = true
    if ((mounted && !news) || !videos) {
      const fetchData = async () => {
        try {
          setLoading(true)
          // await news and video prismic documents
          const [news_response, video_response] = await Promise.all([
            Client.query(Prismic.Predicates.at('document.type', 'news')),
            Client.query(
              Prismic.Predicates.at('document.type', 'weekly_videos')
            )
          ])

          // if response exists set the corresponding data
          if (news_response) setNewsData(news_response?.results || [])
          if (video_response) setVideosData(video_response?.results || [])
        } catch (err) {
          // catch errors if any and st them
          setError(err?.message || err || 'Could not fetch data')
        } finally {
          //finally set loading too false
          setLoading(false)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [news, videos])

  // returns and obj {loading, news, blogs, videos, errors} includes sorting according to dates
  return {
    loading,
    news:
      news
        ?.filter(
          news =>
            news?.data?.category === 'News' || news?.data?.category === null
        )
        ?.slice()
        ?.sort(
          (a, b) =>
            new Date(b.first_publication_date) -
            new Date(a.first_publication_date)
        ) || [],
    blogs:
      news
        ?.filter(blog => blog?.data?.category === 'Blog Post')
        ?.slice()
        ?.sort(
          (a, b) =>
            new Date(b.first_publication_date) -
            new Date(a.first_publication_date)
        ) || [],
    videos:
      videos
        ?.slice()
        ?.sort(
          (a, b) =>
            new Date(b.first_publication_date) -
            new Date(a.first_publication_date)
        ) || [],
    error
  }
}

export const useFeeds = () => {
  const [feeds, setFeeds] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [reload, setReload] = React.useState(0)
  const { getMyFarmFeeds, getMyFarms } = useApi()

  const triggerReload = () => setReload(r => r + 1)
  const {
    data: farms,
    isLoading: farmsIsLoading,
    error: farmsHasError
  } = useFetch('my_farms', getMyFarms, reload)

  React.useEffect(() => {
    let mounted = true

    if (mounted && farms && feeds === null) {
      const fetchData = async () => {
        try {
          setLoading(true)

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
          if (allFeeds?.length) {
            allFeeds.map(f =>
              setFeeds(s => (!s ? [...[], ...f] : [...s, ...f]))
            )
          } else {
            setFeeds([])
          }
        } catch (error) {
          setFeeds([])
          setError(error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    } else {
      let row = false
      row && !error && !feeds?.length && triggerReload()
    }
    return () => (mounted = false)
  }, [farms, getMyFarmFeeds, feeds, error])

  return {
    loading: farmsIsLoading || loading,
    feeds: feeds
      ?.slice()
      ?.sort(
        (a, b) =>
          new Date(latestDateForFarmFeed(b)) -
          new Date(latestDateForFarmFeed(a))
      ),
    error: farmsHasError || error
  }
}
