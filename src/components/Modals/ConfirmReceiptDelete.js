import React from 'react'
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  useDisclosure,
  Button,
  Icon
} from '@chakra-ui/react'
import useApi from 'context/api'
import { VscTrash } from 'react-icons/vsc'

const ConfirmReceiptDelete = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { deleteBankTransfer } = useApi()

  let payment_id = '5fd79e7c6d80ce789ab140be'

  const deleteReceipt = async id => {
    try {
      await deleteBankTransfer(id)
    } catch (error) {
      return error
    }
  }

  const handleKeyPress = e => {
    const key = e.keyCode || e.charCode
    if (key === 13 || e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      deleteReceipt(payment_id)
    }
  }

  return (
    <>
      <Button colorScheme='linear' rounded='30px' ml={2} mt={4} onClick={onOpen}>
        <Icon as={VscTrash} size={6} />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        mt={10}
        variant='outline'
        borderColor='black'
        borderWidth={5}
        colorScheme='white'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box my='30px' mx={1} textAlign='center'>
              <Text>Are you sure you want to delete the bank&lsquo;s transfer receipt?</Text>
              <Flex mt={4} justify='center'>
                <Button
                  mr={4}
                  onClick={onClose}
                  rounded='30px'
                  fontWeight='thin'
                  variant='outline'
                  borderColor='black'
                  w={{ md: '90px' }}
                >
                  No
                </Button>
                <Button
                  colorScheme='linear'
                  rounded='30px'
                  w={{ md: '90px' }}
                  onKeyPress={handleKeyPress}
                  onClick={async => {
                    deleteReceipt(payment_id)
                    onClose()
                  }}
                >
                  Yes
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmReceiptDelete
