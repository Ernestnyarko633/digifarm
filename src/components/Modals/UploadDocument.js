import React, {useContext} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Button,
    Box,
    Heading,
    Flex,
    Divider

  } from "@chakra-ui/core";
  import {Formik,Field} from 'formik'
import { PaymentContext } from 'context/paymentContext'
import Upload from 'components/Form/upload'
import ConfirmDocUpload from './ConfirmDocUpload'


  const UploadDocument = () => {

    const {uploadPaymentDetails} = useContext(PaymentContext)

    const initialValues = {
        payment_id: '5fd79e7c6d80ce789ab140be',
        file: undefined
    }

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();


    const onSubmit = async (values)=> {
      try {
          const formData = new FormData()
          formData.append('bank_transfer_receipt', values.file)
          const res = await uploadPaymentDetails(values.payment_id, formData)
          console.log(res)
      
      } catch (error) {
          console.log(error)
      }
      
  }

    return (
      <>
        <Button
          mt={4}
          colorScheme="linear"
          rounded="30px"
          fontSize="xs"
          w={{ md: "150px" }}
          onClick={onOpen}
        >
         Complete order
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
            <Flex mt={2}>
              <Box ml={10} textAlign='center'>
                <Heading as="h4" fontWeight="bold" fontSize={{ md: "xl" }}>
                  Complete your order
                </Heading>
              </Box>
              <ModalCloseButton color='cf.400'/>
            </Flex>
            <Divider orientation="horizontal" borderColor="gray.400" />
            <ModalBody>
            <Box mt='20px' w={{md: '400px'}} >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({handleSubmit,values,...rest})=> (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    component={Upload}
                                    label='Upload an image of your bank payslip here'
                                    accept='image/jpeg, image/jpg'
                                    name='file'
                                />
                                 <Flex pb={8} justify='center' pt={3}>
                                 <ConfirmDocUpload/>
                                </Flex>
                            </form>
                        )}
                    </Formik>
                </Box>
            </ModalBody>
           
          </ModalContent>
        </Modal>
      </>
    );
  };
  export default UploadDocument;
  