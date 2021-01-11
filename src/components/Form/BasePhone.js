import React from 'react'
import PropTypes from 'prop-types'

import { PhoneInput, COUNTRIES } from 'baseui/phone-input'
import { FormControl, FormLabel } from '@chakra-ui/react'

const BasePhone = ({
  setFieldValue,
  setFieldTouched,
  phoneNumber,
  country,
  countryList,
  value,
  error,
  touched,
  placeholder
}) => (
  <FormControl
    bg='cf.300'
    pos='relative'
    pt={2}
    borderBottomWidth={1}
    borderBottomColor='cf.400'
  >
    <FormLabel fontSize='xs' pos='absolute' left={3} top={-1} color='gray.600'>
      Phone number
    </FormLabel>
    <PhoneInput
      name={phoneNumber}
      country={countryList || COUNTRIES.GH}
      placeholder={placeholder}
      onCountryChange={({ option }) => {
        setFieldValue(country, option)
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
                  backgroundColor: 'transparent'
                }
              }
            }
          }
        }
      }}
    />
  </FormControl>
)

BasePhone.propTypes = {
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  phoneNumber: PropTypes.any,
  value: PropTypes.any,
  country: PropTypes.any,
  countryList: PropTypes.any,
  error: PropTypes.any,
  touched: PropTypes.any,
  placeholder: PropTypes.any
}

export default BasePhone
