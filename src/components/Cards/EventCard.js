import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'

const EventCard = ({ href, title, summary, image }) => {
  return (
    <Fade bottom>
      <Box
        rounded='xl'
        bgGradient='linear(to-l, #93CF88,#5AA250)'
        px={{ md: 3 }}
        py={{ md: 4 }}
        color='white'
      >
        <Flex align='center'>
          <Avatar
            size='xl'
            bgColor='white'
            boxSize={{ md: 12, xl: 20 }}
            src={image}
          />
          <Box ml={2}>
            <Heading as='h5' fontSize={{ md: 'md', xl: 'xl' }}>
              {title}
            </Heading>
            <Text fontSize='sm'>{summary}</Text>

            <Box mt={4}>
              <Button
                href={href}
                borderWidth={1}
                borderColor='white'
                px={{ md: 4 }}
                py={{ md: 1 }}
                fontSize='xs'
                bg='transparent'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                rounded='30px'
                onClick={() => window.open(href, '_blank')}
              >
                Check it out
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Fade>
  )
}

EventCard.propTypes = {
  href: PropTypes.any,
  title: PropTypes.any,
  summary: PropTypes.any,
  image: PropTypes.any
}
export default EventCard
