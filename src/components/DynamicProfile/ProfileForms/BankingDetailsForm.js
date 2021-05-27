/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { Box, useToast, Heading, Button, Grid, Flex } from '@chakra-ui/react'
import CustomInput from 'components/Form/CustomInput'
import CustomSelect from 'components/Form/CustomSelect'
import Currencies from 'currencies.json'

import useAuth from 'context/auth'
import useApi from 'context/api'

import { BankDetailsSchema } from 'helpers/validation'
import { objDiff } from 'helpers/misc'
import Constants from 'constant'

const BankingDetailsForm = ({ bankDetails }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { createBankDetails, updateBankDetails } = useApi()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      bankName: bankDetails?.bankName || '',
      bankBranch: bankDetails?.bankBranch || '',
      branchCountry: bankDetails?.branchCountry || '',
      currency: bankDetails?.currency || '',
      swiftCode: bankDetails?.swiftCode || '',
      accountName: bankDetails?.accountName || '',
      accountNumber: bankDetails?.accountNumber || '',
      branchAddress: bankDetails?.branchAddress || '',
      iban: bankDetails?.iban || ''
    },
    enableReinitialize: true,
    validationSchema: BankDetailsSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let res
        if (bankDetails._id) {
          let updatedValue = objDiff(values, user)
          res = await updateBankDetails(bankDetails._id, updatedValue)
        } else {
          res = await createBankDetails({
            ...values,
            user: user._id
          })
        }

        toast({
          title: 'Profile successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        window.location.reload()
      } catch (error) {
        toast({
          status: 'error',
          duration: 5000,
          position: 'top-right',
          title: 'Error occured',
          description: error.message
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
    isSubmitting
  } = formik

  return (
    <form onSubmit={handleSubmit}>
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
            <CustomInput
              type='text'
              isRequired
              name='bankName'
              onBlur={handleBlur}
              label='Bank Name'
              onChange={handleChange}
              value={values.bankName}
              error={errors.bankName}
              touched={touched.bankName}
              placeholder='Enter your bank name'
            />

            <CustomInput
              type='text'
              isRequired
              name='bankBranch'
              onBlur={handleBlur}
              label='Bank Branch'
              onChange={handleChange}
              value={values.bankBranch}
              error={errors.bankBranch}
              touched={touched.bankBranch}
              placeholder='Enter your bank branch'
            />

            <CustomInput
              type='text'
              isRequired
              name='branchAddress'
              onBlur={handleBlur}
              label='Bank Branch Address'
              onChange={handleChange}
              value={values.branchAddress}
              error={errors.branchAddress}
              touched={touched.branchAddress}
              placeholder='Enter your bank branch address'
            />

            <CustomSelect
              isRequired
              labelKey='name'
              valueKey='name'
              name='branchCountry'
              options={Constants.countrys}
              onBlur={handleBlur}
              label='Bank Branch Country'
              onChange={handleChange}
              value={values.branchCountry}
              error={errors.branchCountry}
              touched={touched.branchCountry}
              placeholder='Enter your bank branch country'
            />

            <CustomInput
              type='text'
              isRequired
              name='accountName'
              onBlur={handleBlur}
              label='Account Name'
              onChange={handleChange}
              value={values.accountName}
              error={errors.accountName}
              touched={touched.accountName}
              placeholder='Enter your bank account name'
            />

            <CustomInput
              type='number'
              name='accountNumber'
              onBlur={handleBlur}
              label='Account Number'
              onChange={handleChange}
              value={values.accountNumber}
              error={errors.accountNumber}
              touched={touched.accountNumber}
              placeholder='Enter your bank account number'
            />

            <CustomInput
              type='text'
              name='iban'
              onBlur={handleBlur}
              label='IBAN Number'
              value={values.iban}
              error={errors.iban}
              touched={touched.iban}
              onChange={handleChange}
              placeholder='Enter your IBAN number'
            />

            <CustomSelect
              isRequired
              labelKey='name'
              valueKey='name'
              name='currency'
              onBlur={handleBlur}
              options={Currencies.currencies}
              label='Account Currency'
              value={values.currency}
              error={errors.currency}
              touched={touched.currency}
              onChange={handleChange}
              placeholder='Enter your account currency'
            />

            <CustomInput
              isRequired
              type='text'
              name='swiftCode'
              onBlur={handleBlur}
              label='Swift Code'
              value={values.swiftCode}
              error={errors.swiftCode}
              touched={touched.swiftCode}
              onChange={handleChange}
              placeholder='Enter your bank swift code'
            />
          </Grid>

          <Flex justify='flex-end' mt={6}>
            <Button
              h={12}
              shadow='sm'
              type='submit'
              rounded='30px'
              ml={{ md: 4 }}
              colorScheme='linear'
              isLoading={isSubmitting}
              w={{ base: '100%', md: 40 }}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Box>
    </form>
  )
}

BankingDetailsForm.propTypes = { bankDetails: PropTypes.any }

export default BankingDetailsForm
