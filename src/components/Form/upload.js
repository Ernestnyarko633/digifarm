import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Icon, FormLabel, FormControl, Input } from '@chakra-ui/core'

const Upload = props => {
  const { field, form, accept, label, multiple, name } = props

  const handleChange = e => {
    const files = e.currentTarget.files
    const data = multiple ? files : files[0]

    form.setFieldValue(field.name, data)
  }

  return (
    <Box mt={6}>
      <FormControl position='relative' bg='cf.200'>
        <FormLabel mb={1} fontSize={{ md: 'sm' }} position='absolute' pl={4} pt={2}>
          {label}
        </FormLabel>
        <FormLabel
          w='100%'
          d='flex'
          alignItems='center'
          justifyContent='center'
          flexDir='column'
          py={3}
          px={4}
          rounded='md'
          cursor='pointer'
          borderBottomWidth={4}
          borderBottomColor='cf.400'
        >
          <Flex
            align='center'
            justify='center'
            w={12}
            height={12}
            rounded='100%'
            bg='cf.400'
            mt={4}
          >
            <Icon name='add' color='white' size={6} />
          </Flex>
          <Text
            textAlign='center'
            fontSize={{ md: 'sm' }}
            color='gray.400'
            letterSpacing='normal'
            mt={2}
          >
            Click to upload here or <br />
            drag image here to upload
          </Text>
          <Input
            type='file'
            id={name}
            name={name}
            accept={accept}
            onChange={handleChange}
            display='none'
          />
        </FormLabel>
      </FormControl>
    </Box>
  )
}

Upload.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  name: PropTypes.string
}

export default Upload