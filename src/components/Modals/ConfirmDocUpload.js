import React from 'react'
import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Box,
    Heading,
    Flex,
    Divider,
    useDisclosure,
    Button,
    Image,
    Spacer
} from '@chakra-ui/core'
import corporate from '../../assets/images/emptystate/corporate.png'

const ConfirmDocUpload = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
        <Button
          type='submit'
          w={{ md: "50%" }}
          colorScheme="linear"
          rounded="30px"
          fontSize="xs"
          onClick={()=> {
            onClose();
            onOpen()
          }}
        >
          Submit
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          mt={10}
          variant="outline"
          borderColor="black"
          borderWidth={5}
          colorScheme="white"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <Flex mt={2} justify='center'>
              <Box ml={10} j>
                <Heading as="h4" fontWeight="bold" fontSize={{ md: "xl" }}>
                  Upload successful
                </Heading>
              </Box>
              <Spacer/>
              <ModalCloseButton color='cf.400'/>
            </Flex>
            <Divider orientation="horizontal" borderColor="gray.400" />
            <ModalBody>
            <Box my='20px' mx={1} textAlign='center' >
                   <Text>Confirmation takes 1-2 weeks for us to get back to you </Text>
                   <Text>Thank  you uploading your bank payslip </Text>
                   <Text mx={10} mt='30px'>In the meantime, why dont you learn a few insights about farming</Text>
                <Flex justify='center' mt={3}>
                  <Image src={corporate} w={{md:'180px'}} h={{md:'110px'}}/>
                </Flex>
                <Button  as='a' href='/dashboard' colorScheme='linear' rounded='30px'my={6} w={{md:'60%'}}>Go to farmboard</Button>
                </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ConfirmDocUpload
    
 