/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, useToast, Heading, Button, Grid } from '@chakra-ui/react'
import { useFormik } from 'formik'

import useAuth from 'context/auth'
import useApi from 'context/api'

import CustomPhoneInput from 'components/Form/CustomPhoneInput'
import CustomInput from 'components/Form/CustomInput'
import CustomSelect from 'components/Form/CustomSelect'
import Constants from 'constant'

import { PersonalInfoSchema } from 'helpers/validation'
import { objDiff } from 'helpers/misc'

const UserDetailsForm = () => {
  const { isAuthenticated, store } = useAuth()
  const { user } = isAuthenticated()
  const { patchUser } = useApi()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      lastName: user?.lastName || '',
      firstName: user?.firstName || '',
      dateOfBirth: user?.dateOfBirth
        ? new Date(user?.dateOfBirth).toISOString().substr(0, 10)
        : '',
      phoneNumber: user?.phoneNumber || '',
      address: {
        state: user?.address?.state || '',
        street: user?.address?.street || '',
        country: user?.address?.country || ''
      }
    },
    enableReinitialize: true,
    validationSchema: PersonalInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let updatedValue = objDiff(values, user)
        if (updatedValue?.address) {
          if (updatedValue?.country) {
            updatedValue.address.country = values.address.country
            delete updatedValue?.country
          }
          Object.keys(values.address).forEach(function (key) {
            Object.keys(updatedValue.address).forEach(function (_key) {
              if (key === _key) {
                values.address[key] = updatedValue.address[_key]
              }
            })
          })
          updatedValue.address = values.address
        } else if (updatedValue.country) {
          updatedValue.address = {
            country: values.address.country,
            street: values.address.street,
            state: values.address.state
          }
          delete updatedValue?.country
        }

        const res = await patchUser(user?._id, updatedValue)
        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        store({ user: res.data })
        window.location.reload()
      } catch (error) {
        toast({
          title: 'Error occured',
          description: error.message,
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
        setSubmitting(false)
      }
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setFieldTouched
  } = formik

  return (
    <form onSubmit={handleSubmit}>
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
            <CustomInput
              type='text'
              isRequired
              name='firstName'
              onBlur={handleBlur}
              label='First Name'
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
              placeholder='Enter your first name'
            />

            <CustomInput
              type='text'
              isRequired
              name='lastName'
              onBlur={handleBlur}
              label='Last Name'
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
              placeholder='Enter your last name'
            />

            <CustomInput
              isRequired
              type='date'
              label='Birthday'
              name='dateOfBirth'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.dateOfBirth}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
            />

            <CustomInput
              type='text'
              isDisabled
              isRequired
              name='email'
              onBlur={handleBlur}
              label='Email Address'
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              placeholder='Enter your email address'
            />

            <CustomPhoneInput
              isRequired
              error={errors.phoneNumber}
              value={values.phoneNumber}
              touched={touched.phoneNumber}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <CustomInput
              type='text'
              isRequired
              label='Street'
              name='address.street'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address?.street}
              error={errors.address?.street}
              touched={touched.address?.street}
              placeholder='Enter your street name'
            />

            <CustomInput
              type='text'
              isRequired
              label='State/Region'
              name='address.state'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address?.state}
              error={errors.address?.state}
              touched={touched.address?.state}
              placeholder='Enter your state/region'
            />

            <CustomSelect
              isRequired
              labelKey='name'
              valueKey='name'
              label='Country'
              name='address.country'
              options={Constants.countrys}
              onBlur={handleBlur}
              onChange={e => handleChange(e)}
              value={values.address?.country}
              error={errors.address?.country}
              touched={touched.address?.country}
              placeholder='Enter your country of residence'
            />
          </Grid>

          <Flex justify='flex-end' mt={6}>
            <Button
              w={40}
              h={12}
              ml={4}
              shadow='sm'
              type='submit'
              rounded='30px'
              colorScheme='linear'
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Box>
    </form>
  )
}

export default UserDetailsForm
