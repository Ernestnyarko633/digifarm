import useApi from 'context/api'
import React from 'react'

const useAPICalls = () => {
  const { getFarms } = useApi()

  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)

  const [farms, setFarms] = React.useState([])
  // fetches Farms
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('loading')
        const res = await getFarms()
        setFarms(res.data)

        setLoading('done')
      } catch (err) {
        setError(err.message)
      }
    }
    fetchData()
  }, [getFarms])

  return {
    loading,
    farms,
    error
  }
}
export default useAPICalls
