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
        order_id: '5fcd57463ea90617aa45ae10',
        bank_transfer_receipt:''
    }

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();


    const onSubmit = async (values)=> {
      try {
          console.log('hiii')
          console.log(values)
          const formData = new FormData()

          Object.keys(values).forEach(key => {
               formData.append(key, values[key])
            })
          
            await uploadPaymentDetails(formData)
      
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
                                    values={values.bank_transfer_receipt}
                                    name='bank_transfer_receipt'
                                />
                                
                            </form>
                        )}
                    </Formik>
                </Box>
            </ModalBody>
            <Flex pb={8} justify='center' pt={3}>
                <Button
                  colorScheme="linear"
                  rounded="30px"
                  w={{ md: "50%" }}
                  onClick={() => {
                    onClose();
                    toast({
                      position: "top-right",
                      duration: 9000,
                      render: () => <ConfirmDocUpload />,
                    });
                  }}
                >
                  Submit
                </Button>
            </Flex>
          </ModalContent>
        </Modal>
      </>
    );
  };
  export default UploadDocument;
  