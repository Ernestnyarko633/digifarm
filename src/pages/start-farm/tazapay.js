/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'

import queryString from 'query-string'

import useApi from 'context/api'

const Tazapay = ({ history, location: { search } }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const { verifyTazapayPayment } = useApi()

  React.useEffect(() => {
    const type = sessionStorage.getItem('type')
    const tazapay = sessionStorage.getItem('redirect')

    const verifyAndCreate = async params => {
      try {
        setLoading(true)
        if (params?.error) throw new Error(4)
        const res = await verifyTazapayPayment(params, { redirect: tazapay })
        history.push({
          pathname: `start-farm/${type}`,
          state: {
            data: res.data,
            payment: true,
            step: type === 'individual' ? 4 : 5
          }
        })
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    const parsed = queryString.parse(search)

    verifyAndCreate(parsed)
  }, [history, search, verifyTazapayPayment])

  return isLoading || error ? (
    <FetchCard
      h='100vh'
      direction='column'
      align='center'
      justify='center'
      mx='auto'
      loading={isLoading}
      error={error && 'Payment verification failed, please contact support.'}
      text='Standby as we verify your payment'
    />
  ) : (
    <div />
  )
}

Tazapay.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default Tazapay
