import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import {
  farm,
  home,
  wallet,
  market,
  Guide,
  Resources,
  logout
} from 'theme/Icons'
import { MdChatBubbleOutline } from 'react-icons/md'
import { IoIosHelpCircle } from 'react-icons/io'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const menuLink = [
  { icon: home, path: '/dashboard', name: 'Home', size: 5 },
  { icon: farm, path: '/farms', name: 'Farm board', size: 4 },
  { icon: wallet, path: '/wallet', name: 'Farm Wallet', size: 4 },
  { icon: market, path: '/marketplace', name: 'Marketplace', size: 4 },
  { icon: MdChatBubbleOutline, path: '/market', name: 'Forum', size: 4 }
]

const links = [
  {
    title: 'Learning',
    parent: 'learning',
    submenu: [
      { icon: Guide, path: '/guide', name: 'How-To-Guide', size: 5 },
      { icon: Resources, path: '/resources', name: 'Resources', size: 5 },
      {
        icon: IoIosHelpCircle,
        path: '/support',
        name: 'Customer Support',
        size: 5
      }
    ]
  }
]

const Sidebar = ({ currentPath }) => {
  const [toggleMenus, setToggleMenus] = React.useState(true)

  return (
    <Box
      as='aside'
      gridArea='aside'
      pos='fixed'
      bottom={0}
      left={0}
      h={{ lg: '100vh' }}
      bg='white'
      zIndex={20}
      pt={40}
      boxShadow=' sm'
      px={{ md: 2 }}
      color='gray.600'
      pr={{ md: 5 }}
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
          <Flex key={item.title} as='li' direction='column'>
            <Flex
              align='center'
              as='button'
              role='button'
              aria-label='Menu Button'
              onClick={() => setToggleMenus(!toggleMenus)}
            >
              <Icon
                as={toggleMenus ? BsChevronUp : BsChevronDown}
                boxSize={4}
                mr={1}
              />
              <Text>{item.title}</Text>
            </Flex>
            {toggleMenus && (
              <Box as='ul' color='gray.600'>
                {item.submenu.map(element => (
                  <Link
                    key={element.name}
                    d='flex'
                    alignItems='center'
                    pr={{ md: 3 }}
                    pl={{ md: 4 }}
                    py={{ md: 2 }}
                    rounded='lg'
                    activeClassName='activeClasName'
                    as={NavLink}
                    to={element.path}
                    cursor='pointer'
                    className='active-link'
                    transition='background-color .2s ease-in'
                    _hover={{
                      textDecor: 'none',
                      color: 'gray.700',
                      bg: 'gray.50',
                      rounded: 'md'
                    }}
                    _activeLink={{
                      color: 'cf.400',
                      bg: 'cf.300'
                    }}
                  >
                    <Icon as={item.icon} boxSize={item.size} mr={1} />
                    <Text fontSize='sm' textAlign='center' mt={1}>
                      {item.name}
                    </Text>
                  </Link>
                ))}
              </Box>
            )}
            <Flex
              align='center'
              py={{ md: 2 }}
              rounded='lg'
              _hover={{
                textDecor: 'none',
                color: 'gray.700',
                bg: 'gray.50',
                rounded: 'md'
              }}
              pl={{ md: 4 }}
              pr={{ md: 3 }}
              color='gray.600'
              as='button'
              role='button'
              aria-label='Logout Button'
              transition='background-color .2s ease-in'
            >
              <Icon as={logout} boxSize={5} mr={2} />
              <Text fontSize='sm' textAlign='center' mt={1}>
                Logout
              </Text>
            </Flex>
          </Flex>
        ))}
      </Text>
    </Box>
  )
}

Sidebar.propTypes = {
  currentPath: PropTypes.string.isRequired
}

export default Sidebar
