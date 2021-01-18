import useComponent from 'context/component'
import Receipt from '../Utils/Receipt'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const FarmReceiptModal = () => {
  const { isOpen, onClose } = useComponent()
  return (
    <ModalWrapper
      image={require('../../assets/images/logo.png').default}
      isCentered
      alt='Complete Farmer Logo'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Receipt
        title='Farm Receipt'
        description='Description'
        label="Here's the confirmation of your payment and a receipt for your farm"
        text='Have an issue with your farm receipt?'
        buttonTitle='Download receipt'
      />
    </ModalWrapper>
  )
}

export default FarmReceiptModal
