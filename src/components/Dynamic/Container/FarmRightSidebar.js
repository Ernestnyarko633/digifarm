import { Box } from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import DynamicCard from '../Sidebar'

export default function FarmRightSidebar({ state }) {
  return (
    <Box
      py={8}
      right={0}
      bg='white'
      as='rightsidebar'
      bottom={0}
      pos='fixed'
      px={{ md: 8 }}
      h={{ lg: '84vh' }}
      w={{ md: '30%' }}
      shadow='md'
      overflowY='scroll'
    >
      <DynamicCard card={state} />
    </Box>
  )
}

FarmRightSidebar.propTypes = {
  state: PropTypes.string
}
