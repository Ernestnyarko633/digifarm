import React, { useState } from 'react'
import {
  Box,
  Flex,
  Image,
  Link,
  Grid,
  Heading,
  Text,
  Checkbox,
  useToast
} from '@chakra-ui/react'
import CustomPhoneInput from 'components/Form/CustomPhoneInput'
import PasswordInput from 'components/Form/CustomPasswordInput'
import { Button } from 'components'
import CustomInput from 'components/Form/CustomInput'
import { useFormik } from 'formik'
import { SignupSchema } from 'helpers/validation'
import invite from 'assets/images/invite.png'
import { useHistory } from 'react-router-dom'
import useAuth from 'context/auth'

import useApi from 'context/api'
import PropTypes from 'prop-types'

const CooperativeSignUp = () => {
  const history = useHistory()
  const [acceptConditionWithTerm, setAcceptConditionWithTerm] = useState(false)
  const [errorClass, setErrorClass] = useState(false)
  const { signUp, acceptInvite } = useApi()

  const toast = useToast()
  const { store } = useAuth()

  const decodedToken = sessionStorage.getItem('acceptToken')
  const _decode = JSON.parse(decodedToken)

  const { email, _id } = _decode

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isCoop: true,
      role: 'DIGITAL_FARMER',
      email: _decode.email,
      country: '',
      password: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      confirmPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (acceptConditionWithTerm) {
        try {
          const data = Object.assign({}, values)
          delete data.confirmPassword
          setSubmitting(true)
          await signUp(data)
          const res = await acceptInvite({ email, _id })
          setSubmitting(false)
          const { authToken, user } = res?.data
          store({ token: authToken, user })
          setTimeout(() => {
            return history.push({
              pathname: `/cooperative/${_id}`,
              state: { data: res.data }
            })
          }, 500)
        } catch (error) {
          if (error) {
            if (error.status === 400) {
              toast({
                title: 'Error Occurred',
                description: error.data.message,
                status: 'error',
                position: 'top-right',
                duration: 5000
              })
            } else {
              toast({
                title: 'Error Occurred',
                description: error.message,
                status: 'error',
                position: 'top-right',
                duration: 5000
              })
            }
          } else {
            toast({
              title: 'Error Occurred',
              description: 'Unexpected network error.',
              status: 'error',
              position: 'top-right',
              duration: 5000
            })
          }
        }
        setSubmitting(false)
      } else {
        setErrorClass(true)
        toast({
          title: 'Term & Condition Required!',
          description: 'You need to accept term and condition.',
          status: 'error',
          position: 'top-right',
          duration: 5000
        })
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
    <Box
      pos='absolute'
      mx={{ base: 'auto', '3xl': '12rem' }}
      top={{ base: 20, md: 40, '5xl': '20rem' }}
      right={0}
      mb={4}
    >
      <Box color='white' textAlign='center'>
        <Heading
          fontSize={{ base: 12, md: 24, lg: 24, '3xl': 32 }}
          w={{ md: '45%', xl: '45%' }}
          mx='auto'
        >
          Split cost. Share assets. Share rewards.
        </Heading>
        <Text
          fontSize={{ base: 10, md: 16, lg: 16, '3xl': 16 }}
          pt={{ base: 1, lg: 3 }}
          pb={{ base: 4, lg: 8 }}
        >
          Farm together with friends and family
        </Text>
      </Box>

      <Flex
        bg='white'
        borderRadius='12px'
        templateColumns='repeat(2,1fr)'
        mx={{ base: '30px', md: '9rem', '3xl': '4rem', '5xl': '10rem' }}
        shadow='md'
      >
        <Box
          ml='5rem'
          my={60}
          d={{ base: 'none', md: 'none', xl: 'block', '3xl': 'block' }}
        >
          <Image src={invite} />
        </Box>
        <Box
          my={{ base: 5, md: '3rem', '3xl': 16 }}
          mx={{ base: 5, md: '4rem', '3xl': '5rem' }}
          w={{ md: '22rem', lg: '30rem' }}
        >
          <Heading fontSize={{ base: 16, '3xl': 28 }}>
            Start by creating your account
          </Heading>
          <Text pt={1} mb={6} fontSize={{ base: 12 }}>
            You were invited by {_decode?.admin} to join {_decode?.coopName}{' '}
            cooperative.
          </Text>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns='repeat(2, 1fr)' gap={3}>
                <CustomInput
                  {...{
                    type: 'text',
                    isRequired: true,
                    name: 'firstName',
                    label: 'First Name',
                    onBlur: handleBlur,
                    placeholder: 'John',
                    value: values.firstName,
                    error: errors.firstName,
                    touched: touched.firstName,
                    onChange: handleChange
                  }}
                />
                <CustomInput
                  {...{
                    type: 'text',
                    isRequired: true,
                    name: 'lastName',
                    label: 'Last Name',
                    onBlur: handleBlur,
                    placeholder: 'Doe',
                    value: values.lastName,
                    error: errors.lastName,
                    touched: touched.lastName,
                    onChange: handleChange
                  }}
                />
              </Grid>
              <Box my={5}>
                <CustomInput
                  {...{
                    type: 'email',
                    isRequired: true,
                    name: 'email',
                    label: 'Email',
                    onBlur: handleBlur,
                    value: values.email,
                    error: errors.email,
                    touched: touched.email,
                    onChange: handleChange
                  }}
                  isReadOnly
                />
              </Box>
              <CustomPhoneInput
                isRequired
                error={errors.phoneNumber}
                value={values.phoneNumber}
                touched={touched.phoneNumber}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <Box my={5}>
                <PasswordInput
                  {...{
                    isRequired: true,
                    name: 'password',
                    label: 'Password',
                    onBlur: handleBlur,
                    value: values.password,
                    error: errors.password,
                    touched: touched.password,
                    onChange: handleChange,
                    placeholder: '********'
                  }}
                />
              </Box>

              <PasswordInput
                {...{
                  isRequired: true,
                  onBlur: handleBlur,
                  onChange: handleChange,
                  placeholder: '********',
                  name: 'confirmPassword',
                  label: 'Confirm Password',
                  value: values.confirmPassword,
                  error: errors.confirmPassword,
                  touched: touched.confirmPassword
                }}
              />
              <Flex my={{ base: 2, md: 4 }} fontSize='xs'>
                <Checkbox
                  colorScheme='cfButton'
                  onChange={e => {
                    setAcceptConditionWithTerm(e.target.checked)
                    setErrorClass(!e.target.checked)
                  }}
                  fontSize='xs'
                  size='sm'
                  borderColor={errorClass ? 'red.600' : 'cf.400'}
                />
                <Text ml={3} color='gray.500' fontSize='xs'>
                  I agree to Complete Farmer’s{' '}
                  <Text as='span' fontWeight='bold'>
                    <Link
                      color={errorClass ? 'red.600' : 'cfButton.500'}
                      as='a'
                      _hover={{ textDecor: 'none' }}
                      _focus={{ textDecor: 'none' }}
                      isExternal
                      href='https://www.completefarmer.com/terms-and-conditions'
                    >
                      Terms
                    </Link>{' '}
                    <Text as='span' fontWeight='normal' color='gray.500'>
                      and
                    </Text>{' '}
                    <Link
                      color={errorClass ? 'red.600' : 'cf.400'}
                      as='a'
                      _hover={{ textDecor: 'none' }}
                      _focus={{ textDecor: 'none' }}
                      isExternal
                      href='https://www.completefarmer.com/privacy-policy'
                    >
                      Privacy Policy
                    </Link>
                  </Text>
                  .
                </Text>
              </Flex>

              <Flex mb={{ base: 2, md: 4 }} fontSize='xs'>
                <Checkbox
                  colorScheme='cfButton'
                  onChange={e => {
                    // TODO: create an endpoint for this action and integrate it
                  }}
                  fontSize='xs'
                  size='sm'
                  borderColor='cfButton.500'
                />
                <Text ml={3} color='gray.500' fontSize='xs'>
                  I agree to receive Complete Farmer news and updates.
                </Text>
              </Flex>
              <Button
                btntitle='Sign up'
                type='submit'
                aria-label='SignUp'
                my={6}
                w='full'
                isLoading={isSubmitting}
              />
            </form>
            <Text color='gray.500' fontSize='xs'>
              For more information and understanding of how Complete Farmer
              works, you should check out
              <Link
                href='http://www.completefarmer.com'
                color='#31BC2E'
                _hover={{ textDecor: 'none' }}
                isExternal
              >
                {' '}
                Our website
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

CooperativeSignUp.propTypes = {
  state: PropTypes.object.isRequired
}

export default CooperativeSignUp
