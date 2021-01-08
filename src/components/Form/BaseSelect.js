import { Select } from 'baseui/select'
import React from 'react'
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
  width,
}) => {
  const isArrayOfObj = !!(valueKey && labelKey)
  const getValue = (_value) =>
    Object.keys(_value).map((key) => ({ 
      id: _value[key], 
      label: _value[key] 
    }))

  const getOptions = (options) => {
    if (isArrayOfObj) {
      return options
    }
    return Object.keys(options).map((key) => ({
      id   : options[key],
      label: options[key],
    }))
  }

  // const error = _get(errors, name);
  // const touch = _get(touched, name);
  const inputValue = getValue(value)

  const handleChange = (val) => {
    let item
    // setFieldTouched(fieldName, true);
    if (!multi) {
      item = val ? val.value.map((e) => e.label) : ''
    } else {
      item = val ? value.value.map((e) => e.label) : []
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
      <FormLabel pos='absolute'
        top={-1}
        left={3}
        fontSize='xs'
        color='gray.600'>
        {title}
      </FormLabel>
      <Select options={getOptions(options)}
        value={inputValue}
        multi={multi}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        overrides={{
          Root: {
            style: {
              marginTop  : '7px',
              borderColor: '#3c9130',
              fontSize   : '14px',
              width,
            },
          },
          ControlContainer: {
            style: {
              outline        : 'none',
              borderWidth    : '0px',
              backgroundColor: 'transparent',
            },
          },
          ClearIcon: {
            style: {
              color: '#3c9130',
            },
          },
          SelectArrow: {
            style: {
              color: '#3c9130',
            },
          },
          Tag: {
            style: {
              color          : '#fff',
              backgroundColor: '#3c9130',
            },
          },
        }} />
    </Box>
  )
}

export default BaseSelect
