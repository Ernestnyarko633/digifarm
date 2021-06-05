import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Text,
  Icon,
  FormLabel,
  FormControl,
  Input
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'

const Upload = props => {
  const { field, form, accept, label, multiple, ...rest } = props

  const handleChange = e => {
    const files = e.currentTarget.files
    const data = multiple ? files : files[0]

    form.setFieldValue(field.name, data)
  }

  return (
    <Box {...rest}>
      <Text fontSize={{ md: 'sm' }} fontWeight='bold' pl={1} pt={2}>
        {label}
      </Text>
      <Box mt={4}>
        <FormControl position='relative' borderWidth={1}>
          <FormLabel
            w='100%'
            d='flex'
            alignItems='center'
            justifyContent='center'
            flexDir='column'
            pt={3}
            px={4}
            cursor='pointer'
            borderBottomWidth={1}
            borderBottomColor='cf.800'
            mb={0}
          >
            <Flex
              align='center'
              justify='center'
              w={12}
              height={12}
              rounded='100%'
              bg='cf.800'
              mt={4}
            >
              <Icon as={VscAdd} color='white' size={6} />
            </Flex>
            <Text
              textAlign='center'
              fontSize={{ md: 'sm' }}
              color='gray.400'
              letterSpacing='normal'
              mt={2}
              pb={8}
            >
              Upload image here
            </Text>
            <Input
              type='file'
              h='100%'
              w='100%'
              opacity={0}
              pos='absolute'
              id={field.name}
              name={field.name}
              accept={accept}
              onChange={handleChange}
            />
          </FormLabel>
        </FormControl>
      </Box>
    </Box>
  )
}

Upload.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
  label: PropTypes.string,
  multiple: PropTypes.bool
}

export default Upload
