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
   <Modal isOpen={isOpen} onClose={onClose} mt={10} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" mt={2} py={2}>
              <Heading as="h4" fontWeight="bold" fontSize={{ md: 'xl' }}>
                Confirm Sale
              </Heading>
            </Box>
            <Box mt={2} p={2} bg='cf.300' fontFamily='light' textAlign='center'>
            <Text fontSize={{ md: 'sm' }}>
                You're about to sell 
                <Text as='span' fontWeight='bold'> 2000 tonnes </Text>  
                of your produce worth 
                <Text as ='span' fontWeight='bold'> $540.00 </Text> 
                to <Text as='span' fontWeight='bold' >John Clinton</Text>.
              </Text>
              <Text fontSize={{md: 'sm'}}>You have <Text as ='span' fontWeight='bold'>500 tonnes</Text> left to sell.
              </Text>
            </Box>
            <Text fontSize={{md:'xs'}} pl={3} pt={1} fontFamily='light' color='red.500'>Are you sure you want to sell this crop? This action is irreversible</Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
            <Button mr={5} onClick={onClose} rounded='30px' fontWeight='thin' variant='outline' borderColor='black' w={{md:'90px'}}>
              No
            </Button>
            <Button colorScheme="linear" rounded='30px' w={{md:'90px'}}>Yes</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};
export default ConfirmSell;
