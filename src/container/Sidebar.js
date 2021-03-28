import React from 'react'
import { Box, Icon, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { farm, home, wallet, market, Guide } from 'theme/Icons'
import { MdChatBubbleOutline } from 'react-icons/md'
import { IoIosHelpCircle } from 'react-icons/io'

const menuLink = [
  { icon: home, path: '/dashboard', name: 'Home', size: 5 },
  { icon: farm, path: '/farms', name: 'Farm board', size: 4 },
  { icon: wallet, path: '/wallet', name: 'Farm Wallet', size: 4 },
  { icon: market, path: '/warehouses', name: 'Warehouse', size: 4 },
  { icon: MdChatBubbleOutline, path: '/market', name: 'Forum', size: 4 }
]

const links = [
  { icon: Guide, path: '/guide', name: 'How-To-Guide', size: 5 },
  {
    icon: IoIosHelpCircle,
    path: '/support',
    name: 'Customer Support',
    size: 5
  }
]

const Sidebar = () => {
  return (
    <Box
      as='aside'
      pos='fixed'
      bottom={0}
      left={0}
      h={{ lg: '100vh' }}
      bg='white'
      zIndex={50}
      pt={40}
      boxShadow=' sm'
      px={{ md: 2 }}
      color='gray.600'
      pr={{ md: 5 }}
      w={{ md: '15%' }}
    >
      <Text as='ul'>
        {menuLink.map(item => (
          <Link
            key={item.name}
            d='flex'
            alignItems='center'
            pl={{ md: 4 }}
            pr={{ md: 4 }}
            py={{ md: 2 }}
            rounded='lg'
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
            _activeLink={{ color: 'cf.400', bg: 'cf.300' }}
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
            _activeLink={{ color: 'cf.400', bg: 'cf.300' }}
          >
            <Icon as={item.icon} boxSize={item.size} mr={2} />
            <Text fontSize='sm' textAlign='center' mt={1}>
              {item.name}
            </Text>
          </Link>
        ))}
      </Text>
    </Box>
  )
}

export default Sidebar
