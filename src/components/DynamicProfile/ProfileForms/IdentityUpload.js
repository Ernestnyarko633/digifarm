import { Box, Button, Flex, FormControl, useToast } from '@chakra-ui/react'
import FileUpload from 'components/Form/FileUpload'
import useApi from 'context/api'
import useAuth from 'context/auth'
import { useFormik } from 'formik'
import React from 'react'

const IdentityUpload = () => {
  const [proofOfIdentity, setProofOfIdentity] = React.useState([])
  const { isAuthenticated, store } = useAuth()
  const { user } = isAuthenticated()
  const { patchUser } = useApi()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      proofOfIdentity: {}
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)

        let formData = new FormData()
        formData.append('proofOfIdentity', proofOfIdentity[0])

        const res = await patchUser(user?._id, formData)
        toast({
          title: 'User successfully updated.',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
        store({ user: res.data })
      } catch (error) {
        toast({
          title: 'Error occured',
          description: error.message,
          status: 'error',
          duration: 5000,
          position: 'top-right'
        })
        setSubmitting(false)
      }
    }
  })

  const { handleSubmit, isSubmitting, setFieldValue } = formik

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box>
          <FormControl borderColor='gray.100'>
            <FileUpload
              files={proofOfIdentity}
              setFiles={setProofOfIdentity}
              value={{ name: 'proofOfIdentity' }}
              setFieldValue={setFieldValue}
              instruct='Upload Proof of Identity here (jpg and pdf only)'
            />
          </FormControl>
        </Box>
        <Flex justify='flex-start' mt={6}>
          <Button
            w={40}
            h={12}
            ml={4}
            shadow='sm'
            type='submit'
            rounded='30px'
            colorScheme='linear'
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </form>
  )
}

export default IdentityUpload
