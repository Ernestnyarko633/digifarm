import { Box } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'
export default function FarmRightSidebar({ state }) {
  return (
    <Box
      py={8}
      right={{ md: 0 }}
      bg={{ md: 'white' }}
      as='rightsidebar'
      bottom={0}
      pos={{ md: 'fixed' }}
      h={{ lg: '84vh' }}
      w={{ md: '30%' }}
      my={{ base: 20, md: 0 }}
      shadow={{ md: 'md' }}
      overflowY='scroll'
    >
      <DynamicCard card={state} />
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string
}
