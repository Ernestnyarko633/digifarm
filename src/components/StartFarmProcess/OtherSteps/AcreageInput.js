import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'

import { IoAddCircleSharp, IoRemoveCircleOutline } from 'react-icons/io5'

const AcreageInput = ({ totalAcres, value, setValue }) => {
  return (
    <Box w={{ base: 48, md: 80 }}>
      <InputGroup>
        <Input
          h={{ base: 10, md: 16 }}
          type='number'
          roundedBottom='0px'
          value={value}
          borderBottomColor='cf.green'
          borderBottomWidth={2}
          _hover={{
            borderBottomColor: 'cf.green'
          }}
          _focus={{
            borderBottomColor: 'cf.green'
          }}
          placeholder='How many acres?'
          onChange={e => {
            if (e.target?.value >= 1 && e.target?.value < totalAcres) {
              setValue(e.target?.value * 1)
            }
          }}
        />
        <InputRightElement h={{ md: 16 }} mr={{ base: 4, md: 8 }}>
          <IconButton
            aria-label='Reduce acreage'
            fontSize='25px'
            bg='transparent'
            _hover={{
              bg: 'transparent'
            }}
            _focus={{
              bg: 'transparent'
            }}
            _active={{
              bg: 'transparent'
            }}
            icon={<IoRemoveCircleOutline />}
            onClick={() => {
              if (value > 1) {
                setValue(draft => draft - 1)
              }
            }}
          />
          <IconButton
            aria-label='Reduce acreage'
            fontSize='25px'
            bg='transparent'
            color='cf.green'
            _hover={{
              bg: 'transparent'
            }}
            _focus={{
              bg: 'transparent'
            }}
            _active={{
              bg: 'transparent'
            }}
            icon={<IoAddCircleSharp />}
            onClick={e => {
              if (value < totalAcres) {
                setValue(draft => draft + 1)
              }
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

AcreageInput.propTypes = {
  totalAcres: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  cooperativeOps: PropTypes.object
}

export default AcreageInput
