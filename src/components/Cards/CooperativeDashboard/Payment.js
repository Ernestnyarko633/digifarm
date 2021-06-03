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

const Payment = ({ data, onOpen }) => {
  const { isOpen, onClose } = useComponent()
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody h='600px'>
          <OrderCard order={data} onOpen={onOpen} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
Payment.propTypes = {
  data: PropTypes.any,
  onOpen: PropTypes.any
}

export default Payment
