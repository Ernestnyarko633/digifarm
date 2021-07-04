/* eslint-disable no-console */
import React from 'react'
import useAuth from 'context/auth'
import useFetch from 'hooks/useFetch'
import useApi from 'context/api'
import CustomSelect from 'components/Form/CustomSelect'
import { BankDetailsSchema } from 'helpers/validation'
import Constants from 'constant'
import {
  Flex,
  Heading,
  Checkbox,
  useToast,
  Box,
  Text,
  Grid
} from '@chakra-ui/react'

import { Formik } from 'formik'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import FetchCard from 'components/FetchCard'
import { objDiff } from 'helpers/misc'
import { default as usePayout } from 'context/rollover'
const currencies = require('currencies.json')

//import PropTypes from 'prop-types'

const ConfirmBankingDetails = () => {
  const {
    loading,
    setLoading,
    error: confirmError,
    setError,
    setBigStepper
  } = usePayout()

  const { isAuthenticated } = useAuth()
  const { createBankDetails, updateBankDetails, getUserBankingDetails } =
    useApi()

  const [check, setCheck] = React.useState(false)
  const [reload, setReload] = React.useState(0)

  const { user } = isAuthenticated()
  const toast = useToast()

  const { data, isLoading, error } = useFetch(
    null,
    user?._id ? getUserBankingDetails : null,
    reload,
    { user: user?._id }
  )

  const triggerReload = () => {
    return setReload(prevState => prevState + 1)
  }

  const initialValues = {
    bankName: data?.bankName || '',
    bankBranch: data?.bankBranch || '',
    branchCountry: data?.branchCountry || '',
    currency: data?.currency || '',
    swiftCode: data?.swiftCode || '',
    accountName: data?.accountName || '',
    accountNumber: data?.accountNumber || '',
    branchAddress: data?.branchAddress || '',
    iban: data?.iban || '',
    sortCode: data?.sortCode || '',
    homeAddress: data?.homeAddress || ''
  }

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null)
      let res
      if (data._id) {
        let updatedValue = objDiff(values, user)
        res = await updateBankDetails(data._id, updatedValue)
      } else {
        res = await createBankDetails({
          ...values,
          user: user._id
        })
      }

      toast({
        title: 'Profile successfully updated.',
        description: res?.message,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      setBigStepper(draft => draft + 1)
    } catch (error) {
      toast({
        status: 'error',
        duration: 5000,
        position: 'top-right',
        title: 'Error occured',
        description: error?.message
      })
      setError(error)
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <Box w={{ base: '100%', xl: '40%' }} h={{ base: '100vh' }}>
      <Formik
        enableReinitialize
        validationSchema={BankDetailsSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched
        }) => (
          <form
            style={{
              width: '100%',
              height: '100%'
            }}
            onSubmit={handleSubmit}
          >
            {isLoading || loading || confirmError || error ? (
              <Flex w='100%' align='center' justify='center'>
                <FetchCard
                  w='100vw'
                  h='100vh'
                  direction='column'
                  align='center'
                  justify='center'
                  mx='auto'
                  reload={() => {
                    !data && triggerReload()
                  }}
                  loading={isLoading || loading}
                  error={error || confirmError}
                  text={
                    isLoading
                      ? 'Standby as we load some of your details'
                      : loading
                      ? 'Updating Banking Details'
                      : null
                  }
                />
              </Flex>
            ) : (
              <Box w='100%' h='100%'>
                <Flex
                  align='center'
                  justify='center'
                  borderBottomWidth={1}
                  borderBottomColor='gray.200'
                  w='100%'
                >
                  <Heading
                    as='h3'
                    fontSize={{ base: 'md', md: '4xl' }}
                    fontWeight={800}
                  >
                    Confirm Bank Details
                  </Heading>
                </Flex>
                <Flex
                  w='100%'
                  direction='column'
                  justify='center'
                  align='center'
                  py={{ base: 2, md: 5 }}
                >
                  <Grid
                    templateColumns={{ md: 'repeat(1, 1fr)' }}
                    w='100%'
                    direction='column'
                    gap={{ base: 5 }}
                  >
                    <Grid
                      templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)'
                      }}
                      w='100%'
                      gap={{ base: 5 }}
                      direction='column'
                    >
                      <FormInput
                        label='Account name'
                        name='accountName'
                        value={values.accountName}
                        onChange={handleChange}
                        touched={touched.accountName}
                        error={errors.accountName}
                        onBlur={handleBlur}
                        borderBottomColor={{ base: 'black' }}
                        isRequired
                        bg='gray.100'
                      />

                      <FormInput
                        label='Account number'
                        name='accountNumber'
                        value={values.accountNumber}
                        borderBottomColor={{ base: 'black' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.accountNumber}
                        error={errors.accountNumber}
                        isRequired
                        bg='gray.100'
                      />
                      <FormInput
                        label='Bank name'
                        name='bankName'
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.bankName}
                        error={errors.bankName}
                        isRequired
                        borderBottomColor={{ base: 'black' }}
                        bg='gray.100'
                      />

                      <CustomSelect
                        mt={1}
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
                        borderBottomColor={{ base: 'black' }}
                        placeholder='Enter your bank branch country'
                      />
                    </Grid>
                    <FormInput
                      label='Branch address'
                      name='branchAddress'
                      value={values.branchAddress}
                      h={{ md: 68 }}
                      onChange={handleChange}
                      touched={touched.branchAddress}
                      error={errors.branchAddress}
                      onBlur={handleBlur}
                      borderBottomColor={{ base: 'black' }}
                      isRequired
                      bg='gray.100'
                    />

                    <FormInput
                      label='IBAN'
                      name='iban'
                      value={values.iban}
                      h={{ md: 68 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched.iban}
                      error={errors.iban}
                      borderBottomColor={{ base: 'black' }}
                      isRequired
                      bg='gray.100'
                    />
                    <CustomSelect
                      isRequired
                      labelKey='name'
                      valueKey='name'
                      name='currency'
                      onBlur={handleBlur}
                      options={currencies.currencies}
                      label='Account Currency'
                      value={values.currency}
                      error={errors.currency}
                      touched={touched.currency}
                      onChange={handleChange}
                      borderBottomColor={{ base: 'black' }}
                      placeholder='Enter your account currency'
                    />
                    <Grid
                      templateColumns={{ md: 'repeat(2, 1fr)' }}
                      gap={{ base: 5, md: 8 }}
                      w='100%'
                    >
                      <FormInput
                        label='Sort code'
                        name='sortCode'
                        value={values.sortCode}
                        onChange={handleChange}
                        touched={touched.sortCode}
                        error={errors.sortCode}
                        borderBottomColor={{ base: 'black' }}
                        onBlur={handleBlur}
                        isRequired
                        bg='gray.100'
                      />
                      <FormInput
                        label='Swift code'
                        name='swiftCode'
                        value={values.swiftCode}
                        onChange={handleChange}
                        touched={touched.swiftCode}
                        error={errors.swiftCode}
                        borderBottomColor={{ base: 'black' }}
                        onBlur={handleBlur}
                        isRequired
                        bg='gray.100'
                      />
                    </Grid>
                    <FormInput
                      label='Home address'
                      name='homeAddress'
                      value={values.homeAddress}
                      onChange={handleChange}
                      touched={touched.homeAddress}
                      error={errors.homeAddress}
                      h={{ md: 68 }}
                      borderBottomColor={{ base: 'black' }}
                      onBlur={handleBlur}
                      isRequired
                      bg='gray.100'
                    />
                  </Grid>
                  <Flex w='100%' mt={{ base: 3, md: 5 }}>
                    <Box mx={2} mt={{ base: 2, md: 'auto' }} pt={{ md: 1 }}>
                      <Checkbox onChange={() => setCheck(!check)} />
                    </Box>
                    <Text
                      fontSize={{ base: 'base', md: 'auto' }}
                      ml={{ md: 4 }}
                    >
                      I hereby confirm that all the information provided on this
                      form is accurate. In addition, I agree that Complete
                      Farmer Limited will not be held liable for any loss or
                      misrouted funds that occur as a result of any wrong
                      information provided by me
                    </Text>
                  </Flex>
                  <Button
                    type='submit'
                    btntitle='Confirm'
                    borderColor='cf.green'
                    color='white'
                    rounded={30}
                    my={5}
                    h={{ base: '3.688rem' }}
                    w='100%'
                    isDisabled={!check}
                    isLoading={isSubmitting}
                    fontSize='xl'
                    // onClick={() => {
                    //   handleModalClick('payout')
                    // }}
                  />
                </Flex>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  )
}

ConfirmBankingDetails.propTypes = {}

export default ConfirmBankingDetails
