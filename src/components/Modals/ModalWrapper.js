import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Box
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
      <ModalOverlay />
      <ModalContent rounded='2xl'>
        <ModalHeader>
          <Box>
            {title}
            {image && <Image width={12} src={image} alt={alt} />}
          </Box>
        </ModalHeader>
        <ModalCloseButton color='cf.400' />
        <ModalBody px={{ base: 4, md: 10 }} py={5}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  isCentered: PropTypes.bool,
  image: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node
}

export default ModalWrapper
