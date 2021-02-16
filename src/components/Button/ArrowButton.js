import React from 'react'
import { IconButton, Flex } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import PropTypes from 'prop-types'

const ArrowButton = ({ handleClick }) => (
  <Flex justify='flex-end' mx={4}>
    <IconButton
      aria-label='Left Arrow'
      icon={<MdKeyboardArrowLeft />}
      rounded='100%'
      borderColor='cf.900'
      variant='outline'
      color='cf.900'
      _hover={{ bg: 'transparent' }}
      _active={{ bg: 'transparent' }}
      onClick={() => handleClick(-1)}
    />
    <IconButton
      aria-label='Right Arrow'
      icon={<MdKeyboardArrowRight />}
      ml={2}
      rounded='100%'
      colorScheme='linear'
      shadow='md'
      onClick={() => handleClick(+1)}
    />
  </Flex>
)

ArrowButton.propTypes = {
  handleClick: PropTypes.func
}

export default ArrowButton
