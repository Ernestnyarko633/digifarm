import React from 'react'
//import { Box } from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import DocumentActivityReceiptCard from 'components/Dynamic/Cards/DocumentActivityReceiptsCard'

const DocumentsReceipts = () => {
  const { isOpen, onClose, data } = useComponent()
  return (
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='3xl'>
      <DocumentActivityReceiptCard title={data?.title} amount={data?.amount} />
    </ModalWrapper>
  )
}

export default DocumentsReceipts
