import React from 'react'
import { Wallet } from 'theme/Icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import Icon from '@chakra-ui/icon'
import { Stat, StatNumber } from '@chakra-ui/stat'
import PropTypes from 'prop-types'

const ExpenditureCard = ({ amount, bg, action, color }) => {
  return (
    <Box bg='gray.50' rounded='lg' py={4} px={6}>
      <Flex align='center' justify='space-between' color={color}>
        <Text fontWeight='bold' color={color}>
          Total amount {action}
        </Text>
      </Flex>
      <Flex mt={4} align='center'>
        <Flex
          align='center'
          justify='center'
          w={16}
          h={16}
          bg={bg}
          rounded='100%'
        >
          <Icon as={Wallet} boxSize={10} />
        </Flex>
        <Stat ml={4}>
          <StatNumber
            fontWeight={800}
            fontSize='2xl'
            color={color}
            isTruncated={true}
            fontFamily='num'
          >
            {amount}
          </StatNumber>
          {/* <StatHelpText color={color} fontSize="1rem">Amount {action}</StatHelpText> */}
        </Stat>
      </Flex>
    </Box>
  )
}

ExpenditureCard.propTypes = {
  amount: PropTypes.number.isRequired,
  bg: PropTypes.string,
  action: PropTypes.string,
  date: PropTypes.string,
  color: PropTypes.string
}

export default ExpenditureCard
