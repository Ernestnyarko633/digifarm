import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'baseui/select'
import { Box, FormLabel } from '@chakra-ui/react'

const BaseSelect = ({
  options,
  setFieldTouched,
  setFieldValue,
  multi,
  value,
  name,
  id,
  valueKey,
  labelKey,
  errors,
  touched,
  placeholder,
  title,
  width
}) => {
  const isArrayOfObj = !!(valueKey && labelKey)
  const getValue = value =>
    Object.keys(value).map(key => ({ id: value[key], label: value[key] }))

  const getOptions = options => {
    if (isArrayOfObj) {
      return options
    }
    return Object.keys(options).map(key => ({
      id: options[key],
      label: options[key]
    }))
  }

  // const error = _get(errors, name);
  // const touch = _get(touched, name);
  const inputValue = getValue(value)

  const handleChange = value => {
    let item
    // setFieldTouched(fieldName, true);
    if (!multi) {
      item = value ? value.value.map(e => e.label) : ''
    } else {
      item = value ? value.value.map(e => e.label) : []
    }
    setFieldValue(name, item)
  }

  // const handleBlur = () => {
  //   if (value) {
  //     setFieldValue(name, value);
  //   }
  //   setFieldTouched(name, true);
  // };

  return (
    <Box bg='cf.100' pos='relative' borderBottom='2px solid #3c9130'>
      <FormLabel
        pos='absolute'
        top={-1}
        left={3}
        fontSize='xs'
        color='gray.600'
      >
        {title}
      </FormLabel>
      <Select
        options={getOptions(options)}
        value={inputValue}
        multi={multi}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={value => handleChange(value)}
        overrides={{
          Root: {
            style: {
              marginTop: '7px',
              borderColor: '#3c9130',
              fontSize: '14px',
              width
            }
          },
          ControlContainer: {
            style: {
              outline: 'none',
              borderWidth: '0px',
              backgroundColor: 'transparent'
            }
          },
          ClearIcon: {
            style: {
              color: '#3c9130'
            }
          },
          SelectArrow: {
            style: {
              color: '#3c9130'
            }
          },
          Tag: {
            style: {
              color: '#fff',
              backgroundColor: '#3c9130'
            }
          }
        }}
      />
    </Box>
  )
}

BaseSelect.propTypes = {
  options: PropTypes.any,
  setFieldTouched: PropTypes.any,
  setFieldValue: PropTypes.any,
  multi: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.any,
  id: PropTypes.any,
  valueKey: PropTypes.any,
  labelKey: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any,
  placeholder: PropTypes.any,
  title: PropTypes.any,
  width: PropTypes.any
}

export default BaseSelect
