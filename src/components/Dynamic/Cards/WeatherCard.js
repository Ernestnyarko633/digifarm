import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import { Cloud } from 'theme/Icons'

export default function WeatherCard({ icon, title, duration }) {
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
          {duration}
        </Text>
      </Flex>

      <Box mt={2} w={{ md: 70 }}>
        <Icon as={Cloud} boxSize={10} />
        <Heading fontSize={{ md: '6xl' }} fontWeight={900} mt={1}>
          11C
        </Heading>
        <Text fontSize='sm' color='gray.500' mt={2}>
          Weather is cloudy today. Looks like it might be raining on your farm
        </Text>
      </Box>
    </Box>
  )
}

WeatherCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  duration: PropTypes.string
}
