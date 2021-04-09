/* eslint-disable no-console */
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
import { FormInput } from 'components/Form'

import useAuth from 'context/auth'
import useApi from 'context/api'
import BasePhone from 'components/Form/BasePhone'
import Signature from 'components/Signature'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'

const Profile = () => {
  const { isAuthenticated } = useAuth()
  const [reload, setReload] = React.useState(0)

  const triggerReload = () => setReload(s => s++)
  const {
    patchUser,
    createBankDetails,
    updateBankDetails,
    getBankDetails
  } = useApi()

  const { user } = isAuthenticated()
  const toast = useToast()

  const { data: bankDetails, isLoading: loading, error } = useFetch(
    null,
    getBankDetails,
    reload,
    {
      user: user?._id
    }
  )
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
  console.log(bankDetails, 'chec')

  const bankValues = {
    bankName: bankDetails?.length ? bankDetails[0]?.bankDetails?.bankName : '',
    bankBranch: bankDetails?.length
      ? bankDetails[0]?.bankDetails?.bankBranch
      : '',
    branchCountry: bankDetails?.length
      ? bankDetails[0]?.bankDetails?.branchCountry
      : '',
    currency: bankDetails?.length ? bankDetails[0]?.bankDetails?.currency : '',
    swiftCode: bankDetails?.length
      ? bankDetails[0]?.bankDetails?.swiftCode
      : '',
    accountName: bankDetails?.length
      ? bankDetails[0]?.bankDetails?.accountNumber
      : '',
    accountNumber: bankDetails?.length
      ? bankDetails[0]?.bankDetails?.accountNumber
      : '',
    iban: bankDetails?.length ? bankDetails[0]?.iban : ''
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

  const onBankSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      const data = {
        user: user?._id,
        iban: values.iban,
        bankDetails: {
          bankName: values.bankName,
          bankBranch: values.bankBranch,
          branchCountry: values.bankCountry,
          currency: values.currency,
          swiftCode: values.swiftCode,
          accountName: values.accountName,
          accountNumber: values.accountNumber
        }
      }
      const res = bankDetails?.length
        ? await updateBankDetails(bankDetails?._id, data)
        : await createBankDetails(data)

      if (res.statusCode === 201) {
        toast({
          title: 'Bank details created.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        resetForm({})
        setStatus({ success: true })
        window.location.reload()
      } else if (res.statusCode === 200) {
        toast({
          title: 'Bank details updated.',
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
    <Container maxW={{ md: '4xl' }}>
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
                px={{ base: 3, md: 6 }}
                py={2}
                fontSize='sm'
                borderWidth={1}
                borderColor='cf.400'
                color='cf.400'
                ml={6}
              >
                <Input type='file' d='none' />
                <Text fontSize={{ base: 'sm', md: 'md' }}>
                  Upload a new image
                </Text>
              </Box>
            </Flex>

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

      <Box
        rounded='xl'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        bg='white'
        p={{ base: 2, md: 10 }}
        mt={12}
      >
        <Signature data={user?.signature} />
      </Box>

      <Box
        rounded='xl'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        mt={12}
        bg='white'
        p={{ base: 2, md: 10 }}
      >
        <Box m={{ base: 4, md: 10 }}>
          <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
            Identification Info
          </Heading>
          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)' }}
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

      {(loading || error) && (
        <FetchCard
          direction='column'
          align='center'
          justify='center'
          mx='auto'
          reload={() => {
            triggerReload()
          }}
          loading={loading}
          error={error}
          text='Standby as we load your bank details'
        />
      )}
      {!loading && !error && (
        <Formik initialValues={bankValues}>
          {({
            values,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={onBankSubmit}>
              <Box
                rounded='xl'
                filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
                my={12}
                bg='white'
                p={{ base: 2, md: 10 }}
              >
                <Box m={10}>
                  <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
                    Bank details
                  </Heading>
                  <Grid
                    templateColumns={{ md: 'repeat(2, 1fr)' }}
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
                      disabled={values?.iban?.length > 1}
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
                      disabled={values?.accountNumber?.length > 1}
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
                      w={{ base: '100%', md: 40 }}
                      h={12}
                      shadow='sm'
                      ml={{ md: 4 }}
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
      )}
    </Container>
  )
}

export default Profile
