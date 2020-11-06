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
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  chevronDown,
  chevronUp,
  cog,
  notification,
  support,
  user,
} from 'theme/Icons';
import Logo from '../assets/images/logo.png';

const MotionBox = motion.custom(Box);

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

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

          <Flex align='center'>
            <Text fontSize={{ md: 'md' }}>Dr. Kwasi</Text>
            <Avatar
              borderWidth={2}
              borderColor='cf.400'
              size='md'
              mx={3}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
              name='User'
            />
            <Box
              as='button'
              role='button'
              aria-label='Profile Menu'
              onClick={() => handleClick}
            >
              <Icon as={open ? chevronUp : chevronDown} boxSize={8} />
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <AnimatePresence>
        {open && (
          <MotionBox
            bg='white'
            w={48}
            h={64}
            boxShadow='md'
            pos='absolute'
            rounded='md'
            right={14}
            top={20}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.4 } }}
            exit={{ y: -100, opacity: 0 }}
          >
            <Box px={{ md: 6 }} color='gray.600' pt={6}>
              <Text fontWeight={500}>Dr Kwasi</Text>
            </Box>
            <Divider orientation='horizontal' my={2} />

            <Box w='100%' color='gray.600'>
              <Box my={2}>
                <Link
                  as={NavLink}
                  _hover={{
                    textDecor: 'none',
                    bg: 'gray.50',
                    color: 'gray.900',
                  }}
                  to='/profile'
                  px={6}
                  py={3}
                  w='100%'
                >
                  <Icon as={user} boxSize={6} />
                  <Text as='span'>Profile</Text>
                </Link>
              </Box>

              <Box my={2}>
                <Link
                  as={NavLink}
                  _hover={{
                    textDecor: 'none',
                    bg: 'gray.50',
                    color: 'gray.900',
                  }}
                  to='/settings'
                  px={6}
                  py={3}
                >
                  <Icon as={cog} boxSize={6} />
                  <Text as='span'>Settings</Text>
                </Link>
              </Box>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Header;
