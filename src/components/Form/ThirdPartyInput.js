import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import FormInput from './Input'

const ThirdPartyInput = ({
  name,
  reference,
  handleChange,
  handleBlur,
  errors,
  touched,
  label,
  title
}) => {
  const getForm = title => {
    switch (title) {
      case 'KPIs':
        return (
          <FormInput
            type='text'
            id={`${name}kpis`}
            name={`${name}kpis`}
            placeholder={label}
            label={label}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors && errors.kpis}
            touched={touched && touched.kpis}
            inputType
            value={reference}
          />
        )
      case 'Inputs':
        return (
          <Flex align='center' justify='space-between'>
            <FormInput
              type='text'
              id={`${name}item`}
              name={`${name}item`}
              placeholder='Item'
              label='Item'
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors && errors.item}
              touched={touched && touched.item}
              inputType
              value={reference.item}
            />

            <Box ml={2}>
              <FormInput
                type='number'
                width='90px'
                id={`${name}quantity`}
                name={`${name}quantity`}
                placeholder='Quantity'
                label='Quantity'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors && errors.quantity}
                touched={touched && touched.quantity}
                inputType
                value={reference.quantity}
              />
            </Box>
          </Flex>
        )
      default:
        return null
    }
  }

  return <Box>{getForm(title)}</Box>
}

ThirdPartyInput.propTypes = {
  reference: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
  label: PropTypes.any,
  title: PropTypes.any,
  name: PropTypes.string.isRequired
}

export default ThirdPartyInput
