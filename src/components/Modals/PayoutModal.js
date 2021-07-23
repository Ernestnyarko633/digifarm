import React from 'react'
import { Flex } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import ConfirmBankingDetails from 'components/Rollover&Payout/ModalContent/ConfirmBankingDetails'
import { default as usePayout } from 'context/rollover'
import WalletSelection from 'components/Rollover&Payout/ModalContent/WalletSelection'
import PayoutReview from 'components/Rollover&Payout/ModalContent/PayoutReview'
import WaitingPage from 'components/Rollover&Payout/ModalContent/WaitingPage'

const PayoutModal = () => {
  const { isOpen, onClose } = useComponent()

  const { bigStepper: step } = usePayout()

  const getValue = value => {
    switch (value) {
      case 0:
        return <ConfirmBankingDetails />

      case 1:
        return (
          <WalletSelection type='withdraw' title='Total amount to be issued' />
        )

      case 2:
        return <PayoutReview />

      case 3:
        return <WaitingPage />

      default:
        return null
    }
  }

  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='full'>
      <Flex w='100%' align='center' justify='center'>
        {getValue(step)}
      </Flex>
    </ModalWrapper>
  )
}

export default PayoutModal
