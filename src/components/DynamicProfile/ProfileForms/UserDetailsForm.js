/*eslint-disable*/

import { Box, useToast, Heading, Button, Grid } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import useAuth from 'context/auth'
import useApi from 'context/api'
import { FormInput } from 'components/Form'
import BasePhone from 'components/Form/BasePhone'
import CustomPhoneInput from 'components/Form/CustomPhoneInput'

const UserDetailsForm = () => {
  const { isAuthenticated, store } = useAuth()
  const { user } = isAuthenticated()
  const { patchUser } = useApi()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: {
        street: user?.address?.street,
        state: user?.address?.state,
        country: user?.address?.country
      },
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
      phoneNumber: user?.phoneNumber
    },
    onSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        const data = {
          firstName: values?.firstName,
          lastName: values?.lastName,
          address: {
            street: values.address.street,
            state: values.address.state,
            country: values.address.country
          },
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values?.phoneNumber
        }

        const res = await patchUser(user?._id, data)

        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        resetForm({})
        setStatus({ success: true })
        store({ user: res.data })
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
      <Box
        rounded='xl'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        bg='white'
        p={{ base: 2, md: 10 }}
        mt={12}
      >
        <Box m={10}>
          <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
            Personal Info
          </Heading>

          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)' }}
            w='100%'
            gap={6}
            mb={6}
          >
            <FormInput
              label='First Name'
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
            />
            <FormInput
              label='Last Name'
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
            />

            <FormInput
              label='Date of birth'
              name='dateOfBirth'
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              disabled
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
              type='date'
            />
            <FormInput
              label='Street'
              name='address.street'
              value={formik.values.address.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
            />
            <FormInput
              label='State'
              name='address.state'
              value={formik.values.address.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
            />

            <FormInput
              label='Country'
              name='address.country'
              value={formik.values.address.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
            />

            {/* <BasePhone
              country={formik.values.address.country}
              value={formik.values.phoneNumber.replace(/\D/g, '').substr(3, 10)}
              setFieldTouched={formik.setFieldTouched}
              setFieldValue={formik.setFieldValue}
              phoneNumber='phoneNumber'
              error={formik.errors.phoneNumber}
              bg='white'
            /> */}

          <CustomPhoneInput
            name='phoneNumber'
            error={formik.errors.phoneNumber}
            value={formik.values.phoneNumber}
            touched={formik.touched.phoneNumber}
            setFieldValue={formik.setFieldValue}
            setFieldTouched={formik.setFieldTouched}
          />

            <FormInput
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isRequired
              bg='white'
              disabled
            />
          </Grid>

          {/* <Box>
                <FormTextArea bg='white' label='About you' />
              </Box> */}

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
        </Box>
      </Box>
    </form>
  )
}

export default UserDetailsForm
