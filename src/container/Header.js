import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/core';
import { Button } from 'components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { notification, support } from 'theme/Icons';
import { Menu } from '@headlessui/react';
import { FiChevronDown, FiChevronUp, FiUser } from 'react-icons/fi';
import { BiCog, BiSupport, BiHistory } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';

const menuLinks = [
  { name: 'Profile', icon: FiUser, link: '/profile' },
  { name: 'History', icon: BiHistory, link: '/history' },
  { name: 'Settings', icon: BiCog, link: '/settings' },
  { name: 'Help Center', icon: BiSupport, link: '/help' },
  { name: 'Log out', icon: HiOutlineLogout },
];

import Logo from '../assets/images/logo.png';

const MotionBox = motion.custom(Box);

const Header = () => {
  return (
    <Box>
      <Flex
        as='header'
        gridArea='header'
        align='center'
        justify='space-between'
        w='100%'
        h={{ md: 20 }}
        bg='white'
        pos='fixed'
        top={0}
        zIndex={50}
        borderBottomWidth={1}
        borderBottomColor='gray.300'
        px={{ md: 24 }}
      >
        <Box></Box>
        <Box>
          <Link
            as={NavLink}
            _hover={{ textDecor: 'none' }}
            to='/'
            _focus={{ outline: 'none' }}
          >
            <Button
              label='Dashboard'
              width='230px'
              bgColor='rgba(60, 145, 48, 0.18)'
              color='#3c9130'
            />
          </Link>
        </Box>
        <Box>
          <Image src={Logo} w={{ md: 12 }} />
        </Box>

        <Flex align='center'>
          <Box mr={20}>
            <Button label='Start a farm' width='180px' />
          </Box>

          <Flex align='center' mr={10} color='cf.400'>
            <Box as='button' role='button' aria-label='Support'>
              <Icon as={support} boxSize={6} />
            </Box>
            <Box as='button' role='button' aria-label='Notification' ml={4}>
              <Icon as={notification} boxSize={6} />
            </Box>
          </Flex>

          <Menu as={Box} ml={2}>
            {({ open }) => (
              <Box>
                <Menu.Button
                  as={Box}
                  _focus={{ outline: 'none' }}
                  cursor='pointer'
                >
                  <Flex align='center'>
                    <Text mr={2}>Hi Kwasi</Text>
                    <Avatar
                      size='sm'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
                      name='User'
                    />
                    <Box>
                      <Icon
                        ml={2}
                        as={open ? FiChevronUp : FiChevronDown}
                        boxSize={6}
                      />
                    </Box>
                  </Flex>
                </Menu.Button>
                {open && (
                  <Menu.Items
                    static
                    as={MotionBox}
                    initial={{ opacity: 0, height: 0 }}
                    initial={{
                      opacity: 1,
                      height: 'auto',
                      transition: { duration: 0.6 },
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    pos='absolute'
                    bg='white'
                    w={48}
                    right={10}
                    rounded='sm'
                    mt={2}
                    color='gray.600'
                  >
                    {menuLinks.map((item, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <Link
                            py={2}
                            px={6}
                            _hover={{ textDecor: 'none' }}
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
                  </Menu.Items>
                )}
              </Box>
            )}
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
