import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import useComponent from 'context/component'
import OrderCard from '../OrderCard'
import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'

const Payment = ({ data, onOpen }) => {
  const { isOpen, onClose } = useComponent()
  const [reload, setReload] = useState(0)
  const triggerReload = () => setReload(prevState => prevState + 1)
  const { getMyOrder } = useApi()
  const {
    data: orders,
    isLoading,
    error
  } = useFetch(null, getMyOrder, reload, data ? data[0]?._id : null)

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody h='600px'>
          {isLoading || error ? (
            <FetchCard
              direction='column'
              align='center'
              justify='center'
              reload={triggerReload}
              loading={isLoading}
              error={error}
              text='loading order'
            />
          ) : (
            <OrderCard order={orders} onOpen={onOpen} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
Payment.propTypes = {
  data: PropTypes.any,
  onOpen: PropTypes.func
}

export default Payment
