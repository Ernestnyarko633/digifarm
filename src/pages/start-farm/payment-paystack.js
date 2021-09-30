import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import FetchCard from 'components/FetchCard'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'

const PaymentVerificaiton = ({ history }) => {
  const { id, type } = useParams()
  const { getMyOrder } = useApi()

  const { data, isLoading, error } = useFetch(
    `Order_${id}`,
    getMyOrder,
    false,
    id
  )

  React.useEffect(() => {
    if (data) {
      history.push({
        pathname: `/start-farm/${type}`,
        state: {
          data: data,
          payment: true,
          step: type === 'individual' ? 4 : 5
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
