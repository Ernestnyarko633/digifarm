/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'

import qs from 'query-string'

import useApi from 'context/api'

const PaymentVerificaiton = ({ history, location: { search } }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [checker, setChecker] = React.useState(false)
  const { createFarm } = useApi()

  const query = qs.parse(search)

  React.useEffect(() => {
    const fetch = async (id, record_id) => {
      try {
        setLoading(true)
        const res = await createFarm(id, record_id)
        history.push({
          pathname: 'start-farm/individual',
          state: {
            data: res.data,
            step: 4
          }
        })
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (
      query.status === 'successful' &&
      query.status_code === '100' &&
      !checker
    ) {
      setChecker(true)
      fetch(query['metadata[order_id]'], query.id)
    } else {
      setError(true)
    }
  }, [query, createFarm, checker, history])

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

PaymentVerificaiton.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default PaymentVerificaiton
