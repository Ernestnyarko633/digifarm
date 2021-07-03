/* eslint-disable no-console */
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
import Button from 'components/Button'
import PropTypes from 'prop-types'
import useRollover from 'context/rollover'

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
  const { step } = useRollover()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      isCentered={isCentered}
    >
      {step !== 1 && (
        <ModalContent rounded='2xl'>
          <ModalHeader>
            <Box>
              {title}
              {image && <Image width={12} src={image} alt={alt} />}
            </Box>
          </ModalHeader>
          <ModalCloseButton color='cf.green' />
          <ModalBody px={{ base: 4, md: 10 }} py={5}>
            {children}
          </ModalBody>
        </ModalContent>
      )}

      {step === 1 && (
        <ModalOverlay>
          <ModalContent
            position={{ base: 'absolute', lg: 'relative' }}
            zIndex={12}
            rounded='2xl'
          >
            <Box
              zIndex={50}
              display={{ base: 'block', lg: 'none' }}
              position='absolute'
              bottom={0}
              w='100%'
              h={{ base: '4.5rem' }}
              textAlign='center'
            >
              <Button
                btntitle='Rollover'
                borderColor='cf.green'
                color='white'
                fontWeight={900}
                rounded='30px'
                my={{ base: 2, md: 5 }}
                w='90%'
                h={50}
                fontSize={{ base: 'sm', xl: 'md' }}
                onClick={() => {}}
              />
            </Box>
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
      )}
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
  children: PropTypes.node
}

export default ModalWrapper
