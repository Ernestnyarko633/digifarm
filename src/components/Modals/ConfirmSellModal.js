import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Heading,
  Flex
} from '@chakra-ui/core';

const ConfirmSell = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
    <Button mt={4} colorScheme='linear' rounded='30px' fontSize='xs' w={{md: '150px'}} onClick={onOpen}>Sell to buyer</Button>
   <Modal isOpen={isOpen} onClose={onClose} mt={10}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" mt={2} py={2}>
              <Heading as="h4" fontFamily="bold" fontSize={{ md: 'xl' }}>
                Confirm Sale
              </Heading>
            </Box>
            <Box mt={2} p={2} bg='cf.300' textAlign='center'>
            <Text fontSize={{ md: 'sm' }}>
                You're about to sell <span> 2000  </span> tonnes of your produce worth <span> $540.00 </span> to John.
              </Text>
              <Text fontSize={{md: 'sm'}}>You have <span>500 tonnes</span> left to sell.
              </Text>
            </Box>
            <Text fontSize={{md:'xs'}} pl={3} pt={1} color='red.400'>Are you sure you want to sell this crop? This action is irreversible</Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
            <Button colorScheme="cf" mr={5} onClick={onClose} color='black' w={{md:'110px'}}>
              No
            </Button>
            <Button colorScheme="linear" w={{md:'110px'}}>Yes</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};
export default ConfirmSell;
