/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Menu } from '@headlessui/react'
import { BsBell } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from 'react-loader-spinner'
import { ANNOUNCEMENT, NEWS, WEEKLYVIDEOS } from 'theme/Icons'
import PropTypes from 'prop-types'
import NotificationItem from '../Notifications/NotificationItem'
import { FaReceipt } from 'react-icons/all'
import useApi from 'context/api'

const MotionBox = motion(Box)

const Notifications = ({ notifications, loading, mutation, userMutation }) => {
  const { approvalOrder } = useApi()
  const renderNotificationIcons = value => {
    switch (value) {
      case 'news':
        return <Icon as={NEWS} boxSize={4} />
      case 'announcements':
        return <Icon as={ANNOUNCEMENT} boxSize={4} />
      case 'weekly_videos':
        return <Icon as={WEEKLYVIDEOS} boxSize={4} />
      case 'DIGITAL_FARMER':
        return <Icon as={FaReceipt} boxSize={4} color='cf.green' />
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
      case 'DIGITAL_FARMER':
        return `/farms/${item?.message?.id}`
      default:
        return `/farms?type=${value}&title=${item?.message?.title}&id=${item?.messageId}`
    }
  }

  React.useEffect(() => {
    let mounted = true

    const createFarm = async id => {
      try {
        await approvalOrder(id)
      } catch (error) {
        console.log(error)
      }
    }

    const verifiedEscrows = notifications?.filter(
      item => item.message.entity === 'ESCROW_PAYMENT'
    )

    if (mounted && verifiedEscrows?.length) {
      if (verifiedEscrows?.length) {
        const process = () =>
          verifiedEscrows?.map(
            async item =>
              item?.message?.order_id &&
              (await createFarm(item?.message?.order_id))
          )
        process()
      }
    }

    return () => (mounted = false)
  }, [approvalOrder, notifications])

  const getNotified = (value, item, active) => {
    switch (value) {
      case 'GENERIC':
        return (
          <NotificationItem
            item={item}
            mutation={mutation}
            userMutation={userMutation}
            renderNotificationIcons={renderNotificationIcons}
            toFarmBoard={toFarmBoard}
            active={active}
          />
        )
      case 'ORDER':
      case 'PAYMENT':
      case 'ESCROW_PAYMENT':
        return (
          <NotificationItem
            item={item}
            mutation={mutation}
            userMutation={userMutation}
            renderNotificationIcons={renderNotificationIcons}
            toFarmBoard={null}
            active={active}
          />
        )
      case 'farm':
      default:
        return null
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
            {notifications?.length >= 1 && (
              <Flex
                pos='absolute'
                top={-2}
                align='center'
                justify='center'
                fontSize='xs'
                rounded='100%'
                bg='red.500'
                color='white'
                w={5}
                h={5}
                px={('' + notifications?.length)?.length > 1 ? 1 : 0}
                right={-2}
              >
                {notifications?.length > 9 ? '9+' : notifications?.length}
              </Flex>
            )}
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
                h={90}
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
                  backgroundColor='white'
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
                    ) : notifications?.length === 0 ? (
                      <Text fontSize='lg' textAlign='center' p={6}>
                        No notifications
                      </Text>
                    ) : (
                      notifications?.map(item => (
                        <Menu.Item key={item?._id} as={MotionBox}>
                          {({ active }) => {
                            return (
                              item?.status === 'NEW' &&
                              getNotified(item?.message?.entity, item, active)
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
  mutation: PropTypes.object,
  userMutation: PropTypes.object
}

export default Notifications
