import React from 'react'
import { Avatar, Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiChevronUp, FiUser } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineLogout } from 'react-icons/hi'
import PropTypes from 'prop-types'

const MotionBox = motion(Box)

const menuLinks = [
  { name: 'Profile', icon: FiUser, link: '/profile' },
  // { name: 'History', icon: BiHistory, link: '/history' },
  // { name: 'Settings', icon: BiCog, link: '/settings' },
  // { name: 'Help Center', icon: BiSupport, link: '/help' }
  { name: 'Logout', icon: HiOutlineLogout, link: '/logout' }
]

const Profile = ({ user }) => {
  return (
    <Menu as={Box} ml={2} userSelect='none'>
      {({ open }) => (
        <>
          <Menu.Button as={Box} _focus={{ outline: 'none' }} cursor='pointer'>
            <Flex align='center' justify='center'>
              <Avatar
                size='sm'
                src={user?.avatar}
                name={user?.firstName}
                ml={{ base: 4, md: 0 }}
              />
              <Text d={{ base: 'none', md: 'block' }} ml={2}>
                Hi {user?.firstName}
              </Text>
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
                pos={{ base: 'fixed', md: 'absolute' }}
                w={56}
                mt={3}
                bg='white'
                rounded='sm'
                borderWidth={1}
                color='gray.600'
                right={{ base: 5, md: 20 }}
                _focus={{ outline: 'none' }}
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
                          bg={active && 'cf.800'}
                          color={active && 'white'}
                          d='block'
                          href={item.link}
                        >
                          <Icon as={item.icon} boxSize={4} mr={2} /> {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </AnimatePresence>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  )
}

Profile.propTypes = {
  user: PropTypes.any
}
export default Profile
