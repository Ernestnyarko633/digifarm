import React from 'react'
import {IconButton,Flex} from '@chakra-ui/core'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const ArrowButton = () => {
    return (
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
            />
            <IconButton
              aria-label='Right Arrow'
              icon={<MdKeyboardArrowRight />}
              ml={2}
              rounded='100%'
              colorScheme='linear'
              shadow='md'
            />
          </Flex>
    )
}

export default ArrowButton