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
          const [res1, res2] = await Promise.all([
            Client.query(Prismic.Predicates.at('document.type', 'news')),
            Client.query(
              Prismic.Predicates.at('document.type', 'weekly_videos')
            )
          ])
          if (res1) setNewsData(res1?.results || [])
          if (res2) setVideosData(res2?.results || [])
        } catch (err) {
          setError('Could not fetch data')
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
    return () => (mounted = false)
  }, [news, videos])

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

    if (mounted && !feeds) {
      setLoading(true)

      const fetchData = async () => {
        try {
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
          if (allFeeds) {
            allFeeds.map(f =>
              setFeeds(s => (!s ? [...[], ...f] : [...s, ...f]))
            )
          }
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }

      if (farms && !feeds) {
        fetchData()
      }
    } else {
      error && !feeds?.length && triggerReload()
    }

    return () => (mounted = false)
  }, [farms, getMyFarmFeeds, feeds, error])

  //FIXME: larger feeds would slow down process

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
