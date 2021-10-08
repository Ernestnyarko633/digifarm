import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  ModalOverlay
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  size,
  isCentered,
  image,
  alt,
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      isCentered={isCentered}
    >
      <ModalOverlay
        overflowY='hidden'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.200',
            borderRadius: '24px'
          }
        }}
      >
        <ModalContent
          position={{ base: 'absolute', lg: 'relative' }}
          zIndex={12}
          rounded='2xl'
          css={{
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.200',
              borderRadius: '24px'
            }
          }}
        >
          <ModalHeader>
            <Box>
              {title}
              {image && <Image width={12} src={image} alt={alt} />}
            </Box>
          </ModalHeader>
          <ModalCloseButton rounded={15} bg='#C4C4C4' color='white' />
          <ModalBody
            zIndex={12}
            display={{ base: 'block', lg: 'flex', xl: 'block' }}
            px={{ base: 4, md: 10 }}
            py={5}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  isCentered: PropTypes.bool,
  image: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
  showButton: PropTypes.bool,
  data: PropTypes.any
}

export default ModalWrapper
