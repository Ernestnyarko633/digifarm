import React from 'react'
import { IconButton, Flex } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import PropTypes from 'prop-types'

const ArrowButton = ({ handleClick }) => (
  <Flex justify={{ md: 'flex-end' }} mx={{ md: 4 }} mb={{ base: 6, md: 0 }}>
    <IconButton
      rounded='100%'
      color='cf.green'
      variant='outline'
      borderWidth='2px'
      borderColor='cf.green'
      aria-label='Left Arrow'
      onClick={() => handleClick(-1)}
      icon={<MdKeyboardArrowLeft size={20} />}
      _hover={{ bg: 'cf.green', borderColor: 'cf.green', color: 'white' }}
      _active={{ bg: 'cf.green', borderColor: 'cf.green', color: 'white' }}
    />
    <IconButton
      ml={2}
      rounded='100%'
      color='cf.green'
      bg='transparent'
      variant='outline'
      borderWidth='2px'
      borderColor='cf.green'
      aria-label='Right Arrow'
      onClick={() => handleClick(+1)}
      icon={<MdKeyboardArrowRight size={20} />}
      _hover={{ bg: 'cf.green', borderColor: 'cf.green', color: 'white' }}
      _active={{ bg: 'cf.green', borderColor: 'cf.green', color: 'white' }}
    />
  </Flex>
)

ArrowButton.propTypes = {
  handleClick: PropTypes.func
}

export default ArrowButton
