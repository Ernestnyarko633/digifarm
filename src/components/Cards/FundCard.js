import React from 'react'
import { Flex, Text, Icon, Box } from '@chakra-ui/react'
import { BiDollarCircle } from 'react-icons/bi'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaDollarSign } from 'react-icons/fa'

import PropTypes from 'prop-types'

const FundCard = ({ amount, label }) => {
  return (
    <Flex
      w='100%'
      rounded='lg'
      justify='center'
      align='center'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={6}
      bg='white'
    >
      <Flex direction='column' align='center' mt={2} w='100%'>
        <Box>
          <Box mx={2}>
            <Icon boxSize={8} as={BiDollarCircle} />
          </Box>
          <Flex ml={2} mt={2}>
            <Text lineHeight='18px' fontSize={{ md: 'md' }} mt={1}>
              {label}
            </Text>
            <Icon
              boxSize={5}
              as={AiFillInfoCircle}
              color='cf.400'
              ml={1}
              pt={1}
            />
          </Flex>
          <Flex pr={8} mt={2}>
            <Icon boxSize={8} as={FaDollarSign} ml={1} pt={1} />
            <Text
              lineHeight='18px'
              pt={1}
              fontSize={{ md: '3xl' }}
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
  label: PropTypes.number.isRequired
}

export default FundCard
