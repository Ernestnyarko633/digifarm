import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import useRollover from 'context/rollover'
import RequestRollover from 'components/Rollover&Payout/ModalContent/RequestRollover'
import WalletSelection from 'components/Rollover&Payout/ModalContent/WalletSelection'

const RolloverModal = () => {
  const { isOpen, onClose } = useComponent()
  const { step } = useRollover()

  const getContent = value => {
    switch (value) {
      case 0:
        return (
          <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
            <RequestRollover />
          </ModalWrapper>
        )

      case 1:
        return (
          <Box>
            <ModalWrapper
              isCentered
              isOpen={isOpen}
              onClose={onClose}
              size='full'
            >
              <Flex w='100%' align='center' justify='center'>
                <WalletSelection title='Rollover amount' type='rollover' />
              </Flex>
            </ModalWrapper>
          </Box>
        )

      default:
        return null
    }
  }

  return <>{getContent(step)}</>
}

export default RolloverModal
