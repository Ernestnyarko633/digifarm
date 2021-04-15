import React from 'react'
import PropTypes from 'prop-types'

import FetchCard from 'components/FetchCard'

import qs from 'query-string'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'

const PaymentVerificaiton = ({ history, location: { search } }) => {
  const { verifyPayment } = useApi()

  const { id } = qs.parse(search)

  const { data, isLoading, error } = useFetch(null, verifyPayment, null, {
    payment_id: id
  })

  if (data) {
    history.push({
      pathname: 'start-farm/individual',
      state: {
        data,
        step: 4
      }
    })
  }

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
