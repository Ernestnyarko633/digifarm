import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'

import ImageUpload from '../ImageUpload'
import { Formik } from 'formik'

const CompleteOrderModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = React.useState([])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
      <ModalOverlay />
      <ModalContent maxH={{ md: 125 }} overflowY='scroll'>
        <ModalCloseButton />
        <ModalBody p={{ md: 10 }} h={{ md: '100%' }}>
          <Box textAlign='center'>
            <Box>
              <Heading as='h4' fontSize={{ md: '2xl' }}>
                Upload your payment receipt to complete your order
              </Heading>

              <Box mt={{ md: 4 }}>
                <Button btntitle='Pay with card' width={{ md: 56 }} />
              </Box>
            </Box>

            <Formik initialValues={{ file: '' }}>
              {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Box mt={{ md: 10 }}>
                    <ImageUpload
                      files={files}
                      setFiles={setFiles}
                      setFieldValue={setFieldValue}
                      values={values.file}
                    />
                  </Box>

                  <Box mt={{ md: 5 }}>
                    <Button
                      width='100%'
                      height={12}
                      btntitle='Upload document'
                      isLoading={isSubmitting}
                      fontSize={{ md: 'lg' }}
                    />
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

CompleteOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool
}

export default CompleteOrderModal
