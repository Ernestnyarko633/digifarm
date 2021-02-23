import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function FarmUpdateCard({
  title,
  duration,
  subtitle,
  text,
  icon
}) {
  return (
    <Box
      w='100%'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={8}
      bg='white'
    >
      <Flex
        align='center'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        pb={3}
      >
        <Text fontWeight={900}>
          <Icon as={icon} mr={1} />
          {title}
        </Text>
        <Text color='gray.500' fontSize='sm'>
          {duration} h
        </Text>
      </Flex>

      <Box mt={4}>
        <Text fontWeight='bold'>{subtitle}</Text>
        <Text color='gray.600' lineHeight='tall' fontSize='sm' mt={1}>
          {text}
        </Text>
      </Box>

      <Box mt={3}>
        <Link color='cf.400'>
          Learn more <Icon as={ChevronRightIcon} />
        </Link>
      </Box>
    </Box>
  )
}

FarmUpdateCard.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.any,
  icon: PropTypes.any
}
