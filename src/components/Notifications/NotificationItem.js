/* eslint-disable no-console */
import React from 'react'
import { Link as ReachRouter } from 'react-router-dom'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import moment from 'moment'
import PropTypes from 'prop-types'

const NotificationItem = ({
  item,
  mutation,
  userMutation,
  toFarmBoard,
  renderNotificationIcons,
  active
}) => {
  console.log('aasdslll')
  return (
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
      onClick={
        item?.message?.entity === 'GENERIC'
          ? () => mutation.mutateAsync(item._id)
          : () => userMutation.mutateAsync(item._id)
      }
      to={toFarmBoard !== null && toFarmBoard(item?.message?.type, item)}
      borderBottomWidth={1}
      borderBottomColor='gray.100'
    >
      <Box w='2%' mr={8}>
        <Flex
          align='center'
          justify='center'
          w={8}
          h={8}
          rounded='100%'
          as='span'
          bg='cf.200'
        >
          {renderNotificationIcons(item?.message?.type)}
        </Flex>
      </Box>
      <Box w='95%'>
        <Text>
          {item?.message?.title ? item?.message?.title : item?.message?.text}
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
          <Text as='span'>{moment(item.created).fromNow()}</Text>
        </Text>
      </Box>
    </Link>
  )
}

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
  mutation: PropTypes.any,
  userMutation: PropTypes.any,
  toFarmBoard: PropTypes.func,
  renderNotificationIcons: PropTypes.func,
  active: PropTypes.string
}

export default NotificationItem
