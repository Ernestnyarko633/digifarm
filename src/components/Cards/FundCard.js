import React from 'react'
import { Flex, Text, Icon, Heading, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Funds } from 'theme/Icons'

const FundCard = ({ amount, label, bg, description }) => {
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
      p={{ base: 4 }}
      bg='white'
    >
      <Flex direction='column' align={{ base: 'flex-start' }} w='100%'>
        <Flex w='100%' direction='row' justify='flex-start' align='center'>
          <Flex
            align='center'
            justify='center'
            h={8}
            w={8}
            bg={bg}
            rounded='100%'
            mr={{ base: 2, md: 4 }}
          >
            <Icon as={Funds} boxSize={4} />
          </Flex>
          <Heading color={bg} as='h6' fontSize={{ base: 'xs', '3xl': 'md' }}>
            {label}
          </Heading>
        </Flex>
        <Box my={4}>
          <Text color='gray.600' fontSize={{ base: 'xs' }}>
            {description}
          </Text>
        </Box>

        <Box
          w='100%'
          display='flex'
          alignItems='center'
          flexDirection='row'
          p={5}
          bg='#f7f7f7'
          rounded={12}
          mt={5}
        >
          <Heading as='h3' fontSize={{ base: 'xs', md: 'md', '3xl': '2xl' }}>
            $ {amount}
          </Heading>
        </Box>
      </Flex>
    </Flex>
  )
}

FundCard.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.any.isRequired,
  bg: PropTypes.any,
  description: PropTypes.any
}

export default FundCard
