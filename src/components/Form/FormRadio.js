import React from 'react'
import PropTypes from 'prop-types'
import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton
} from '@chakra-ui/react'

const FormRadio = ({ state, onChange, icon, title, options, width }) => {
  const updateStateChange = item => {
    onChange(item)
  }

  const Type = ({ children, ...rest }) => (
    <Button
      colorScheme={state.includes(children) ? 'cfButton' : 'gray'}
      width={width || 16}
      rounded='md'
      onClick={() => updateStateChange(children)}
      {...rest}
    >
      {children}
    </Button>
  )

  Type.propTypes = {
    children: PropTypes.node.isRequired
  }

  return (
    <Box>
      {icon && (
        <Heading as='h6' size='sm' mb={2}>
          {title}
          <Popover>
            <PopoverTrigger>
              <Button
                bg='transparent'
                _active={{ bg: 'trannsparent' }}
                _hover={{ bg: 'trannsparent' }}
              >
                <Icon as={InfoIcon} color='cf.400' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>What is a farm cycle?</PopoverHeader>
              <PopoverBody>
                Are you sure you want to have that milkshake?
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Heading>
      )}
      <Stack isInline>
        {options.map(item => (
          <Type key={item}>{item}</Type>
        ))}
      </Stack>
    </Box>
  )
}

FormRadio.propTypes = {
  state: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  options: PropTypes.any,
  width: PropTypes.any,
  onChange: PropTypes.any
}

export default FormRadio
