import React from 'react'
import { Box, Text, Icon, Flex, Heading } from '@chakra-ui/react'
import { wallet } from 'theme/Icons'
import PropTypes from 'prop-types'
import { getFormattedMoney } from 'helpers/misc'

const WalletCard = ({ name, acreage, price }) => {
  return (
    <Box
      w={{ base: '100%', md: '100%' }}
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={6}
      mb={{ base: 16, md: 0 }}
      bg='white'
    >
      <Text fontWeight={300} textAlign='center'>
        {name}
      </Text>
      <Flex mt={2} align='center' justify='center' direction='column'>
        <Icon as={wallet} boxSize={10} />
        <Text mt='2px' fontWeight={300} textAlign='center'>
          Total
        </Text>
        <Heading fontSize={{ md: '3xl' }} fontWeight={900} mt={1}>
          {getFormattedMoney(price * acreage)}
        </Heading>
      </Flex>
    </Box>
  )
}

WalletCard.propTypes = {
  acreage: PropTypes.any,
  price: PropTypes.any,
  name: PropTypes.any
}

export default WalletCard
