import React from 'react'
import PropTypes from 'prop-types'
import { FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

const CustomPhoneInput = ({
  value,
  error,
  touched,
  isRequired,
  isDisabled,
  setFieldValue,
  setFieldTouched
}) => {
  const isInvalid = error && touched

  const errorStyle = isInvalid
    ? {
        borderColor: '#E53E3E',
        boxShadow: '0 0 0 1px #e53e3e'
      }
    : {
        borderBottomColor: 'var(--chakra-colors-cf-800)'
      }

  return (
    <FormControl
      pos='relative'
      id='phoneNumber'
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
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
        Phone Number
      </FormLabel>
      <IntlTelInput
        format
        autocomplete='off'
        fieldName='phoneNumber'
        fieldId='phoneNumber'
        defaultCountry='gh'
        preferredCountries={['gh', 'us', 'gb', 'de', 'fr', 'cn', 'ng']}
        defaultValue={value}
        containerClassName='intl-tel-input'
        inputClassName='chakra-input'
        onPhoneNumberBlur={(status, value, countryData) => {
          setFieldTouched('phoneNumber', true)
          if (value.split('').includes('+')) {
            setFieldValue('phoneNumber', value)
          } else {
            const number = `+${countryData.dialCode}${value
              .replace(/^0+/, '')
              .replace(/\s/g, '')}`
            setFieldValue('phoneNumber', number)
          }
          const name = countryData.name.split(' (', 1).toString()
          name && setFieldValue('country', name)
        }}
        onPhoneNumberChange={(status, value, countryData) => {
          setFieldTouched('phoneNumber', true)
          if (value.split('').includes('+')) {
            setFieldValue('phoneNumber', value)
          } else {
            const number = `+${countryData.dialCode}${value
              .replace(/^0+/, '')
              .replace(/\s/g, '')}`
            setFieldValue('phoneNumber', number)
          }
          const name = countryData.name.split(' (', 1).toString()
          name && setFieldValue('country', name)
        }}
        style={{
          width: '100%',
          height: 'var(--chakra-sizes-14)',
          ...errorStyle
        }}
      />
      <FormErrorMessage mt='0.5' fontSize='tiny'>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomPhoneInput.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired
}

export default CustomPhoneInput
