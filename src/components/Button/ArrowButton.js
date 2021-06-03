import React from 'react'
import { IconButton, Flex } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import PropTypes from 'prop-types'

const ArrowButton = ({ handleClick }) => (
  <Flex justify='flex-end' mx={{ md: 4 }}>
    <IconButton
      rounded='100%'
      color='cf.800'
      variant='outline'
      borderWidth='2px'
      borderColor='cf.800'
      aria-label='Left Arrow'
      onClick={() => handleClick(-1)}
      icon={<MdKeyboardArrowLeft size={20} />}
      _hover={{ bg: 'cf.800', borderColor: 'cf.800', color: 'white' }}
      _active={{ bg: 'cf.800', borderColor: 'cf.800', color: 'white' }}
    />
    <IconButton
      ml={2}
      rounded='100%'
      color='cf.800'
      bg='transparent'
      variant='outline'
      borderWidth='2px'
      borderColor='cf.800'
      aria-label='Right Arrow'
      onClick={() => handleClick(+1)}
      icon={<MdKeyboardArrowRight size={20} />}
      _hover={{ bg: 'cf.800', borderColor: 'cf.800', color: 'white' }}
      _active={{ bg: 'cf.800', borderColor: 'cf.800', color: 'white' }}
    />
  </Flex>
)

ArrowButton.propTypes = {
  handleClick: PropTypes.func
}

export default ArrowButton
