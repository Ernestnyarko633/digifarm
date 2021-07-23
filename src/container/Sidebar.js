import React from 'react'
import { Box, Icon, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import * as ReactPixel from 'react-facebook-pixel'

import { farm, home, market, Guide, wallet } from 'theme/Icons'
import { FiPlay } from 'react-icons/fi'

const menuLink = [
  { icon: home, path: '/dashboard', name: 'Home', size: 5 },
  { icon: farm, path: '/farms', name: 'Farm board', size: 4 },
  {
    icon: wallet,
    path: '/wallet',
    name: 'Farm Wallet',
    size: 4
  },
  { icon: market, path: '/warehouses', name: 'Warehouse', size: 4 }
]

const Sidebar = () => {
  const handleClick = () => {
    if (!ReactPixel.fbq) return
    ReactPixel.fbq('StarFarm', {
      title: 'Start a farm',
      description: 'https://digitalfarmer.completefarmer.com/start-farm'
    })
  }

  const links = [
    { icon: Guide, path: '/guide', name: 'How-To-Guide', size: 5 },
    {
      icon: FiPlay,
      path: '/start-farm',
      name: 'Start-New-Farm',
      size: 5,
      click: handleClick
    }
    // {
    //   icon: IoIosHelpCircle,
    //   path: '/support',
    //   name: 'Customer Support',
    //   size: 5
    // }
  ]

  return (
    <Box
      pt={40}
      left={0}
      as='aside'
      pos='fixed'
      bg='white'
      zIndex={50}
      boxShadow=' sm'
      pl={{ md: 5 }}
      color='gray.600'
      bottom={{ lg: 0 }}
      h={{ lg: '100vh' }}
      w={{ md: '20%', xl: '13%', '2xl': '13%' }}
    >
      <Text as='ul'>
        {menuLink.map(item => (
          <Link
            key={item.name}
            d='flex'
            alignItems='center'
            flexDirection={{ base: 'column', xl: 'row' }}
            px={{ md: 4 }}
            py={{ md: 2 }}
            rounded='lg'
            activeClassName='activeClasName'
            as={NavLink}
            to={item.path}
            onClick={e => item.disabled && e.preventDefault()}
            cursor='pointer'
            className='active-link'
            transition='background-color .2s ease-in'
            _hover={{
              textDecor: 'none',
              color: 'gray.700',
              bg: 'gray.50',
              rounded: 'md'
            }}
            _activeLink={{ color: 'cf.green', bg: 'cf.300' }}
          >
            <Icon as={item.icon} boxSize={item.size} mr={2} />
            <Text fontSize='sm' textAlign='center' mt={1}>
              {item.name}
            </Text>
          </Link>
        ))}
      </Text>

      <Text as='ul' mt={{ md: 24 }}>
        {links.map(item => (
          <Link
            key={item.name}
            d='flex'
            alignItems='center'
            pl={{ md: 4 }}
            pr={{ md: 4 }}
            py={{ md: 2 }}
            rounded='lg'
            flexDirection={{ base: 'column', xl: 'row' }}
            activeClassName='activeClasName'
            as={NavLink}
            to={item.path}
            cursor='pointer'
            className='active-link'
            transition='background-color .2s ease-in'
            _hover={{
              textDecor: 'none',
              color: 'gray.700',
              bg: 'gray.50',
              rounded: 'md'
            }}
            _activeLink={{ color: 'cf.green', bg: 'cf.300' }}
          >
            <Icon as={item.icon} boxSize={item.size} mr={2} />
            <Text fontSize='sm' textAlign='center' mt={1} onClick={item.click}>
              {item.name}
            </Text>
          </Link>
        ))}
      </Text>
    </Box>
  )
}

export default Sidebar
