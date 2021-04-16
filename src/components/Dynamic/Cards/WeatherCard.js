import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'

export default function WeatherCard({ icon, title, duration, value }) {
  return (
    <Fade left>
      <Box
        w='100%'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        mt={8}
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
          <Heading
            fontSize={{ md: '3xl' }}
            textAlign='center'
            fontWeight={900}
            mt={1}
          >
            {value?.toFixed(2)} C
          </Heading>
          {/* <Text fontSize='sm' color='gray.500' mt={2}>
            Weather is cloudy today. Looks like it might be raining on your farm
          </Text> */}
        </Box>
      </Box>
    </Fade>
  )
}

WeatherCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  duration: PropTypes.string,
  value: PropTypes.any
}
