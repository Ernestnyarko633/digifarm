/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  Avatar,
  Divider,
  useToast
} from '@chakra-ui/react'
import useAuth from 'context/auth'
import useApi from 'context/api'
import Headings from '../Headings'

const AvatarForm = () => {
  const [file, setFile] = React.useState(false)
  const [isSubmitting, setSubmitting] = React.useState(false)

  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { patchUser } = useApi()

  const toast = useToast()

  const onAvatarChange = async value => {
    try {
      setSubmitting(true)
      let formData = new FormData()
      console.log(value)
      formData.append('avatar', value)
      const res = await patchUser(user?._id, formData)
      toast({
        title: res.message,
        description: res.message,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      // window.location.reload()
    } catch (error) {
      toast({
        title: 'Error occured',
        description: 'Could not update, try again.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <Headings title='Profile' />
      <Divider
        orientation='vertical'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        my={12}
      />

      <Flex align='center'>
        <Avatar
          src={file ? URL.createObjectURL(file) : null || user?.avatar}
          size='2xl'
        />
        <Flex
          w={40}
          ml={6}
          as='label'
          cursor='pointer'
          rounded='30px'
          fontSize='sm'
          color='cf.400'
          align='center'
          borderWidth={1}
          pos='relative'
          py={{ base: 1 }}
          borderColor='cf.400'
          justifyContent='center'
          px={{ base: 3, md: 5 }}
        >
          <Input
            type='file'
            zIndex={1}
            opacity={0}
            name='file'
            accept='image/jpeg, image/png'
            onClick={e => (e.target.value = '')}
            onChange={async e => {
              setFile(e.currentTarget.files[0])
              await onAvatarChange(e.currentTarget.files[0])
            }}
          />

          <Text pos='absolute' fontSize={{ base: 'sm', md: 'md' }}>
            Change
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default AvatarForm
