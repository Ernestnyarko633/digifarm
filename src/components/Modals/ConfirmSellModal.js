import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  Text,
  Heading,
  useDisclosure
} from '@chakra-ui/core';

const ConfirmSell = () => {
  const { isOpen, onClose } = useDisclosure(true);

  return (
    <Modal isOpen={isOpen} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody px={16} py={10}>
          <Box textAlign="center" mt={2} py={6}>
            <Heading as="h4" fontFamily="bold" fontSize={{ md: 'xl' }}>
              Comfirm Sale
            </Heading>
            <Text py={2} fontSize={{ md: 'lg' }}>
              Are you sure you want to sell this crop? This action is irreversible
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ConfirmSell;