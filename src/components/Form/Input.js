import React from 'react'
import PropTypes from 'prop-types'
import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Input } from 'baseui/input'

const FormInput = ({
  label,
  titleAddon,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  type,
  isRequired,
  error,
  touched,
  width,
  mr,
  bg = 'cf.300',
  ...rest
}) => (
  <FormControl
    mr={mr}
    pos='relative'
    pt={2}
    isRequired={isRequired}
    isInvalid={error && touched}
  >
    <Box
      bg={bg}
      border='2px solid #3c9130'
      borderBottomColor={error && touched ? 'red.500' : 'cf.400'}
      borderLeftWidth={0}
      borderRightWidth={0}
      borderTopWidth={0}
    >
      <FormLabel
        fontSize={{ md: 'sm' }}
        pos='absolute'
        left={{ md: 4 }}
        top={-1}
        color='gray.600'
      >
        {label} {titleAddon}
      </FormLabel>
      <Input
        {...rest}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        type={type}
        clearOnEscape
        overrides={{
          Root: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px',
              width: width || '100%',
              height: '50px'
            }
          },
          Input: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px',
              height: '50px'
            }
          },
          InputContainer: {
            style: {
              backgroundColor: 'transparent',
              borderWidth: '0px',
              width: width || '100%'
            }
          },
          StartEnhancer: {
            style: {
              backgroundColor: 'transparent'
            }
          }
        }}
      />
    </Box>
    {error && touched && (
      <FormErrorMessage fontSize='xs'>{error}</FormErrorMessage>
    )}
  </FormControl>
)

FormInput.propTypes = {
  inputType: PropTypes.any,
  inputClass: PropTypes.any,
  placeholder: PropTypes.any,
  label: PropTypes.any,
  width: PropTypes.any,
  my: PropTypes.any,
  mr: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  title: PropTypes.any,
  type: PropTypes.any,
  onChange: PropTypes.any,
  error: PropTypes.any,
  inputValue: PropTypes.any,
  disabled: PropTypes.any,
  onBlur: PropTypes.any,
  touched: PropTypes.any,
  className: PropTypes.any,
  titleAddon: PropTypes.any,
  fontSize: PropTypes.any,
  value: PropTypes.any,
  bg: PropTypes.any,
  selectedValue: PropTypes.any,
  passwordShow: PropTypes.any,
  isRequired: PropTypes.bool
}

export default FormInput
