/* eslint-disable no-unused-vars */
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
  const { inViewProduct: farm } = useComponent()
  const { data, isLoading, error, refetch, isFetched } = useQuery(
    'prismic',
    async () =>
      await Promise.all([
        Client.query(Prismic.Predicates.at('document.type', 'news'), {
          pageSize: 200
        }),
        Client.query(Prismic.Predicates.at('document.type', 'weekly_videos'), {
          pageSize: 200
        }),
        Client.query(Prismic.Predicates.at('document.type', 'manager_update'), {
          pageSize: 200
        })
      ])
  )

  // returns and obj {loading, news, blogs, videos, errors} includes sorting according to dates

  return {
    loading: isLoading,
    comments: isFetched
      ? data[2]?.results
          ?.filter(c => (farm ? c?.data?.farm_id[0]?.text === farm : {}))
          ?.slice()
          .sort(
            (a, b) =>
              new Date(b.first_publication_date) -
              new Date(a.first_publication_date)
          )
      : [],
    news: isFetched
      ? data[0]?.results
          ?.filter(
            news =>
              news?.data?.category === 'News' || news?.data?.category === 'news'
          )
          ?.slice()
          ?.sort(
            (a, b) =>
              new Date(b.first_publication_date) -
              new Date(a.first_publication_date)
          )
      : [],
    blogs: isFetched
      ? data[0]?.results
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
          )
      : [],
    videos: isFetched
      ? data[1]?.results
          ?.slice()
          ?.sort(
            (a, b) =>
              new Date(b.first_publication_date) -
              new Date(a.first_publication_date)
          )
      : [],
    error,
    refetch
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
          let feedPromises = null
          let allFeeds = []
          if (JSON.parse(sessionStorage.getItem('feeds'))?.length > 0) {
            allFeeds = JSON.parse(sessionStorage.getItem('feeds'))
          } else {
            setLoading(true)

            feedPromises = farms?.data?.map(async farm => {
              const response = await getMyFarmFeeds({
                farm: farm?.order?.product?._id
              })
              if (response.data) {
                return response.data
              }
              return []
            })

            allFeeds = await Promise.all(feedPromises)
            sessionStorage.setItem('feeds', JSON.stringify(allFeeds))
          }

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
