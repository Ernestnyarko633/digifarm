import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

const EventCard = ({ href, title, summary, image }) => {
  return (
    <Box
      rounded='xl'
      bgGradient='linear(to-l, #93CF88,#5AA250)'
      px={3}
      py={4}
      color='white'
      maxH={{ md: 56 }}
    >
      <Flex>
        <Image
          w={{ base: 16, md: 20 }}
          h={{ base: 16, md: 20 }}
          rounded='100%'
          bgColor='white'
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
              px={4}
              py={1}
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
  )
}

EventCard.propTypes = {
  href: PropTypes.any,
  title: PropTypes.any,
  summary: PropTypes.any,
  image: PropTypes.any
}
export default EventCard
