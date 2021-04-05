import React from 'react'
import { Avatar, Box, Flex, Icon, Image, Link, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiChevronUp, FiUser } from 'react-icons/fi'
import { BiCog, BiSupport, BiHistory } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { BsBell, BsStar, BsPlus } from 'react-icons/bs'
import { Link as ReachRouter } from 'react-router-dom'

import Logo from '../assets/images/logo.png'
import useAuth from 'context/auth'

const menuLinks = [
  { name: 'Profile', icon: FiUser, link: '/profile' },
  { name: 'History', icon: BiHistory, link: '/history' },
  { name: 'Settings', icon: BiCog, link: '/settings' },
  { name: 'Help Center', icon: BiSupport, link: '/help' }
]

const MotionBox = motion.custom(Box)

const Header = () => {
  const { isAuthenticated } = useAuth()

  const { user } = isAuthenticated()

  return (
    <Flex
      top={0}
      w='100%'
      bgColor='white'
      pos='fixed'
      as='header'
      zIndex={100}
      align='center'
      h={{ base: 12, md: 20 }}
      gridArea='header'
      justify='space-between'
      borderBottomWidth={1}
      borderBottomColor='gray.300'
      px={{ base: 4, md: 24 }}
    >
      <ReachRouter to='/dashboard'>
        <Link _hover={{ textDecor: 'none' }}>
          <Image src={Logo} w={{ base: 8, md: 12 }} />
        </Link>
      </ReachRouter>

      <Flex align='center'>
        <Flex align='center' mr={10}>
          <Box as='button' role='button' aria-label='Support'>
            <Icon as={BsPlus} boxSize={6} />
          </Box>
          <Box as='button' role='button' aria-label='Support' ml={6}>
            <Icon as={BsStar} boxSize={5} />
          </Box>
          <Box as='button' role='button' aria-label='Notification' ml={6}>
            <Icon as={BsBell} boxSize={5} />
          </Box>
        </Flex>

        <Menu as={Box} ml={2} userSelect='none'>
          {({ open }) => (
            <Box>
              <Menu.Button
                as={Box}
                _focus={{ outline: 'none' }}
                cursor='pointer'
              >
                <Flex align='center'>
                  <Avatar size='sm' src={user?.avatar} name={user?.firstName} />
                  <Text ml={2}>Hi {user?.firstName}</Text>
                  <Box>
                    <Icon
                      ml={2}
                      as={open ? FiChevronUp : FiChevronDown}
                      boxSize={6}
                    />
                  </Box>
                </Flex>
              </Menu.Button>
              <AnimatePresence>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 }
                    }}
                    exit={{ opacity: 0, y: 50 }}
                    pos='absolute'
                    bg='white'
                    w={56}
                    right={10}
                    rounded='sm'
                    mt={2}
                    color='gray.600'
                    _focus={{ outline: 'none' }}
                    borderWidth={1}
                    borderColor='gray.100'
                  >
                    <AnimatePresence>
                      {menuLinks.map((item, i) => (
                        <Menu.Item
                          key={item.name}
                          as={MotionBox}
                          custom={i}
                          variants={{
                            hidden: i => ({
                              y: -50 * i,
                              opacity: 0
                            }),
                            visible: i => ({
                              y: 0,
                              opacity: 1,
                              transition: {
                                delay: i * 0.025
                              }
                            }),
                            removed: {
                              y: 30 * i
                            }
                          }}
                          initial='hidden'
                          animate='visible'
                          exit='removed'
                        >
                          {({ active }) => (
                            <Link
                              py={2}
                              px={6}
                              _hover={{
                                textDecor: 'none'
                              }}
                              bg={active && 'cf.400'}
                              color={active && 'white'}
                              d='block'
                              href={item.link}
                            >
                              <Icon as={item.icon} boxSize={4} mr={2} />{' '}
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </AnimatePresence>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          py={2}
                          px={6}
                          _hover={{
                            textDecor: 'none'
                          }}
                          bg={active && 'cf.400'}
                          color={active && 'white'}
                          d='block'
                          href='/logout'
                        >
                          <Icon as={HiOutlineLogout} boxSize={4} mr={2} />{' '}
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                )}
              </AnimatePresence>
            </Box>
          )}
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header
