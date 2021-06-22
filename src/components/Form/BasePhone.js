import React from 'react'
import PropTypes from 'prop-types'

import { PhoneInput, COUNTRIES } from 'baseui/phone-input'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'

const BasePhone = ({
  setFieldValue,
  setFieldTouched,
  phoneNumber,
  country,
  value,
  error,
  touched,
  placeholder,
  isRequired,
  bg,
  width
}) => {
  const [state] = React.useState(COUNTRIES.GH)
  return (
    <FormControl
      pos='relative'
      pt={2}
      isRequired={isRequired}
      isInvalid={error && touched}
    >
      <Box
        bg={bg}
        borderWidth={1}
        borderColor='gray.100'
        borderBottomColor={error && touched ? 'red.500' : 'cf.green'}
        w={width}
      >
        <FormLabel
          fontSize='xs'
          pos='absolute'
          left={{ base: 2, md: 4 }}
          top={2}
          color='gray.600'
        >
          Phone number
        </FormLabel>
        <PhoneInput
          name={phoneNumber}
          country={state}
          placeholder={placeholder}
          onCountryChange={event => {
            setFieldValue(country, event.option)
            setFieldTouched(country, true)
          }}
          text={value}
          error={error}
          onTextChange={e => {
            setFieldValue(phoneNumber, e.currentTarget.value)
            setFieldTouched(phoneNumber, true)
          }}
          overrides={{
            Input: {
              props: {
                overrides: {
                  Root: {
                    style: {
                      ':focus': {
                        outline: 'none'
                      }
                    }
                  },
                  InputContainer: {
                    style: {
                      backgroundColor: '#fff',
                      paddingTop: '2px',
                      marginBottom: '0px',
                      outline: 'none',
                      ':focus': {
                        outline: 'none'
                      }
                    }
                  }
                }
              }
            }
          }}
        />
      </Box>
    </FormControl>
  )
}

BasePhone.propTypes = {
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  phoneNumber: PropTypes.any,
  value: PropTypes.any,
  country: PropTypes.any,
  countryList: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.any,
  placeholder: PropTypes.any,
  bg: PropTypes.string,
  isRequired: PropTypes.string,
  width: PropTypes.any
}

export default BasePhone
