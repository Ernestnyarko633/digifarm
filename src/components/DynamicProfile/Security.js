import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Container,
  Grid,
  Switch,
  useToast
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { FormInput } from 'components/Form'
import useAuth from 'context/auth'
import { ChangePassword } from 'helpers/validation'

const Security = () => {
  const { changePassword } = useAuth()
  const toast = useToast()

  const onSubmit = async (values, { setSubmitting, setErrors, setStatus, resetForm }) => {
    try {
      const res = await changePassword(values)
      if (res.statusCode === 200) {
        toast({
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
      }
      resetForm({})
      setStatus({ success: true })
    } catch (error) {
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
    }
  }

  return (
    <Container maxW='4xl'>
      <Box p={10} rounded='md' bg='white'>
        <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
          Security
        </Heading>
        <Flex align='center'>
          <Text fontSize='md'>
            Set your login preferences, help us personalize your <br />
            experience and make big account changes here
          </Text>
          <Flex align='center' ml={10}>
            <Button rounded='30px' w={40} h={12} shadow='sm'>
              Cancel
            </Button>
            <Button
              colorScheme='linear'
              rounded='30px'
              w={40}
              h={12}
              shadow='sm'
              ml={4}
              type='submit'
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Divider orientation='horizontal' my={12} />

      <Box>
        <Box>
          <Text>Change your password</Text>
          <Text>Turn notification on to receive notification in your dashboard</Text>
        </Box>
        <Formik
          initialValues={{ oldPassword: '', newPassword: '' }}
          onSubmit={onSubmit}
          validationSchema={ChangePassword}
        >
          {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid gap={6} w={80} mt={12}>
                <FormInput
                  label='Old Password'
                  placeholder='At least 8 characters'
                  type='password'
                  name='oldPassword'
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bg='white'
                />
                <FormInput
                  label='New Password'
                  placeholder='At least 8 characters'
                  type='password'
                  name='newPassword'
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  bg='white'
                />

                <Button
                  rounded='30px'
                  mt={4}
                  w={40}
                  h={12}
                  shadow='sm'
                  bg='transparent'
                  color='gray.600'
                  borderWidth={1}
                  borderColor='gray.600'
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                  type='submit'
                  isLoading={isSubmitting}
                >
                  Save changes
                </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      <Divider orientation='horizontal' my={12} />
      <Flex justify='space-between'>
        <Box>
          <Text fontFamily='heading' fontSize={{ md: 'xl' }}>
            Two-step verification
          </Text>
          <Text>Turn on to receive notification via push notification</Text>
        </Box>

        <Box>
          <Switch colorScheme='cfButton' size='lg' />
        </Box>
      </Flex>
      <Divider orientation='horizontal' my={12} />
    </Container>
  )
}

export default Security
