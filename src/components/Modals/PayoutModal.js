import React from 'react'
import { Flex } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import ConfirmBankingDetails from 'components/Rollover&Payout/ModalContent/ConfirmBankingDetails'
const PayoutModal = () => {
  const { isOpen, onClose } = useComponent()

  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='full'>
      <Flex w='100%' align='center' justify='center'>
        <ConfirmBankingDetails />
      </Flex>
    </ModalWrapper>
  )
}

export default PayoutModal
