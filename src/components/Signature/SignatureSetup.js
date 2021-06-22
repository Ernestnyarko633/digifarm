import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Flex, Text, Checkbox, useToast } from '@chakra-ui/react'

import { IoMdClose, IoMdCreate, IoMdImages } from 'react-icons/io'

import FormInput from 'components/Form/FormInput'
import CustomUploader from 'components/Form/CustomUploader'
import Preview from 'components/FilePreview'

import useAuth from 'context/auth'
import useApi from 'context/api'

import { TextFormSchema, FileFormSchema } from 'helpers/validation'
import Button from 'components/Button'

const SignatureSetup = ({ isEditing, setIsEditing }) => {
  const [acceptTC, setAcceptTC] = useState(false)
  const [withText, setWithText] = useState(false)
  const [withImage, setWithImage] = useState(false)

  const { store, isAuthenticated, setSession } = useAuth()
  const { patchUser } = useApi()

  const user = isAuthenticated().user

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      text: '',
      file: ''
    },
    enableReinitialize: true,
    validationSchema: withImage ? FileFormSchema : TextFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (acceptTC) {
        try {
          setSubmitting(true)
          let res = null
          if (values.file) {
            let formData = new FormData()
            formData.append('signature', values.file)
            res = await patchUser(user._id, formData)
          } else {
            res = await patchUser(user._id, {
              signature: { string: values.text, check: 'text' }
            })
          }
          store({ user: res.data })
          toast({
            duration: 5000,
            isClosable: true,
            status: 'success',
            position: 'top-right',
            title: 'Action successful',
            description: res.message
          })
        } catch (error) {
          let eMgs = 'Unexpected network error.'
          if (error) {
            if ([401, 403].includes(error.status)) {
              setSession(false)
            } else {
              eMgs =
                (error?.data?.message ||
                  error?.message ||
                  'Unknown error occurred') + '.'
            }
          }
          toast({
            duration: 9000,
            status: 'error',
            isClosable: true,
            position: 'top-right',
            title: 'An error occurred',
            description: eMgs
          })
        } finally {
          setSubmitting(false)
        }
      } else {
        toast({
          duration: 5000,
          isClosable: true,
          status: 'error',
          position: 'top-right',
          title: 'Please check form',
          description: 'You must accept term and condition!'
        })
      }
    }
  })

  return (
    <>
      {(withText || withImage) && (
        <Flex w='100%' justifyContent='flex-end'>
          <Button
            btntitle='Close'
            shadow='none'
            leftIcon={<IoMdClose size={20} />}
            onClick={() => {
              formik.setFieldValue('file')
              formik.setFieldValue('text', '')
              setWithText(false)
              setWithImage(false)
              setAcceptTC(false)
              setIsEditing(!isEditing)
            }}
          />
        </Flex>
      )}

      <Flex
        p={4}
        w='100%'
        wrap='wrap-reverse'
        rounded='md'
        pos='relative'
        bgColor='white'
        justifyContent='space-between'
      >
        {!withText && !withImage ? (
          <>
            <Button
              btntitle='Use Text'
              color='white'
              bgColor='cf.500'
              leftIcon={<IoMdCreate size={20} />}
              onClick={() => setWithText(true)}
            />
            <Button
              btntitle='Use Image'
              leftIcon={<IoMdImages size={20} />}
              onClick={() => setWithImage(true)}
            />
          </>
        ) : (
          <>
            <Flex
              w={{ base: '100%', lg: '47%' }}
              mt={10}
              as='form'
              wrap='wrap'
              onSubmit={formik.handleSubmit}
            >
              {withImage && (
                <Flex
                  as='button'
                  borderWidth={2}
                  alignItems='center'
                  borderColor='cf.green'
                  title='Upload Signature'
                >
                  <CustomUploader
                    form={formik}
                    field={{ name: 'file' }}
                    accept='image/jpeg, image/png'
                  />

                  <Text
                    px={10}
                    as='span'
                    color='cf.green'
                    pos='absolute'
                    cursor='pointer'
                    fontWeight='600'
                  >
                    Click here to select your signature
                  </Text>
                </Flex>
              )}
              {withText && (
                <FormInput
                  id='text'
                  type='text'
                  name='text'
                  minLength='5'
                  maxLength='30'
                  blur={formik.handleBlur}
                  value={formik.values.text}
                  error={formik.errors.text}
                  onChange={formik.handleChange}
                  touched={formik.touched.text}
                  placeholder='Enter your signature'
                />
              )}
              <Button
                py={3}
                mt={4}
                w='100%'
                fontSize='lg'
                shadow='none'
                type='submit'
                btntitle='Submit'
                isLoading={formik.isSubmitting}
                isDisabled={
                  formik.isSubmitting || !(formik.dirty || formik.isValid)
                }
              />
              <Checkbox
                mt={3}
                name='acceptTC'
                isChecked={acceptTC}
                colorScheme='cfButton'
                borderColor='gray.200'
                onChange={() => setAcceptTC(!acceptTC)}
              >
                <Text fontSize='xs' textColor='gray.700'>
                  By clicking the "Submit" button, you accept that the signature
                  you are about to submit is binding and will serve as your
                  signature for all Complete Farmer legal document signings such
                  as farm contracts etc.
                </Text>
              </Checkbox>
            </Flex>
            <Flex
              mx={2}
              mt={10}
              border='2px'
              textAlign='center'
              borderColor='cf.green'
              justifyContent='center'
              w={{ base: '100%', lg: '47%' }}
            >
              {withText && (
                <Text
                  mt={10}
                  fontSize='25px'
                  fontWeight='bold'
                  fontFamily='signature'
                >
                  {formik.values?.text}
                </Text>
              )}
              {withImage && (
                <Preview
                  type='image'
                  style={{
                    width: '200px',
                    height: '120px',
                    padding: '10px'
                  }}
                  fileData={formik.values?.file}
                  handleClear={() => formik.setFieldValue('file')}
                />
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}

SignatureSetup.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired
}

export default SignatureSetup
