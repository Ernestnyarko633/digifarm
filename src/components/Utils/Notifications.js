import React from 'react'
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { Menu } from '@headlessui/react'
import { BsBell } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from 'react-loader-spinner'
import { Link as ReachRouter } from 'react-router-dom'
import moment from 'moment'
import { ANNOUNCEMENT, NEWS, WEEKLYVIDEOS } from 'theme/Icons'
import PropTypes from 'prop-types'

const MotionBox = motion(Box)

const Notifications = ({ notifications, loading, updateNotification }) => {
  const renderNotificationIcons = value => {
    switch (value) {
      case 'news':
        return <Icon as={NEWS} boxSize={4} />
      case 'announcements':
        return <Icon as={ANNOUNCEMENT} boxSize={4} />
      case 'weekly_videos':
        return <Icon as={WEEKLYVIDEOS} boxSize={4} />
      default:
        return null
    }
  }

  const toFarmBoard = (value, item) => {
    switch (value) {
      case 'news':
        return `/farms?type=${item?.message?.type}&id=${item?.messageId}&title=${item?.message?.title}`
      case 'weekly_videos':
        return `/farms?type=videos&id=${item?.messageId}&title=${item?.message?.title}`
      case 'announcements':
        return ''
      default:
        return `/farms?type=${value}&title=${item?.message?.title}&id=${item?.messageId}`
    }
  }

  return (
    <Menu as={Box} ml={2} userSelect='none'>
      {({ open }) => (
        <>
          <Menu.Button
            as={Box}
            _focus={{ outline: 'none' }}
            cursor='pointer'
            mr={{ md: 4 }}
            pos='relative'
          >
            <Flex
              pos='absolute'
              top={-1}
              right={-1}
              align='center'
              justify='center'
              fontSize='sm'
              w={4}
              h={4}
              rounded='100%'
              bg='red.500'
              color='white'
            >
              {notifications.length}
            </Flex>
            <Icon as={BsBell} boxSize={5} />
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                as={MotionBox}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 }
                }}
                exit={{ opacity: 0, y: 50 }}
                pos={{ base: 'fixed', md: 'absolute' }}
                w={{ base: 82, md: 85 }}
                maxH={90}
                overflowY='scroll'
                mt={3}
                bg='white'
                rounded='md'
                borderWidth={1}
                color='gray.600'
                right={{ base: 5, md: 40 }}
                _focus={{ outline: 'none' }}
                borderColor='gray.100'
                filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
                fontSize='sm'
                lineHeight='shorter'
              >
                <Flex
                  h={10}
                  align='center'
                  px={6}
                  borderBottomWidth={1}
                  fontWeight={800}
                  pos='fixed'
                  top={0}
                  w='100%'
                >
                  <Icon as={BsBell} boxSize={4} mr={2} />
                  Notifications
                </Flex>
                <Box mt={10}>
                  <AnimatePresence>
                    {loading ? (
                      <Flex align='center' justify='center' py={10}>
                        <Loader
                          type='Rings'
                          color='#5AA250'
                          height={50}
                          width={50}
                        />
                      </Flex>
                    ) : (
                      notifications.map((item, i) => (
                        <Menu.Item key={item?._id} as={MotionBox}>
                          {({ active }) => {
                            return (
                              item?.status === 'NEW' &&
                              item?.message?.entity === 'GENERIC' && (
                                <Link
                                  py={2}
                                  px={6}
                                  as={ReachRouter}
                                  _hover={{
                                    textDecor: 'none'
                                  }}
                                  bg={active && 'cf.200'}
                                  color={active && 'gray.600'}
                                  d='flex'
                                  justifyContent='space-between'
                                  onClick={() => updateNotification(item._id)}
                                  to={toFarmBoard(item?.message?.type, item)}
                                  borderBottomWidth={1}
                                  borderBottomColor='gray.100'
                                >
                                  <Box w='2%' mr={8}>
                                    {item?.message?.entity === 'GENERIC' && (
                                      <Flex
                                        align='center'
                                        justify='center'
                                        w={8}
                                        h={8}
                                        rounded='100%'
                                        as='span'
                                        bg='cf.200'
                                      >
                                        {renderNotificationIcons(
                                          item?.message?.type
                                        )}
                                      </Flex>
                                    )}
                                  </Box>
                                  <Box w='95%'>
                                    <Text>
                                      {item?.message?.entity === 'GENERIC' &&
                                        item?.message?.title}
                                    </Text>
                                    <Text
                                      fontSize='xs'
                                      color='gray.400'
                                      mt={1}
                                      d='flex'
                                      alignItems='center'
                                      textTransform='capitalize'
                                    >
                                      {item.message.type === 'weekly_videos'
                                        ? item.message.type.split('_').join(' ')
                                        : item.message.type}
                                      <Text as='span' fontSize='lg' mx={1}>
                                        &middot;
                                      </Text>
                                      <Text as='span'>
                                        {moment(item.created).fromNow()}
                                      </Text>
                                    </Text>
                                  </Box>
                                </Link>
                              )
                            )
                          }}
                        </Menu.Item>
                      ))
                    )}
                  </AnimatePresence>
                </Box>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.any,
  loading: PropTypes.bool,
  updateNotification: PropTypes.func
}

export default Notifications
