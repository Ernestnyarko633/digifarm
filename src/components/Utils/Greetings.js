import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { getCurrentDayParting } from 'helpers/misc'

import Illustration from 'assets/images/illustration.svg'

const Greetings = ({ title, text }) => {
  const { skyColor, textColor } = getCurrentDayParting()
  return (
    <Box pos='relative' bg={skyColor} textColor={textColor}>
      <Image
        w='100%'
        objectFit='cover'
        src={Illustration}
        h={{ base: 80, md: 90 }}
      />
      <Box
        pos='absolute'
        top={{ base: 20, md: 24 }}
        left={{ base: 6, md: 16 }}
        right={{ base: 6, md: 16 }}
      >
        <Heading
          as='h3'
          fontSize={{ base: '2xl', md: '4xl' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <Text dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
    </Box>
  )
}

Greetings.propTypes = {
  title: PropTypes.any,
  text: PropTypes.any
}

export default Greetings
