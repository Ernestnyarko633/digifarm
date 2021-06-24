import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Box, Icon, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { FiCalendar, FiClock } from 'react-icons/fi'

const EventCard = ({ event, onOpen, setSelectedData }) => {
  return (
    <Box
      px={3}
      py={5}
      rounded='xl'
      cursor='pointer'
      color='white'
      onClick={() => {
        setSelectedData(event)
        onOpen()
      }}
      bgGradient='linear(to-l, #93CF88,#5AA250)'
    >
      <Flex>
        <Image
          w={{ base: 16, '4xl': 20 }}
          h={{ base: 16, '4xl': 20 }}
          rounded='md'
          bgColor='white'
          src={event.data?.body[0]?.primary?.media?.url}
        />
        <Box ml={2}>
          <Heading as='h5' fontSize={{ md: 'sm', xl: 'md', '5xl': 'lg' }}>
            {event.data.title[0]?.text}
          </Heading>
          <Text
            fontSize={{ base: 'xs', xl: 'sm' }}
            lineHeight={{ xl: 'shorter', '4xl': 'tall' }}
            noOfLines={{ xl: 2, '4xl': 3 }}
          >
            {event.data.summary[0]?.text}
          </Text>
        </Box>
      </Flex>

      <Flex
        mt={{ base: 2, xl: 4 }}
        justify='space-between'
        lineHeight={{ xl: 'shorter', '4xl': 'tall' }}
      >
        <Flex align='center'>
          <Icon as={FiCalendar} boxSize={{ base: 4, '4xl': 6 }} mr={1} />
          <Text as='span' fontWeight={700}>
            {moment(event.data.publishing_date).format('LL')}
          </Text>
        </Flex>
        <Flex align='center'>
          <Icon as={FiClock} boxSize={{ base: 4, '4xl': 6 }} mr={1} />
          <Text as='span' fontWeight={700}>
            {moment.utc(event.data.publishing_date).format('HH:mm')} GMT
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

EventCard.propTypes = {
  event: PropTypes.any,
  onOpen: PropTypes.func,
  setSelectedData: PropTypes.func
}
export default EventCard
