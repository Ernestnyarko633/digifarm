import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Heading,
    Flex,
    Divider,
    Image,
    Text,
    Spacer,
    CloseButton

  } from '@chakra-ui/react'
  import { Formik, Field } from 'formik'
import { PaymentContext } from 'context/paymentContext'
import Upload from 'components/Form/upload'
import corporate from '../../assets/images/emptystate/corporate.png'


  const UploadDocument = () => {

    const { uploadPaymentDetails } = useContext(PaymentContext)
    const [ modal, setmodal ] = useState(true)
    // const [ doc, setDoc ] = useState(true)

    const initialValues = {
        payment_id: '5fd79e7c6d80ce789ab140be',
        file      : undefined
    }

    const { isOpen, onClose, onOpen } = useDisclosure()
    const onSubmit = async (values)=> {
      try {
          const formData = new FormData()
          formData.append('bank_transfer_receipt', values.file)
           await uploadPaymentDetails(values.payment_id, formData)
          setmodal(false)
      } catch (error) {
          return Promise.reject(error)
      }
      
  }

    return ( 
      <>
        <Button mt={4}
          colorScheme='linear'
          rounded='30px'
          fontSize='xs'
          w={{ md: '150px' }}
          onClick={onOpen}>
          Complete order
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
          { modal ? (
            <ModalContent>
              <Flex m={2}>
                <Box ml={10} textAlign='center'>
                  <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                    Complete your order
                  </Heading>
                </Box>
                <ModalCloseButton color='cf.400' />
              </Flex>
              <Divider orientation='horizontal' borderColor='gray.400' />
              <ModalBody>
                <Box mt='20px' w={{ md: '400px' }}>
                  <Formik initialValues={initialValues}
                        onSubmit={onSubmit}>
                    {({ handleSubmit, values, ...rest })=> (
                      <form onSubmit={handleSubmit}>
                        {!values.file  ? (
                          <Field component={Upload}
                              label='Upload an image of your bank payslip here'
                              accept='image/jpeg, image/jpg'
                              name='file' />
                        ) : (
                          <Flex w='130px' mt={4} as='button' bgColor='cf.200' p={2} rounded='30px'>
                            <Text pt={1}>{values.file.name}</Text>
                            <CloseButton _hover={{ textDecoration: 'none' }} bg='none' color='cf.400' />
                          </Flex>
                        )}
                        <Flex pb={8} justify='center' pt={3}>
                          <Button type='submit'
                              w={{ md: '50%' }}
                              colorScheme='linear'
                              rounded='30px'
                              fontSize='xs'>
                            Submit
                          </Button>
                        </Flex>
                      </form>
                        )}
                  </Formik>
                </Box>
              </ModalBody>
            </ModalContent>

          ):(
            <ModalContent>
              <Flex mt={2} justify='center'>
                <Box ml={10} j>
                  <Heading as='h4' fontWeight='bold' fontSize={{ md: 'xl' }}>
                    Upload successful
                  </Heading>
                </Box>
                <Spacer />
                <ModalCloseButton color='cf.400' />
              </Flex>
              <Divider orientation='horizontal' borderColor='gray.400' />
              <ModalBody>
                <Box my='20px' mx={1} textAlign='center'>
                  <Text>Thank  you uploading your bank payslip </Text>
                  <Text>Confirmation takes 1-2 weeks for us to get back to you </Text>
                  <Text mx={10} mt='30px'>In the meantime, why dont you learn a few insights about farming</Text>
                  <Flex justify='center' mt={3}>
                    <Image src={corporate} w={{ md: '180px' }} h={{ md: '110px' }} />
                  </Flex>
                  <Button  as='a' href='/dashboard' colorScheme='linear' rounded='30px'my={6} w={{ md: '60%' }}>Go to farmboard</Button>
                </Box>
              </ModalBody>
            </ModalContent>
          )}
           
        </Modal>
      </>
    )
  }
  export default UploadDocument