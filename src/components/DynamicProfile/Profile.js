import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Grid,
  Text,
  useToast,
  Container,
  Divider,
  Avatar,
  Input,
  Button
} from '@chakra-ui/react'
import { Formik } from 'formik'

import Headings from './Headings'
import { FormInput, FormTextArea } from 'components/Form'

import useAuth from 'context/auth'
import useApi from 'context/api'
import BasePhone from 'components/Form/BasePhone'
import Signature from 'components/Signature'

const Profile = () => {
  const { isAuthenticated } = useAuth()
  const { patchUser } = useApi()

  const { user } = isAuthenticated()
  const toast = useToast()

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: {
      street: user?.address?.street,
      state: user?.address?.state,
      country: user?.address?.country
    },
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    IdType: '',
    IDNumber: ''
  }

  const bankValues = {
    bankName: '',
    bankBranch: '',
    branchCountry: '',
    currency: '',
    swiftCode: '',
    accountName: '',
    accountNumber: '',
    iban: ''
  }

  const onSubmit = async (
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
      if (res.statusCode === 200) {
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
      } else if (res.statusCode === 400) {
        toast({
          title: 'Error occured',
          description: res.message,
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
      }
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

  return (
    <Container maxW='4xl'>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          handleSubmit,
          errors,
          setFieldTouched,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <Headings title='Profile' />

            <Divider
              orientation='vertical'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              my={12}
            />

            <Flex align='center'>
              <Avatar src={user?.avatar} size='xl' />
              <Box
                as='label'
                role='button'
                type='button'
                rounded='30px'
                px={6}
                py={2}
                fontSize='sm'
                borderWidth={1}
                borderColor='cf.400'
                color='cf.400'
                ml={6}
              >
                <Input type='file' d='none' />
                <Text>Upload a new image</Text>
              </Box>
            </Flex>

            <Box rounded='xl' shadow='md' bg='white' p={10} mt={12}>
              <Box m={10}>
                <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
                  Personal Info
                </Heading>

                <Grid
                  templateColumns='repeat(2, 1fr)'
                  w={{ md: '100%' }}
                  gap={6}
                  mb={6}
                >
                  <FormInput
                    label='First Name'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />
                  <FormInput
                    label='Last Name'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Date of birth'
                    name='dateOfBirth'
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    disabled
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                    type='date'
                  />
                  <FormInput
                    label='Street'
                    name='address.street'
                    value={values.address.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />
                  <FormInput
                    label='State'
                    name='address.state'
                    value={values.address.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Country'
                    name='address.country'
                    value={values.address.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <BasePhone
                    country={values.address.country}
                    value={values.phoneNumber.replace(/\D/g, '').substr(3, 10)}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    phoneNumber='phoneNumber'
                    error={errors.phoneNumber}
                    bg='white'
                  />

                  <FormInput
                    label='Email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                    disabled
                  />
                </Grid>

                <Box>
                  <FormTextArea bg='white' label='About you' />
                </Box>

                <Box textAlign='right' mt={6}>
                  <Button
                    colorScheme='linear'
                    rounded='30px'
                    w={40}
                    h={12}
                    shadow='sm'
                    ml={4}
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>

      <Box rounded='xl' shadow='md' bg='white' p={10} mt={12}>
        <Signature data={user?.signature} />
      </Box>

      <Box rounded='xl' shadow='md' mt={12} bg='white' p={10}>
        <Box m={10}>
          <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
            Identification Info
          </Heading>
          <Grid
            templateColumns='repeat(2, 1fr)'
            w={{ md: '100%' }}
            gap={6}
            mb={6}
          >
            <FormInput
              label='ID Type'
              name='IdType'
              // value={values.IdType}
              isRequired
              bg='white'
            />
            <FormInput
              label='ID Number'
              name='IDNumber'
              // value={values.IDNumber}
              isRequired
              bg='white'
            />
          </Grid>
          <FormInput
            label='Country'
            // value={values.address.country}
            isRequired
            bg='white'
          />
        </Box>

        <Box textAlign='right' mt={6}>
          <Button
            colorScheme='linear'
            rounded='30px'
            w={40}
            h={12}
            shadow='sm'
            ml={4}
            type='submit'
            // isLoading={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Formik initialValues={bankValues}>
        {({ values, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box rounded='xl' shadow='md' my={12} bg='white' p={10}>
              <Box m={10}>
                <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
                  Bank details
                </Heading>
                <Grid
                  templateColumns='repeat(2, 1fr)'
                  w={{ md: '100%' }}
                  gap={6}
                >
                  <FormInput
                    label='Bank name'
                    name='bankName'
                    value={values.bankName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Bank branch'
                    name='bankBranch'
                    value={values.bankBranch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Branch Country'
                    name='branchCountry'
                    value={values.branchCountry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Account Name'
                    name='accountName'
                    value={values.accountName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Account Number'
                    name='accountNumber'
                    value={values.accountNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.iban.length > 1}
                    isRequired
                    type='account'
                    bg='white'
                  />

                  <FormInput
                    label='IBAN Number'
                    name='iban'
                    value={values.iban}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    type='account'
                    disabled={values.accountNumber.length > 1}
                    bg='white'
                  />

                  <FormInput
                    label='Account Currency'
                    name='currency'
                    value={values.currency}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />

                  <FormInput
                    label='Swift Code'
                    name='swiftCode'
                    value={values.swiftCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    bg='white'
                  />
                </Grid>

                <Box textAlign='right' mt={6}>
                  <Button
                    colorScheme='linear'
                    rounded='30px'
                    w={40}
                    h={12}
                    shadow='sm'
                    ml={4}
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default Profile
