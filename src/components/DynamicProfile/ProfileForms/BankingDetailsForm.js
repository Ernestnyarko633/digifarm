import { Box, useToast, Heading, Button, Grid } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import useAuth from 'context/auth'
import useApi from 'context/api'
import { FormInput } from 'components/Form'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'

const BankingDetailsForm = ({ bankDetails }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { createBankDetails, updateBankDetails } = useApi()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      bankName: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.bankName
        : '',
      bankBranch: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.bankBranch
        : '',
      branchCountry: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.bankCountry
        : '',
      currency: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.currency
        : '',
      swiftCode: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.swiftCode
        : '',
      accountName: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.accountName
        : '',
      accountNumber: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.accountNumber
        : '',
      branchAddress: bankDetails?.length
        ? bankDetails[0]?.bankDetails?.branchAddress
        : '',
      iban: bankDetails?.length ? bankDetails[0]?.bankDetails?.iban : ''
    },
    onSubmit: async (
      values,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      try {
        let data = {
          user: user?._id,
          bankDetails: {
            iban: values.iban,
            bankName: values.bankName,
            bankBranch: values.bankBranch,
            branchAddress: values.branchAddress,
            branchCountry: values.branchCountry,
            currency: values.currency,
            swiftCode: values.swiftCode,
            accountName: values.accountName,
            accountNumber: values.accountNumber
          }
        }
        if (!values.iban) delete data.bankDetails.iban
        if (!values.accountNumber) delete data.bankDetails.accountNumber
        const res = bankDetails?.length
          ? await updateBankDetails(bankDetails?._id, data)
          : await createBankDetails(data)

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
    <Fade bottom>
      <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.bankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />

              <FormInput
                label='Bank branch'
                name='bankBranch'
                value={formik.values.bankBranch}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />
              <FormInput
                label='Branch Address'
                name='branchAddress'
                value={formik.values.branchAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />

              <FormInput
                label='Branch Country'
                name='branchCountry'
                value={formik.values.branchCountry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />

              <FormInput
                label='Account Name'
                name='accountName'
                value={formik.values.accountName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />

              <FormInput
                label='Account Number'
                name='accountNumber'
                value={formik.values.accountNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values?.iban?.length > 1}
                isRequired
                type='account'
                bg='white'
              />

              <FormInput
                label='IBAN Number'
                name='iban'
                value={formik.values.iban}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                type='string'
                disabled={formik.values?.accountNumber?.length > 1}
                bg='white'
              />

              <FormInput
                label='Account Currency'
                name='currency'
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isRequired
                bg='white'
              />

              <FormInput
                label='Swift Code'
                name='swiftCode'
                value={formik.values.swiftCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                isLoading={formik.isSubmitting}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Fade>
  )
}

BankingDetailsForm.propTypes = { bankDetails: PropTypes.any }

export default BankingDetailsForm
