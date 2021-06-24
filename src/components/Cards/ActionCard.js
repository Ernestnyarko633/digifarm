import React from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'

const ActionCard = ({ title, text, btnText }) => {
  return (
    <Flex
      justify='space-between'
      rounded='30px'
      direction={{ base: 'column', md: 'row' }}
      borderWidth={1}
      borderColor='gray.200'
      py={6}
      px={{ base: 5, md: 10 }}
    >
      <Box>
        <Heading as='h6' size='md' fontFamily='display' mb={2}>
          {title}
        </Heading>
        <Text
          lineHeight='normal'
          fontSize='sm'
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Box>

      <Box mt={{ base: 6, md: 0 }}>
        <Button
          bg='transparent'
          borderWidth={1}
          borderColor='cf.green'
          color='cf.green'
          rounded='30px'
          fontSize='sm'
          px={8}
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          fontFamily='body'
        >
          {btnText}
        </Button>
      </Box>
    </Flex>
  )
}

ActionCard.propTypes = {
  title: PropTypes.any,
  text: PropTypes.any,
  btnText: PropTypes.any
}

export default ActionCard
