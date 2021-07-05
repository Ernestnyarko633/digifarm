import React from 'react'
import { Box, Flex, useToast, Heading, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import useAuth from 'context/auth'
import Button from 'components/Button'
import useApi from 'context/api'
import CustomPasswordInput from 'components/Form/CustomPasswordInput'
import { ConfirmPassword as PasswordValidation } from 'helpers/validation'
import { default as usePayout } from 'context/rollover'
const ConfirmPassword = () => {
  const { isAuthenticated } = useAuth()

  const { user } = isAuthenticated()

  const { loginUser } = useApi()

  const { setBigStepper: setStep } = usePayout()

  let toast = useToast()
  const formik = useFormik({
    initialValues: {
      email: user?.email,
      password: ''
    },
    validationSchema: PasswordValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        let data = {
          email: values.email,
          password: values.password
        }

        const res = await loginUser(data)

        toast({
          title: 'Verification Successful',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        setStep(p => p + 1)
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

        // end
      } finally {
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
    <Box w='100%' p={15}>
      <Flex direction='column' w='100%'>
        <form onSubmit={handleSubmit}>
          <Flex direction='column' align='center' justify='center' w='100%'>
            <Box textAlign='center' w='100%'>
              <Heading as='h4' fontSize={{ base: 'xl', md: '3xl' }} mb={4}>
                Enter Password
              </Heading>

              <Text
                textAlign='center'
                my={4}
                color='gray.300'
                fontSize={{ base: 'sm', md: 'md' }}
              >
                Help us secure your this transaction by verifying your email and
                phone
              </Text>
            </Box>
            <Box w='100%' py={5}>
              <CustomPasswordInput
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
            <Flex
              w={{ base: '100%', md: 'auto' }}
              justify='center'
              align='center'
              mt={6}
            >
              <Button
                h={12}
                shadow='sm'
                type='submit'
                rounded='30px'
                btntitle='Done'
                ml={{ md: 4 }}
                colorScheme='linear'
                isLoading={isSubmitting}
                w={{ base: '100%', md: 40 }}
              />
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Box>
  )
}

export default ConfirmPassword
