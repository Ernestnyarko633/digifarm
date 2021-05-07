import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text
} from '@chakra-ui/react'
import { Input } from 'baseui/input'

const FormInput = ({
  titleAddon,
  isRequired,
  touched,
  label,
  error,
  width,
  mr,
  bg = 'cf.300',
  w,
  h,
  value,
  type,
  borderBottomColor,
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
      borderWidth={1}
      borderColor='gray.100'
      borderBottomColor={
        error && touched ? 'red.500' : borderBottomColor || 'cf.800'
      }
      w={w}
      h={h}
    >
      <FormLabel
        fontSize='xs'
        pos='absolute'
        left={{ base: 2, md: 4 }}
        top={2}
        color='gray.600'
      >
        {label} {titleAddon}
      </FormLabel>
      <Input
        {...rest}
        type={type || 'text'}
        value={value}
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
              height: '50px',
              marginTop: '8px',
              ':disabled': {
                background: '#f4f4f4'
              }
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
    {type === 'account' && isNaN(value) ? (
      <Text color='red.600' fontSize='xs'>
        Numbers only
      </Text>
    ) : null}
    {error && touched && (
      <FormErrorMessage fontSize='xs'>{error}</FormErrorMessage>
    )}
  </FormControl>
)

FormInput.propTypes = {
  inputType: PropTypes.any,
  inputClass: PropTypes.any,
  label: PropTypes.any,
  width: PropTypes.any,
  w: PropTypes.any,
  my: PropTypes.any,
  mr: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  title: PropTypes.any,
  type: PropTypes.any,
  error: PropTypes.any,
  inputValue: PropTypes.any,
  disabled: PropTypes.any,
  touched: PropTypes.any,
  className: PropTypes.any,
  titleAddon: PropTypes.any,
  fontSize: PropTypes.any,
  bg: PropTypes.any,
  selectedValue: PropTypes.any,
  passwordShow: PropTypes.any,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  borderBottomColor: PropTypes.any,
  h: PropTypes.any
}

export default FormInput
