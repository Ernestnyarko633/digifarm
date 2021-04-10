import {
  Box,
  useToast,
  Flex,
  Text,
  Divider,
  Avatar,
  Input,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import useAuth from 'context/auth'
import useApi from 'context/api'
import Headings from '../Headings'

const AvatarFormikForm = () => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { patchUser } = useApi()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      file: ''
    },
    onSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        let formData = new FormData()

        formData.append('avatar', values.file)

        const res = await patchUser(user?._id, formData)

        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        resetForm({})
        setStatus({ success: true })
        window.location.reload()
      } catch (error) {
        setStatus({ success: false })
        toast({
          title: 'Error occured',
          description: error.message,
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
        setSubmitting(false)
        setErrors({ submit: error.message })
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Headings title='Profile' />
      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        my={12}
      />

      <Flex align='center'>
        <Avatar
          src={
            formik.values.file
              ? URL.createObjectURL(formik.values.file)
              : null || user?.avatar
          }
          size='xl'
        />
        <Box
          as='label'
          role='button'
          type='button'
          rounded='30px'
          px={{ base: 3, md: 6 }}
          py={2}
          fontSize='sm'
          borderWidth={1}
          borderColor='cf.400'
          color='cf.400'
          ml={6}
        >
          <Input type='file' d='none' onChange={formik.handleChange} />
          <Text fontSize={{ base: 'sm', md: 'md' }}>Upload a new image</Text>
        </Box>
      </Flex>
      <Box textAlign='right' mt={6}>
        <Button
          colorScheme='linear'
          rounded='30px'
          w={40}
          h={12}
          shadow='sm'
          ml={4}
          type='submit'
          isLoading={formik.isSubmitting}
        >
          Save
        </Button>
      </Box>
    </form>
  )
}

export default AvatarFormikForm
