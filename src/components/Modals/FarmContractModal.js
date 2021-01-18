import useComponent from 'context/component'
import Receipt from '../Utils/Receipt'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const FarmContractModal = () => {
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
        title='Farm Contract'
        description='Description'
        label="Here's the confirmation of the contract for your farm"
        text='Have an issue with your farm contract?'
        buttonTitle='Download contract'
      />
    </ModalWrapper>
  )
}

export default FarmContractModal
