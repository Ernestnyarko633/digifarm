import useApi from 'context/api'
import React from 'react'

const useAPICalls = () => {
  const { getFarms } = useApi()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [farms, setFarms] = React.useState([])
  // fetches Farms
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getFarms()
        setFarms(res.data)

        setLoading(false)
      } catch (err) {
        setError(err?.message || err)
        setLoading(false)
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
