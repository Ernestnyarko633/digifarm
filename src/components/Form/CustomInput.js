import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

const CustomInput = ({
  id,
  error,
  label,
  touched,
  isRequired,
  isDisabled,
  ...rest
}) => {
  const isInvalid = error && touched

  return (
    <FormControl
      pos='relative'
      id={id || rest.name}
      borderColor='gray.100'
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel
          w='100%'
          py='0.5px'
          zIndex={1}
          fontSize='xs'
          pos='absolute'
          color='gray.600'
          bgColor='cf.300'
          pl={{ base: 2, md: 4 }}
        >
          {label}
        </FormLabel>
      )}
      <Input
        h={14}
        pt={3}
        fontSize='sm'
        borderRadius={0}
        _focus={{
          outline: 'none'
        }}
        _hover={{
          outline: 'none'
        }}
        bgColor='white'
        borderWidth={1}
        borderBottomColor={isInvalid ? '' : 'cf.green'}
        {...rest}
      />
      <FormErrorMessage mt='0.5' pos='absolute' fontSize='tiny'>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default CustomInput
