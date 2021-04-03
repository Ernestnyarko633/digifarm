import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { getCurrentDayParting } from 'helpers/misc'

import IllustrationImage from '../../assets/images/home/illustration.png'

const Greetings = ({ title, text }) => {
  const { skyColor, textColor } = getCurrentDayParting()
  return (
    <Box pos='relative' bg={skyColor} textColor={textColor}>
      <Image
        src={IllustrationImage}
        h={{ base: 90, md: 115 }}
        w='100%'
        objectFit='cover'
      />
      <Box pos='absolute' top={{ base: 48, md: 55 }} left={{ base: 6, md: 16 }}>
        <Heading
          as='h3'
          fontSize={{ md: '4xl' }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <Text dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
    </Box>
  )
}

Greetings.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Greetings
