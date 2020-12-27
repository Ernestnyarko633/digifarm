import React, { useContext }from 'react'
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
import { PaymentContext } from 'context/paymentContext'
import { VscTrash } from 'react-icons/vsc'

const ConfirmReceiptDelete = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { deleteBankTransfer } = useContext(PaymentContext)

    let payment_id = '5fd79e7c6d80ce789ab140be'

    const deleteReceipt = async id =>{
        try {
            await deleteBankTransfer(id)
        } catch (error) {
            return error
        }

    }

    return (
      <>
        <Button colorScheme='linear'
            rounded='30px'
            ml={2}
            mt={4}
            onClick={onOpen}>
          <Icon as={VscTrash} size={6} />
        </Button>
        <Modal isOpen={isOpen}
          onClose={onClose}
          mt={10}
          variant='outline'
          borderColor='black'
          borderWidth={5}
          colorScheme='white'
          isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Box my='30px' mx={1} textAlign='center'>
                <Text>Are you sure you want to delete the bank's transfer receipt?</Text>
                <Flex mt={4} justify='center'>
                  <Button mr={4}
                            onClick={onClose}
                            rounded='30px'
                            fontWeight='thin'
                            variant='outline'
                            borderColor='black'
                            w={{ md: '90px' }}>
                    No
                  </Button>
                  <Button colorScheme='linear'
                            rounded='30px'
                            w={{ md: '90px' }}
                            onClick={async => {
                                deleteReceipt(payment_id)
                               onClose()

                            }}>
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
    
 