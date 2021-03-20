import React from 'react'
//import { Box } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import DocumentActivityReceiptCard from 'components/Cards/DocumentActivityReceiptsCard'

const DocumentsReceipts = () => {
  const { isOpen, onClose, data } = useComponent()
  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      <DocumentActivityReceiptCard
        data={data?.ScheduledTasks}
        title={data?.title}
        amount={data?.amount}
      />
    </ModalWrapper>
  )
}

export default DocumentsReceipts
