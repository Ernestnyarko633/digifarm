import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  FormLabel,
  InputGroup,
  IconButton,
  FormControl,
  FormErrorMessage,
  InputRightElement
} from '@chakra-ui/react'
import { FiEyeOff, FiEye } from 'react-icons/fi'

const PasswordInput = ({
  id,
  error,
  touched,
  label,
  isDisabled,
  isRequired,
  ...rest
}) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(prev => !prev)

  const isInvalid = error && touched

  return (
    <FormControl
      pos='relative'
      id={id || rest.name}
      borderColor='gray.100'
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel
          pl={4}
          w='100%'
          py='0.5px'
          zIndex={1}
          fontSize='xs'
          pos='absolute'
          color='gray.600'
          bgColor='cf.300'
        >
          {label}
        </FormLabel>
      )}
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          h={14}
          pt={3}
          fontSize='sm'
          borderRadius={0}
          bgColor='white'
          borderWidth={1}
          _focus={{ outline: 'none' }}
          _hover={{ outline: 'none' }}
          borderBottomColor={isInvalid ? '' : 'cf.800'}
          type={show ? 'text' : 'password'}
          {...rest}
        />
        <InputRightElement h={14} width='3rem'>
          <IconButton
            bg='unset'
            size='sm'
            h='1.75rem'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent', outline: 'none' }}
            type='button'
            onClick={e => {
              e.preventDefault()
              handleClick()
            }}
            icon={show ? <FiEye size={15} /> : <FiEyeOff size={15} />}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage mt='0.5' fontSize='tiny'>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

PasswordInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool
}

export default PasswordInput
