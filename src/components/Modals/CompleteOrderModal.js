import React from 'react'
import {
  Flex,
  Box,
  Text,
  Image,
  Modal,
  useToast,
  Heading,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'
import Tazapay from 'assets/images/taz.svg'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { FiCreditCard, FiUpload } from 'react-icons/fi'
import useStartFarm from 'context/start-farm'
import useApi from 'context/api'
import Button from 'components/Button'
import { Status } from 'helpers/misc'
import ImageUpload from 'components/ImageUpload'
import useAuth from 'context/auth'
import { useQueryClient } from 'react-query'
import Constants from 'constant'
const dpo = Constants.paymentOptions[0]

const CompleteOrderModal = ({ call, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const { isAuthenticated, store } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const { user } = isAuthenticated()
  const [showUploadForm, setShowUploadForm] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const { uploadPaymentDetails, patchOrder } = useApi()
  const {
    handlePayment,
    convertedAmount,
    setSelectedFarm,
    isSubmitting,
    toastError,
    convertToGhanaCedis,
    setPaymentOption,
    order,
    handleTazapayPayment,
    PAYSTACK_LIMIT
  } = useStartFarm()
  const [file, setFile] = React.useState([])

  const toast = useToast()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { payment_id: order?.payment, file: undefined },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        let formData = new FormData()
        formData.append('bank_transfer_receipt', values.file)
        await uploadPaymentDetails(values.payment_id, formData)
        const res = await patchOrder(order._id, { status: Status.PROCESSING })
        resetForm({})
        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        setSuccess(true)
        queryClient.invalidateQueries('my_farms')
        queryClient.invalidateQueries('my_orders')
        call()
      } catch (error) {
        toast({
          title: 'Error occured',
          description:
            error?.data?.message || 'Unexpected error, contact support',
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowUploadForm(false)
        setSuccess(false)
        onClose()
      }}
      size='xl'
      isCentered
    >
      <ModalOverlay />
      <ModalContent style={{ opacity: 1 }}>
        <ModalCloseButton />
        <ModalBody my={8} px={{ base: 6, md: 10 }}>
          {!success && (
            <Heading as='h4' fontSize={{ md: '2xl' }} textAlign='center'>
              {showUploadForm
                ? 'Upload your payment receipt to complete your order'
                : 'Select an option'}
            </Heading>
          )}
          {!showUploadForm ? (
            <Flex mt={4} justify='space-between'>
              {convertedAmount < PAYSTACK_LIMIT && (
                <Button
                  filter='grayScale(100%)'
                  btntitle='Pay with card'
                  isLoading={isSubmitting}
                  isDisabled={true}
                  py={{ base: 1, md: 7 }}
                  leftIcon={<FiCreditCard size={22} />}
                  onClick={async _ => {
                    setPaymentOption(dpo)
                    if (order?.cooperative) {
                      sessionStorage.setItem('type', 'cooperative')
                    } else {
                      sessionStorage.setItem('type', 'individual')
                    }
                    setSelectedFarm(order?.product)
                    sessionStorage.setItem(
                      'selected_farm',
                      JSON.stringify(order?.product)
                    )
                    const cediAmt = await convertToGhanaCedis(order)

                    return handlePayment(
                      order?._id,
                      order?.product?.name,
                      cediAmt || convertedAmount,
                      order?.cost
                    )
                  }}
                  width={!order?.payment ? '100%' : '45%'}
                />
              )}

              <Button
                filter='grayScale(100%)'
                mx={2}
                btntitle=''
                isLoading={loading}
                isDisabled={true}
                py={{ base: 1, md: 7 }}
                leftIcon={<Image h={5} src={Tazapay} />}
                onClick={async _ => {
                  try {
                    setPaymentOption(Constants.paymentOptions[1])

                    if (order?.cooperative) {
                      sessionStorage.setItem('type', 'cooperative')
                    } else {
                      sessionStorage.setItem('type', 'individual')
                    }

                    setLoading(true)
                    setSelectedFarm(order?.product)
                    sessionStorage.setItem(
                      'selected_farm',
                      JSON.stringify(order?.product)
                    )

                    if (order?.redirect) {
                      return (window.location.href = order?.redirect)
                    } else {
                      return await handleTazapayPayment(
                        user,
                        store,
                        order,
                        order?.product
                      )
                    }
                  } catch (error) {
                    toastError(error)
                  } finally {
                    setLoading(false)
                  }
                }}
                width={!order?.payment ? '100%' : '45%'}
              />

              {order?.payment && (
                <Button
                  ml={{ md: 2 }}
                  btntitle='Upload payment slip'
                  leftIcon={<FiUpload size={22} />}
                  py={{ base: 1, md: 7 }}
                  onClick={_ => setShowUploadForm(true)}
                  width='45%'
                />
              )}
            </Flex>
          ) : success ? (
            <Box my='20px' mx={1} textAlign='center'>
              <Text>Thank you uploading your payment payslip</Text>
              <Text>Your order is now processing.</Text>
              <Text>
                Confirmation takes 1-2 weeks for us to get back to you.
              </Text>
            </Box>
          ) : (
            <Flex
              mt={4}
              flexDir='column'
              w='100%'
              align='center'
              justify='center'
            >
              <Box mb={5}>
                <ImageUpload
                  files={file}
                  setFiles={setFile}
                  value={{ name: 'file' }}
                  setFieldValue={formik.setFieldValue}
                  upload='Select a file to upload'
                  instruct='Files supported: JPG, PNG, PDF'
                />
              </Box>
              <Button
                width='50%'
                type='submit'
                onClick={() => formik.handleSubmit()}
                py={{ base: 6, md: 7 }}
                btntitle='Upload document'
                isLoading={formik.isSubmitting}
                isDisabled={formik.isSubmitting}
                fontSize={{ md: 'lg' }}
              />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

CompleteOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  call: PropTypes.func
}

export default CompleteOrderModal
