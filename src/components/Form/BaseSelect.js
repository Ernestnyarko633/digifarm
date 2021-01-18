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
  const getValue = _value =>
    Object.keys(_value).map(key => ({
      id: _value[key],
      label: _value[key]
    }))

  const getOptions = _options => {
    if (isArrayOfObj) {
      return _options
    }
    return Object.keys(_options).map(key => ({
      id: _options[key],
      label: _options[key]
    }))
  }

  const inputValue = getValue(value)

  const handleChange = val => {
    let item
    if (!multi) {
      item = val ? val.value.map(e => e.label) : ''
    } else {
      item = val ? value.value.map(e => e.label) : []
    }
    setFieldValue(name, item)
  }

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
        onChange={e => handleChange(e)}
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
