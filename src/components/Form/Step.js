import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Tag, Text } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { GoPrimitiveDot } from 'react-icons/go'
import { Status } from 'helpers/misc'

const Step = ({ activity, cutThread }) => {
  const { COMPLETED, IN_PROGRESS, PENDING } = Status
  const isComplete = activity.status === COMPLETED
  const isInProgess = activity.status === IN_PROGRESS
  const isPending = activity.status === PENDING

  return (
    <Flex align='center' justify='space-between' pos='relative' mt={5}>
      <Flex align='center'>
        <Flex
          align='center'
          justify='center'
          rounded='100%'
          w={8}
          h={8}
          borderWidth={1}
          borderColor='gray.300'
          bg={isComplete ? 'cf.800' : 'transparent'}
          color='white'
        >
          {isComplete ? (
            <Icon as={FiCheck} />
          ) : (
            <Icon
              as={GoPrimitiveDot}
              color={isInProgess ? 'black' : 'gray.300'}
            />
          )}
        </Flex>
        <Box ml={3}>
          <Text
            textColor={isPending ? 'gray.300' : 'gray.700'}
            as='span'
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            {activity.title}
          </Text>
          {/* <Text
            fontSize='xs'
            textColor={isPending ? 'gray.300' : 'gray.500'}
            mt={-2}
          >
            Finance preparation
          </Text> */}
        </Box>
      </Flex>
      {!cutThread && (
        <Box
          pos='absolute'
          borderLeftWidth={1}
          borderColor={isPending ? 'gray.200' : 'gray.300'}
          h={5}
          ml={4}
          top={10}
        />
      )}
      {isComplete && (
        <Box textAlign='right'>
          <Tag
            bg='cf.200'
            color='cf.800'
            rounded='3xl'
            px={4}
            textAlign='center'
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            Completed
          </Tag>
          <Text fontSize={{ base: 'tiny', md: 'xs' }} color='gray.500' mr={2}>
            {new Date(activity?.updatedAt).toLocaleDateString()}
          </Text>
        </Box>
      )}
    </Flex>
  )
}

Step.propTypes = {
  cutThread: PropTypes.bool,
  activity: PropTypes.object
}

export default Step
