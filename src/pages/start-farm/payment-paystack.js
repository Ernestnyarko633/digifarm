import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import { useQuery } from 'react-query'

const PaymentPaystack = ({ history }) => {
  const { id, type } = useParams()
  const { getMyOrder } = useApi()

  const { data, isLoading, error } = useQuery(
    [`Order_${id}`, id],
    () => id && getMyOrder(id)
  )

  React.useEffect(() => {
    if (data?.data) {
      history.push({
        pathname: `/start-farm/${type}`,
        state: {
          data: data?.data,
          payment: true,
          step: type === 'individual' ? 4 : 5
        }
      })
    }
  }, [data?.data, history, type])

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

PaymentPaystack.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default PaymentPaystack
