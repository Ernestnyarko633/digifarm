import React from 'react'

import useComponent from 'context/component'

import Receipt from '../Utils/Receipt'
import ModalWrapper from './ModalWrapper'

const FarmContractModal = () => {
  const { isOpen, onClose, data } = useComponent()
  return (
    <ModalWrapper
      image={require('../../assets/images/logo.png').default}
      isCentered
      alt='Complete Farmer Logo'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Receipt
        data={data}
        type={data?.type}
        title='Farm Contract'
        description='Description'
        label="Here's the confirmation of the contract for your farm"
        text='Have an issue with your farm contract?'
        buttonTitle='Download agreement'
      />
    </ModalWrapper>
  )
}

export default FarmContractModal
