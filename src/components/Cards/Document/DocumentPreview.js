import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalCloseButton
} from '@chakra-ui/react'

const DocumentPreview = ({ link, isOpen, onClose }) => {
  const [shown] = useState(true)

  const previewModal = () => (
    <Box
      bg='#fff'
      position='fixed'
      top='50%'
      left='50%'
      transform='translate(-50%, -50%)'
      m='auto'
      height='500px'
      width={{ md: '80%' }}
      zIndex='9999px'
      overflow='auto'
    >
      <Box pos='relative'>
        <Box position='absolute' right={0} pr={{ md: 6 }}>
          <ModalCloseButton color='white' />
        </Box>

        <iframe
          title='nothing'
          src={link + '#toolbar=0'}
          width='100%'
          height='500px'
        />
      </Box>
    </Box>
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>{shown && previewModal()}</ModalContent>
      </Modal>
    </>
  )
}

DocumentPreview.propTypes = {
  link: PropTypes.any,
  isOpen: PropTypes.any,
  onClose: PropTypes.func
}

export default DocumentPreview
