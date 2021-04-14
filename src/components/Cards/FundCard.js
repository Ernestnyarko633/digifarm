import React from 'react'
import { Flex, Text, Icon, Box } from '@chakra-ui/react'
import { BiDollarCircle } from 'react-icons/bi'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaDollarSign } from 'react-icons/fa'

import PropTypes from 'prop-types'

const FundCard = ({ amount, label }) => {
  return (
    <Flex
      w={{ base: 'auto', md: '100%' }}
      rounded='lg'
      justify='center'
      align='center'
      height={{ base: 'auto', md: '220px' }}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={{ base: 2, md: 6 }}
      bg='white'
    >
      <Flex direction='column' align='center' mt={2} w='100%'>
        <Box>
          <Box w='100%' display={{ base: 'flex', md: 'block' }} mx={2}>
            <Icon boxSize={{ base: 4, md: 8 }} as={BiDollarCircle} />
            <Icon
              ml={5}
              display={{ md: 'none' }}
              boxSize={{ base: 5 }}
              as={AiFillInfoCircle}
              color='cf.400'
            />
          </Box>

          <Flex ml={2} mt={2}>
            <Text
              lineHeight={{ base: '9px', md: '18px' }}
              fontSize={{ base: 'sm', md: 'md' }}
              mt={1}
            >
              {label}
            </Text>
            <Icon
              boxSize={{ base: 5 }}
              as={AiFillInfoCircle}
              color='cf.400'
              ml={1}
              pt={1}
              display={{ base: 'none', md: 'block' }}
            />
          </Flex>
          <Flex pr={{ base: 4, md: 8 }} mt={2}>
            <Icon
              boxSize={{ base: 4, md: 8 }}
              as={FaDollarSign}
              ml={1}
              pt={1}
            />
            <Text
              lineHeight={{ base: '9px', md: '18px' }}
              pt={1}
              fontSize={{ base: 'xl', md: '3xl' }}
              fontWeight={900}
              mt={1}
            >
              {amount}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

FundCard.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.any.isRequired
}

export default FundCard
