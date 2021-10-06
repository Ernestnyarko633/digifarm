/* eslint-disable no-console */
import React from 'react'
import getConfig from 'utils/configs'
import Prismic from 'prismic-javascript'
import useApi from 'context/api'
import { latestDateForFarmFeed } from 'helpers/misc'
import useComponent from 'context/component'
import { useQuery } from 'react-query'

const { PRISMIC_API, PRISMIC_ACCESS_TOKEN } = getConfig()

const Client = Prismic.client(PRISMIC_API, {
  accessToken: PRISMIC_ACCESS_TOKEN
})

export const usePrismic = () => {
  const [news, setNewsData] = React.useState(null)
  const [videos, setVideosData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [comments, setComments] = React.useState(null)
  const { inViewProduct: farm } = useComponent()

  React.useEffect(() => {
    let mounted = true
    if (mounted && (!news || !videos)) {
      const fetchData = async () => {
        try {
          setLoading(true)
          // await news and video prismic documents
          const [news_response, video_response] = await Promise.all([
            Client.query(Prismic.Predicates.at('document.type', 'news'), {
              pageSize: 200
            }),
            Client.query(
              Prismic.Predicates.at('document.type', 'weekly_videos'),
              { pageSize: 200 }
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

  React.useEffect(() => {
    let mounted = true
    if (mounted && !comments) {
      const fetchData = async () => {
        try {
          setLoading(true)
          const dataFromStorage = JSON.parse(
            sessionStorage.getItem('farm_comments')
          )
          if (dataFromStorage) {
            setComments(dataFromStorage)
          } else {
            const [res] = await Promise.all([
              Client.query(
                Prismic.Predicates.at('document.type', 'manager_update'),
                {
                  pageSize: 200
                }
              )
            ])

            if (res) setComments(res?.results)
          }
        } catch (error) {
          // catch errors if any and st them
          setError(error?.message || error || 'Could not fetch data')
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }

    return () => (mounted = false)
  }, [comments])

  // returns and obj {loading, news, blogs, videos, errors} includes sorting according to dates

  return {
    loading,
    comments:
      comments
        ?.filter(c => (farm ? c?.data?.farm_id[0]?.text === farm : {}))
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.first_publication_date) -
            new Date(a.first_publication_date)
        ) || [],
    news:
      news
        ?.filter(
          news =>
            news?.data?.category === 'News' || news?.data?.category === 'news'
        )
        ?.slice()
        ?.sort(
          (a, b) =>
            new Date(b.first_publication_date) -
            new Date(a.first_publication_date)
        ) || [],
    blogs:
      news
        ?.filter(
          blog =>
            blog?.data?.category === 'blogs' ||
            blog?.data?.category === 'blogposts' ||
            blog?.data?.category === 'blogpost' ||
            blog?.data?.category === 'blog' ||
            blog?.data?.category === 'Blogpost'
        )
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
  const { getMyFarmFeeds, getMyFarms } = useApi()

  const {
    data: farms,
    isLoading: farmsIsLoading,
    error: farmsHasError,
    refetch
  } = useQuery('my_farms', () => getMyFarms())

  const triggerReload = React.useCallback(() => refetch(), [refetch])

  React.useEffect(() => {
    let mounted = true

    if (mounted && farms?.data && feeds === null) {
      const fetchData = async () => {
        try {
          setLoading(true)

          const feedPromises = farms?.data?.map(async farm => {
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
  }, [farms?.data, getMyFarmFeeds, feeds, error, triggerReload])

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
