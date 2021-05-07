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

import useStartFarm from 'context/start-farm'

const AcreageInput = ({ totalAcres }) => {
  const { acreage, setAcreage } = useStartFarm()

  return (
    <Box w={{ base: 48, md: 80 }}>
      <InputGroup>
        <Input
          h={{ base: 10, md: 16 }}
          type='number'
          roundedBottom='0px'
          value={acreage}
          borderBottomColor='cf.800'
          borderBottomWidth={2}
          _hover={{
            borderBottomColor: 'cf.800'
          }}
          _focus={{
            borderBottomColor: 'cf.800'
          }}
          placeholder='How many acres?'
          onChange={e => {
            if (e.target?.value >= 1 && e.target?.value < totalAcres) {
              setAcreage(e.target.value * 1)
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
              if (acreage > 1) {
                setAcreage(draft => draft - 1)
              }
            }}
          />
          <IconButton
            aria-label='Reduce acreage'
            fontSize='25px'
            bg='transparent'
            color='cf.800'
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
            onClick={() => {
              if (acreage < totalAcres) {
                setAcreage(draft => draft + 1)
              }
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

AcreageInput.propTypes = {
  totalAcres: PropTypes.number.isRequired
}

export default AcreageInput
