import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
const CustomSelect = ({
  id,
  label,
  error,
  valueKey,
  labelKey,
  touched,
  options,
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
      <Select
        h={14}
        pt={0}
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
      >
        {options?.map(e => (
          <option key={e[valueKey] || e} value={e[valueKey] || e}>
            {e[labelKey] || e}
          </option>
        ))}
      </Select>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}
CustomSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  labelKey: PropTypes.string,
  isRequired: PropTypes.bool,
  valueKey: PropTypes.string,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool
}
export default CustomSelect
