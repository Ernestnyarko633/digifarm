import React from 'react'
import {
  useToast,
  Flex,
  Heading,
  Checkbox,
  Box,
  Icon,
  Text,
  Grid
} from '@chakra-ui/react'
import ModalWrapper from './ModalWrapper'
import useComponent from 'context/component'
import useAuth from 'context/auth'
import useApi from 'context/api'
import { Formik } from 'formik'
import { AiFillInfoCircle } from 'react-icons/ai'
import FormInput from 'components/Form/FormInput'
import Button from 'components/Button'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'

const PayoutModal = () => {
  const { isOpen, onClose } = useComponent()
  const { isAuthenticated } = useAuth()
  const { patchUser, getUserBankingDetails } = useApi()
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
    bankName: '',
    branchAddress: '',
    branchCountry: '',
    accountName: '',
    accountNumber: '',
    iban: '',
    sortCode: '',
    swiftCode: '',
    homeAddress: ''
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
    <ModalWrapper isCentered isOpen={isOpen} onClose={onClose} size='md'>
      <Formik
        enableReinitialize
        initialValues={
          data
            ? {
                bankName: data?.bankingDetails?.bankName,
                branchAddress: data?.bankingDetails?.branchAddress,
                branchCountry: data?.bankingDetails?.branchCountry,
                accountName: data?.bankingDetails?.accountName,
                accountNumber: data?.bankingDetails?.accountNumber,
                iban: data?.iban,
                sortCode: '',
                swiftCode: '',
                homeAddress: ''
              }
            : initialValues
        }
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
            {!isLoading && !error && (
              <Box w='100%'>
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
                      label='Branch Country'
                      name='branchCountry'
                      value={values.branchCountry}
                      h={{ md: 68 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isRequired
                      bg='gray.100'
                    />
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
    </ModalWrapper>
  )
}

export default PayoutModal
