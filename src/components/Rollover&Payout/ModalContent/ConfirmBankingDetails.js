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
  Icon,
  Text,
  Grid
} from '@chakra-ui/react'

import { Formik } from 'formik'
import { AiFillInfoCircle } from 'react-icons/ai'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import FetchCard from 'components/FetchCard'
import { objDiff } from 'helpers/misc'
const currencies = require('currencies.json')
console.log(currencies, 'currencies')

//import PropTypes from 'prop-types'

const ConfirmBankingDetails = () => {
  const { isAuthenticated } = useAuth()
  const { createBankDetails, updateBankDetails, getUserBankingDetails } =
    useApi()

  const [check, setCheck] = React.useState(false)
  const [reload, setReload] = React.useState(0)

  const { user } = isAuthenticated()
  const toast = useToast()

  const { data, isLoading, error } = useFetch(
    'banking_details',
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
    iban: data?.iban || ''
  }

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
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

  return (
    <Box w={{ md: '40%' }}>
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
          errors,
          touched
        }) => (
          <form onSubmit={handleSubmit}>
            {!isLoading && !error && (
              <Box>
                <Flex
                  align='center'
                  justify='center'
                  borderBottomWidth={1}
                  borderBottomColor='gray.200'
                  px={{ md: 8 }}
                  w='100%'
                >
                  <Heading as='h3' fontSize='4xl' fontWeight={800}>
                    Request for payout
                  </Heading>
                </Flex>
                <Flex
                  w='100%'
                  direction='column'
                  justify='center'
                  align='center'
                  pt={{ md: 20 }}
                >
                  <Flex w='100%'>
                    <Box>
                      <Icon
                        boxSize={5}
                        as={AiFillInfoCircle}
                        color='cf.green'
                      />
                    </Box>
                    <Text ml={{ md: 4 }}>
                      {' '}
                      For authentication purposes, bank information provided
                      here should be the same as that on your dashboard
                    </Text>
                  </Flex>
                  <Grid
                    templateColumns={{ md: 'repeat(1, 1fr)' }}
                    gap={{ md: 8 }}
                    w='100%'
                    py={{ md: 5 }}
                    direction='column'
                  >
                    <Grid
                      templateColumns={{ md: 'repeat(2, 1fr)' }}
                      gap={{ md: 8 }}
                      w='100%'
                      py={{ md: 5 }}
                      direction='column'
                    >
                      <FormInput
                        label='Account name'
                        name='accountName'
                        value={values.accountName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderBottomColor={{ md: 'black' }}
                        isRequired
                        bg='gray.100'
                      />

                      <FormInput
                        label='Account number'
                        name='accountNumber'
                        value={values.accountNumber}
                        h={{ md: 68 }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isRequired
                        bg='gray.100'
                      />
                      <FormInput
                        label='Bank name'
                        name='bankName'
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isRequired
                        h={{ md: 68 }}
                        borderBottomColor={{ md: 'black' }}
                        bg='gray.100'
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
                    </Grid>
                    <FormInput
                      label='Branch address'
                      name='branchAddress'
                      value={values.branchAddress}
                      h={{ md: 68 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      borderBottomColor={{ md: 'black' }}
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
                      borderBottomColor={{ md: 'black' }}
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
                      placeholder='Enter your account currency'
                    />
                    <Grid
                      templateColumns={{ md: 'repeat(2, 1fr)' }}
                      gap={{ md: 8 }}
                      w='100%'
                    >
                      <FormInput
                        label='Sort code'
                        name='sortCode'
                        value={values.sortCode}
                        h={{ md: 68 }}
                        onChange={handleChange}
                        borderBottomColor={{ md: 'black' }}
                        onBlur={handleBlur}
                        isRequired
                        bg='gray.100'
                      />
                      <FormInput
                        label='Swift code'
                        name='swiftCode'
                        value={values.swiftCode}
                        h={{ md: 68 }}
                        onChange={handleChange}
                        borderBottomColor={{ md: 'black' }}
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
                      h={{ md: 68 }}
                      borderBottomColor={{ md: 'black' }}
                      onBlur={handleBlur}
                      isRequired
                      bg='gray.100'
                    />
                  </Grid>
                  <Flex w='100%'>
                    <Box pt={{ md: 1 }}>
                      <Checkbox
                        onClick={() => {
                          if (check) {
                            setCheck(false)
                          } else {
                            setCheck(true)
                          }
                        }}
                      />
                    </Box>
                    <Text ml={{ md: 4 }}>
                      I hereby confirm that all the information provided on this
                      form is accurate. In addition, I agree that Complete
                      Farmer Limited will not be held liable for any loss or
                      misrouted funds that occur as a result of any wrong
                      information provided by me
                    </Text>
                  </Flex>
                  <Button
                    btntitle='Confirm'
                    borderColor='cf.green'
                    color='white'
                    rounded='30px'
                    my={5}
                    w='100%'
                    h={100}
                    isDisabled={!check}
                    fontSize='xl'
                    // onClick={() => {
                    //   handleModalClick('payout')
                    // }}
                  />
                </Flex>
              </Box>
            )}
            {(isLoading || error) && (
              <Flex w='100%' align='center' justify='center'>
                <FetchCard
                  direction='column'
                  align='center'
                  justify='center'
                  mx='auto'
                  reload={() => {
                    !data && triggerReload()
                  }}
                  loading={isLoading}
                  error={error}
                  text='Standby as we load some of your details'
                />
              </Flex>
            )}
          </form>
        )}
      </Formik>
    </Box>
  )
}

ConfirmBankingDetails.propTypes = {}

export default ConfirmBankingDetails
