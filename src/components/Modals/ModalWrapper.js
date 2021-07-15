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
import { Link as ReachRouter } from 'react-router-dom'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import useRollover from 'context/rollover'
import useComponent from 'context/component'

const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  size,
  isCentered,
  image,
  alt,
  children,
  showButton = true
}) => {
  const { step, bigStepper, type, onOpen, selectedWallets, payoutAmount } =
    useRollover()

  const { data } = useComponent()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      isCentered={isCentered}
    >
      {step !== 1 && (
        <ModalContent
          overflowY='scroll'
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
          rounded='2xl'
        >
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

      {(step === 1 ||
        bigStepper === 1 ||
        bigStepper === 2 ||
        bigStepper === 3) && (
        <ModalOverlay
          overflowY={bigStepper !== 2 || bigStepper !== 3 ? 'scroll' : 'hidden'}
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
            overflowY={bigStepper !== 2 ? 'scroll' : 'hidden'}
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
            <Box
              zIndex={50}
              display={{ base: 'block', lg: 'none' }}
              position='absolute'
              bottom={0}
              w='100%'
              h={{ base: '4.5rem' }}
              textAlign='center'
            >
              {bigStepper !== 2 &&
                bigStepper !== 3 &&
                type === 'asPayout' &&
                showButton && (
                  <Button
                    ml={{ base: 1, md: 1, xl: 0 }}
                    display={{ base: 'block', lg: 'none' }}
                    textAlign='center'
                    isDisabled={!selectedWallets.length || payoutAmount <= 0}
                    btntitle='Continuen to payment'
                    borderColor='cf.green'
                    color='white'
                    fontWeight={900}
                    rounded={30}
                    my={{ base: 2, md: 10 }}
                    w='100%'
                    h={65}
                    fontSize={{ base: 'sm', xl: 'md' }}
                    onClick={() => {
                      onOpen()
                    }}
                  />
                )}
              {bigStepper !== 2 &&
              bigStepper !== 3 &&
              type === 'asRollover' &&
              showButton ? (
                !data?.inRollover ? (
                  <Button
                    ml={{ base: 5, md: 8, xl: 0 }}
                    pt={{ base: 5, xl: 0 }}
                    display={{ base: 'block', lg: 'none' }}
                    as={selectedWallets.length && ReachRouter}
                    isDisabled={!selectedWallets.length}
                    _disabled={!selectedWallets.length}
                    to={
                      selectedWallets.length && {
                        pathname: '/start-farm/individual',
                        state: { rollover: true }
                      }
                    }
                    btntitle='Rollover'
                    borderColor='cf.green'
                    color='white'
                    fontWeight={900}
                    rounded='30px'
                    my={{ base: 2, md: 5 }}
                    w='90%'
                    h={50}
                    fontSize={{ base: 'sm', xl: 'md' }}
                    onClick={() => {
                      sessionStorage.setItem('type', 'individual')
                      onClose()
                    }}
                  />
                ) : (
                  data?.showButton && (
                    <Button
                      display={{ base: 'none', lg: 'flex' }}
                      isDisabled={!selectedWallets.length}
                      _disabled={!selectedWallets.length}
                      textAlign='center'
                      btntitle='Proceed to purchase crop'
                      borderColor='cf.green'
                      color='white'
                      fontWeight={900}
                      rounded={30}
                      mx={{ base: 3, md: 0 }}
                      my={{ base: 2, md: 10 }}
                      w='70%'
                      h={65}
                      fontSize={{ base: 'sm', xl: 'md' }}
                      onClick={() => {
                        onOpen()
                      }}
                    />
                  )
                )
              ) : null}
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
  children: PropTypes.node,
  showButton: PropTypes.bool
}

export default ModalWrapper
