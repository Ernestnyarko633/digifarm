import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Icon, FormLabel, FormControl, Input } from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'

const Upload = props => {
  const { field, form, accept, label, multiple, name } = props

  const handleChange = e => {
    const files = e.currentTarget.files
    const data = multiple ? files : files[0]

    form.setFieldValue(field.name, data)
  }

  return (
    <Box>
      <Text fontSize={{ md: 'sm' }} fontWeight='bold' pl={1} pt={2}>
        {label}
      </Text>
      <Box mt={4}>
        <FormControl position='relative' borderWidth={1}>
          <FormLabel w='100%'
          d='flex'
          alignItems='center'
          justifyContent='center'
          flexDir='column'
          pt={3}
          px={4}
          cursor='pointer'
          borderBottomWidth={1}
          borderBottomColor='cf.400'
          mb={0}>
            <Flex align='center'
            justify='center'
            w={12}
            height={12}
            rounded='100%'
            bg='cf.400'
            mt={4}>
              <Icon as={VscAdd} color='white' size={6} />
            </Flex>
            <Text textAlign='center'
            fontSize={{ md: 'sm' }}
            color='gray.400'
            letterSpacing='normal'
            mt={2}
            pb={8}>
              Upload image here
            </Text>
            <Input type='file'
            id={name}
            name={name}
            accept={accept}
            onChange={handleChange}
            display='none' />
          </FormLabel>
        </FormControl>
      </Box>
    </Box>
  )
}

Upload.propTypes = {
  field   : PropTypes.object.isRequired,
  form    : PropTypes.object.isRequired,
  accept  : PropTypes.string.isRequired,
  label   : PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  name    : PropTypes.string
}

export default Upload