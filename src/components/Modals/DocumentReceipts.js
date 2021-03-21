import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import DocumentActivityReceiptCard from 'components/Cards/DocumentActivityReceiptsCard'

const DocumentsReceipts = () => {
  const { isOpen, onClose, data } = useComponent()
  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      {data ? (
        <DocumentActivityReceiptCard
          data={data?.ScheduledTasks}
          digitalFarmerFarm={data?.digitalFarmerFarm}
          title={data?.title}
          amount={data?.amount}
        />
      ) : (
        <Flex
          w='687px'
          h='390px'
          bg='white'
          rounded='lg'
          filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
          align='center'
          justify='center'
        >
          <Text fontSize='xl' color='cf.400'>
            NO RECEIPTS CURRENTLY AVAILABLE FOR THIS ACTIVITY
          </Text>
        </Flex>
      )}
    </ModalWrapper>
  )
}

export default DocumentsReceipts
