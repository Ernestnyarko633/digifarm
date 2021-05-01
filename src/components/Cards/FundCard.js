import React from 'react'
import { Flex, Text, Icon, Image, Box } from '@chakra-ui/react'
import { FaDollarSign } from 'react-icons/fa'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import PropTypes from 'prop-types'
import DollarSign from 'assets/images/doll.png'
const FundCard = ({ amount, label }) => {
  return (
    <Flex
      minW={{ base: '20%', xl: '80%', '2xl': '100%' }}
      minH={{ base: 'auto', xl: '12.5rem' }}
      rounded='lg'
      filter={{
        base: 'none',
        md: 'drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      }}
      align='center'
      p={{ base: 4, md: 6, '2xl': 10 }}
      bg='white'
    >
      <Flex direction='column' align={{ base: 'flex-start' }} w='100%'>
        <Box ml={3} mb={5}>
          <Image src={DollarSign} />
        </Box>
        <Flex direction='row' justify='space-between' align='center'>
          <Text
            lineHeight={{ base: '0.875rem', md: '1.125rem' }}
            fontSize={{ base: 'sm', '2xl': 'xl' }}
            fontWeight={400}
            ml={{ base: 2, md: 3 }}
            mt={1}
          >
            {label}
          </Text>
          <Icon ml={2} color='cf.400' as={BsFillInfoCircleFill} boxSize={4} />
        </Flex>
        <Flex align='center' pr={{ base: 4, md: 0 }} w='100%'>
          <Icon
            boxSize={{ base: 6, xl: 8 }}
            as={FaDollarSign}
            ml={{ base: 0, md: 1 }}
            pt={1}
          />
          <Text
            pt={1}
            fontSize={{ base: 'md', xl: 'xl', '2xl': '4xl' }}
            fontWeight={900}
            mt={1}
          >
            {amount}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

FundCard.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.any.isRequired
}

export default FundCard
