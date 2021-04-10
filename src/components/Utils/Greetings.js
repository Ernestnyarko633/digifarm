import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { getCurrentDayParting } from 'helpers/misc'
import Fade from 'react-reveal/Fade'

import Illustration from 'assets/images/illustration.svg'

const Greetings = ({ title, text }) => {
  const { skyColor, textColor } = getCurrentDayParting()
  return (
    <Box pos='relative' bg={skyColor} textColor={textColor}>
      <Fade top>
        <Image
          w='100%'
          objectFit='cover'
          src={Illustration}
          h={{ base: 90, md: 115 }}
        />
      </Fade>
      <Box pos='absolute' top={{ base: 48, md: 55 }} left={{ base: 6, md: 16 }}>
        <Fade left>
          <Heading
            as='h3'
            fontSize={{ base: '2xl', md: '4xl' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Fade>
        <Fade left>
          <Text dangerouslySetInnerHTML={{ __html: text }} />
        </Fade>
      </Box>
    </Box>
  )
}

Greetings.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Greetings
