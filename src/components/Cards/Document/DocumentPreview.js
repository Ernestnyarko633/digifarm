import React, { useState }from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Box,
    IconButton
  } from '@chakra-ui/react'


  const DocumentPreview = ({ link, isOpen, onClose }) => {

    const [ shown, setShown ] = useState(true)


    const previewModal = () => (
      <Box bg='#fff'
        position='fixed'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        m='auto'
        height='500px'
        width={{ md: '80%' }}
        zIndex='9999px'
        overflow='auto'>
        <Box pos='relative'>
          <Box position='absolute' right={0} pr={{ md: 6 }}>
            <IconButton variantColor='#3c9130'
                color='black'
                aria-label='Close Preview'
                size='lg'
                icon='close'
                onClick={() => {
                setShown(false)
                }} />
          </Box>
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe src={link + '#toolbar=0'} width='100%' height='500px' />
        </Box>


      </Box>

    )
    
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {shown &&  previewModal()}
          </ModalContent>
        </Modal>
      </>
    )
}

export default DocumentPreview
