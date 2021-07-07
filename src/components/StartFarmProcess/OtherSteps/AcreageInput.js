import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast
} from '@chakra-ui/react'

import { IoAddCircleSharp, IoRemoveCircleOutline } from 'react-icons/io5'
import useRollover from 'context/rollover'

const AcreageInput = ({
  totalAcres,
  value,
  setValue,
  rollover,
  currentAmount,
  deteminant
}) => {
  let toast = useToast()
  const { total } = useRollover()

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
              if (!rollover) {
                setValue(e.target?.value * 1)
              } else {
                if (e.target?.value * deteminant > total) {
                  toast({
                    title: 'Insufficient funds in selected wallet(s)',
                    description:
                      'Insufficient funds in selected wallet(s) to farm above this number of acres for selected crop',
                    status: 'error',
                    duration: 10000,
                    position: 'top-right'
                  })
                  e.preventDefault()
                } else {
                  setValue(e.target?.value * 1)
                }
              }
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
                if (!rollover) {
                  setValue(draft => draft + 1)
                } else {
                  if (currentAmount + deteminant > total) {
                    toast({
                      title: 'Insufficient funds in selected wallet(s)',
                      description:
                        'Insufficient funds in selected wallet(s) to farm above this number of acres for selected crop',
                      status: 'error',
                      duration: 10000,
                      position: 'top-right'
                    })
                    e.preventDefault()
                  } else {
                    setValue(draft => draft + 1)
                  }
                }
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
  cooperativeOps: PropTypes.object,
  rollover: PropTypes.bool,
  currentAmount: PropTypes.number,
  deteminant: PropTypes.number
}

export default AcreageInput
