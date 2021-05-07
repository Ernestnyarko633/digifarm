import { Box, Flex, Icon, Text, Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import React from 'react'
import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons'

const menus = [
  { id: 1, name: 'Today’s tasks', icon: Calendar, state: 'compA' },
  { id: 2, name: 'Weather', icon: Weather, state: 'compB' },
  { id: 3, name: 'Crop health', icon: Crop, state: 'compC' },
  { id: 4, name: 'Scheduled events', icon: FarmSchedule, state: 'compD' },
  { id: 5, name: 'Manager updates', icon: Updates, state: 'compE' }
]

export default function FarmLeftSideBar({ state, setState }) {
  return (
    <Box
      as='aside'
      pos='fixed'
      bottom={0}
      left={0}
      h={{ lg: '80vh' }}
      w={{ md: '17%' }}
      bg='white'
      zIndex={50}
      pt={10}
      shadow='md'
      px={{ md: 8 }}
      color='gray.600'
    >
      <Box as='ul'>
        {menus.map(item => (
          <Flex
            my={{ md: 2 }}
            as={Button}
            w='100%'
            role='button'
            outline='none'
            outlineColor='none'
            bg='white'
            _hover={{ background: 'white' }}
            aria-label={`${item.name} button`}
            key={item.id}
            align='center'
            justify='flex-start'
            onClick={() => setState(item.state)}
            color={state === item.state ? 'cf.800' : ''}
          >
            <Icon as={item.icon} />
            <Text ml={2}>{item.name}</Text>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

FarmLeftSideBar.propTypes = {
  state: PropTypes.string,
  setState: PropTypes.func
}
