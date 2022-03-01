/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import useComponent from 'context/component'
import { getFormattedMoney } from 'helpers/misc'
export default function FarmDocumentCard({
  title,
  subtitle,
  receipt,
  date,
  ScheduledTasks,
  tasksNumber,
  __activityID,
  farmfeeds,
  digitalFarmerFarm,
  amount,
  viewDoc
}) {
  const { handleModalClick } = useComponent()

  console.log(ScheduledTasks, 'valiies')

  const thisData = {
    title,
    amount,
    digitalFarmerFarm,
    farmfeeds: farmfeeds.filter(feed => __activityID === feed?._id),
    ScheduledTasks: ScheduledTasks.filter(
      _task => __activityID === _task?.task?.activity?._id
    ),
    viewDoc
  }
  const keys = [
    { name: 'Total Tasks', data: tasksNumber },
    { name: 'Total Cost', data: `$ ${getFormattedMoney(amount)}` }
  ]
  return (
    <Box
      w={{ base: '100%', md: '100%' }}
      h={{ base: '100%', md: '236px' }}
      bg='white'
      p={{ base: 4, md: 0 }}
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      <Flex
        align='center'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        px={{ md: 8 }}
        py={4}
      >
        <Heading as='h5' fontSize='lg' fontWeight={800}>
          {title}
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' px={{ md: 8 }}>
        {keys.map((_key, index) => {
          return (
            <Flex
              key={_key.name}
              direction='row'
              justify='space-between'
              align='center'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              py={3}
            >
              <Text color='gray.500' fontSize='sm'>
                {_key.name}
              </Text>
              <Heading fontSize='lg'>{_key.data}</Heading>
            </Flex>
          )
        })}
        {
          <Button
            btntitle={!viewDoc ? 'View all receipts' : 'View all Documents'}
            bg='white'
            borderWidth={1}
            borderColor='cf.green'
            color='cf.green'
            rounded='30px'
            my={5}
            colorScheme='none'
            w='100%'
            h={{ base: 10, md: 50 }}
            _hover={{ bg: 'white' }}
            shadow='none'
            fontSize='md'
            onClick={
              () =>
                handleModalClick(
                  'activity-receipts',
                  thisData.ScheduledTasks?.length > 0 ? thisData : null
                )
              // eslint-disable-next-line react/jsx-curly-newline
            }
          />
        }
      </Flex>
    </Box>
  )
}

FarmDocumentCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  receipt: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.any,
  tasksNumber: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  __activityID: PropTypes.any,
  digitalFarmerFarm: PropTypes.any,
  viewDoc: PropTypes.bool,
  farmfeeds: PropTypes.any
}
