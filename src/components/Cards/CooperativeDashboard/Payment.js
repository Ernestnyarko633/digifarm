import React from 'react'
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

const Payment = ({ onOpen }) => {
  const { isOpen, onClose, data } = useComponent()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody h='600px'>
          <OrderCard
            order={{ ...data.order, product: data.product }}
            onOpen={onOpen}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
Payment.propTypes = {
  onOpen: PropTypes.func
}

export default Payment
