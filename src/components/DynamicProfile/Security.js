import React from 'react'
import {
  Box,
  // Flex,
  Text,
  Button,
  Divider,
  Container,
  Grid,
  // Switch,
  useToast
} from '@chakra-ui/react'
import { Formik } from 'formik'

import useApi from 'context/api'

import { FormInput } from 'components/Form'
import Headings from './Headings'

import { ChangePassword } from 'helpers/validation'

const Security = () => {
  const { changePassword } = useApi()
  const toast = useToast()

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      const res = await changePassword(values)
      if (res.statusCode === 200) {
        toast({
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
      }
      resetForm({})
      setStatus({ success: true })
    } catch (error) {
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
    }
  }

  return (
    <Container maxW='4xl'>
      <Headings title='Security' />
      <Divider orientation='horizontal' my={12} />
      <Box>
        <Box>
          <Text>Change your password</Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            Turn notification on to receive notification in your dashboard
          </Text>
        </Box>
        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          onSubmit={onSubmit}
          validationSchema={ChangePassword}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid gap={6} w={80} mt={12}>
                <FormInput
                  label='Old Password'
                  placeholder='At least 8 characters'
                  type='password'
                  name='oldPassword'
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bg='white'
                />
                <FormInput
                  label='New Password'
                  placeholder='At least 8 characters'
                  type='password'
                  name='newPassword'
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bg='white'
                />

                <Button
                  rounded='30px'
                  mt={4}
                  w={40}
                  h={12}
                  shadow='sm'
                  bg='transparent'
                  color='gray.600'
                  borderWidth={1}
                  borderColor='gray.600'
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                  type='submit'
                  isLoading={isSubmitting}
                >
                  Save changes
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      <Divider orientation='horizontal' my={12} />
      {/* <Flex justify='space-between'>
        <Box>
          <Text fontFamily='heading' fontSize={{ base: 'lg', md: 'xl' }}>
            Two-step verification
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            Turn on to receive notification via push notification
          </Text>
        </Box>

        <Box d={{ base: 'none', md: 'block' }}>
          <Switch colorScheme='cfButton' size='lg' />
        </Box>
      </Flex> */}
      <Divider orientation='horizontal' my={12} />
    </Container>
  )
}

export default Security
