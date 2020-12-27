import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Button,
  Box,
  Text,
  Heading,
  Flex,
  Divider
} from '@chakra-ui/react'
import React from 'react'
import Notification from 'components/Notifications'

const ConfirmSale = ({ amtLeft, name, amtBought, price }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const toast = useToast()

  return (
    <>
      <Button mt={4}
        colorScheme='linear'
        rounded='30px'
        fontSize='xs'
        w={{ md: '150px' }}
        onClick={onOpen}>
        Sell to buyer
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
          <Flex m={3}>
            <Box ml={10}>
              <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                Confirm Sale
              </Heading>
            </Box>
            <ModalCloseButton />
          </Flex>
          <Divider orientation='horizontal' borderColor='gray.400' />
          <ModalBody>
            <Box mt={2} p={2} fontFamily='light' textAlign='justify'>
              <Text fontSize={{ md: 'sm' }}>
                You're about to sell
                <Text as='span' fontWeight='bold'>
                  {' '}
                  {amtBought} tonnes{' '}
                </Text>
                of your produce worth
                <Text as='span' fontWeight='bold'>
                  {' '}
                  {price}{' '}
                </Text>
                to{' '}
                <Text as='span' fontWeight='bold'>
                  {name}
                </Text>
                .
                <Text as='span' fontSize={{ md: 'sm' }} pl={1}>
                  You would have{' '}
                  <Text as='span' fontWeight='bold'>
                    {amtLeft} tonnes
                  </Text>{' '}
                  left to sell.
                </Text>
              </Text>
            </Box>
            <Text fontSize={{ md: 'sm' }}
              pl={2}
              fontWeight='thin'
              color='red.600'>
              Are you sure you want to sell this crop? This action is
              irreversible{' '}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button mr={5}
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
                onClick={() => {
                  onClose()
                  toast({
                    position: 'top-right',
                    duration: 9000,
                    render  : () => <Notification />,
                  })
                }}>
                Yes
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ConfirmSale
