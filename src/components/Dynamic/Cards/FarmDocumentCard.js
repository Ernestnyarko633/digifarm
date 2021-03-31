/*eslint-disable */
import React, { useEffect } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import useComponent from 'context/component'

export default function FarmDocumentCard({
  key,
  title,
  subtitle,
  receipt,
  date,
  ScheduledTasks,
  tasksNumber,
  __activityID,
  digitalFarmerFarm,
  amount,
  viewDoc
}) {
  const { handleModalClick } = useComponent()

  // useEffect(() => {
  //   window.html2canvas = html2canvas
  //   var doc = new jsPDF({
  //     orientation: 'landscape',
  //     unit: 'px'
  //     // format: [4, 2]
  //   })

  //   var content = document.getElementById('content-22')
  //   console.log('content', content)
  //   console.log('document.body', document.body)
  //   doc.html(content, {
  //     callback: function (doc) {
  //       console.log('in callback')
  //       doc.save()
  //     }
  //   })
  // }, [])
  const thisData = {
    title,
    amount,
    digitalFarmerFarm,
    ScheduledTasks: ScheduledTasks.filter(
      _task => __activityID === _task.taskId.activity._id
    ),
    viewDoc
  }
  const keys = [
    { name: 'Total Tasks', data: tasksNumber },
    { name: 'Total Cost', data: `$ ${amount}` }
  ]
  return (
    <Box
      w="auto"
      h='236px'
      bg='white'
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
            borderColor='cf.400'
            color='cf.400'
            rounded='30px'
            my={5}
            colorScheme='none'
            w='100%'
            h={50}
            _hover={{ bg: 'white' }}
            shadow='none'
            fontSize='md'
            onClick={() => handleModalClick('activity-receipts', thisData.ScheduledTasks?.length > 0 ? thisData : null)}
          />
        }
      </Flex>
    </Box>
  )
}

FarmDocumentCard.propTypes = {
  key: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  receipt: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.any,
  tasksNumber: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  __activityID: PropTypes.any,
  digitalFarmerFarm: PropTypes.any,
  viewDoc: PropTypes.bool
}
