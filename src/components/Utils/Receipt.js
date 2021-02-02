import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'

import Button from 'components/Button'
import FarmInfo from 'components/Cards/FarmInfo'

const Receipt = ({ title, description, buttonTitle, label, text }) => {
  return (
    <Box>
      <Divider orientation='horizontal' my={3} />
      <Heading as='h3' fontSize={{ md: '3xl' }}>
        {title}
      </Heading>
      <Box mb={8}>
        <Text fontWeight='bold'>{description}</Text>
        <Divider orientation='horizontal' my={3} />
        <Text fontSize='xs'>{label}</Text>
      </Box>
      <FarmInfo width='100%' margin={0} />

      <Flex align='center' justify='space-between' my={8}>
        <Text fontSize='xs'>{text}</Text>
        <Button
          btntitle='Contact support'
          fontSize='xs'
          borderWidth={1}
          borderColor='cf.400'
          color='cf.400'
          rounded='30px'
          bg='white'
          h={6}
          w={32}
          _hover={{ bg: 'white' }}
          _active={{ bg: 'white' }}
          shadow='none'
        />
      </Flex>

      <Box w={56} mx='auto' my={6}>
        <Button
          btntitle={buttonTitle}
          width='100%'
          h={12}
          mx='auto'
          fontSize='md'
          rounded='30px'
        />
      </Box>
    </Box>
  )
}
Receipt.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired
}

export default Receipt
