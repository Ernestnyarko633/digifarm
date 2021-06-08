import React from 'react'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'

import qs from 'query-string'

import useApi from 'context/api'

const PaymentVerificaiton = ({ history, location: { search } }) => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [checker, setChecker] = React.useState(false)
  const { verifyPaystackPayment } = useApi()

  React.useEffect(() => {
    const type = sessionStorage.getItem('type')

    const { trxref, reference } = qs.parse(search)
    const verifyAndCreate = async ref => {
      try {
        setLoading(true)
        const res = await verifyPaystackPayment(ref)
        history.push({
          pathname: `start-farm/${type}`,
          state: {
            data: res.data,
            step: type === 'individual' ? 4 : 5
          }
        })
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (reference === trxref && !checker) {
      setChecker(true)
      const queryParams = new URLSearchParams(search)
      queryParams.delete('trxref')
      queryParams.delete('reference')
      history.replace({
        search: queryParams.toString()
      })
      sessionStorage.removeItem('my_farms')
      sessionStorage.removeItem('my_orders')
      verifyAndCreate({ reference })
    } else {
      setError(true)
    }
  }, [verifyPaystackPayment, checker, search, history])

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
