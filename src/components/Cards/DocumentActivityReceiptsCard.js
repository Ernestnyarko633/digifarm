/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import useApi from 'context/api'
import PropTypes from 'prop-types'
import useAuth from 'context/auth'
import ReceiptModal from 'components/Modals/ReceiptModal'
import TasksDocuments from 'components/Modals/TasksDocuments'
import { getFormattedMoney } from 'helpers/misc'

export default function DocumentActivityReceiptsCard({
  data,
  digitalFarmerFarm,
  title,
  amount,
  farmfeeds: formfeeds,
  viewDoc
}) {
  const [actualFeeds, setActualFeeds] = React.useState(undefined)
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { downloadTaskReceipt } = useApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [receipt, setReceipt] = useState({})
  const [modal, setModal] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState({})

  const onOpen = value => {
    setModal(value)
    setOpen(true)
  }

  React.useEffect(() => {
    let mounted = true
    if (mounted && formfeeds.length && actualFeeds === undefined) {
      let tempFeeds = []
      const process = () =>
        formfeeds.forEach(feedItem =>
          feedItem.data.forEach(actualFeed =>
            tempFeeds.push({ ...actualFeed.feed, task: actualFeed.task })
          )
        )
      process()
      setActualFeeds(tempFeeds)
    }
    return () => (mounted = false)
  }, [actualFeeds, formfeeds, formfeeds.length])
  const onClose = () => {
    setOpen(false)
  }
  const _downloadPDF = async task => {
    try {
      setSelectedTask(task)
      setLoading(true)
      setError(null)
      const res = await downloadTaskReceipt({
        digitalfarmer: user?._id,
        task: task?._id,
        farm: digitalFarmerFarm?._id
      })
      setReceipt(res?.data)
      setLoading(false)
      onOpen('viewreceipt')
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }
  const toggleModal = value => {
    switch (value) {
      case 'viewreceipt':
        return (
          <ReceiptModal
            open={open}
            onClose={onClose}
            data={{
              data: receipt,
              date: new Date(
                selectedTask?.actual_endDate || selectedTask?.endDate
              ).toLocaleDateString()
            }}
          />
        )
      case 'viewdocuments':
        return (
          <TasksDocuments
            open={open}
            onClose={onClose}
            data={formfeeds?.filter(
              feed => feed?.task?._id === selectedTask?.task?._id
            )}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box
      w={{ base: '100%', md: '687px' }}
      h={{ base: '100%', md: '390px' }}
      bg='white'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      {toggleModal(modal)}
      <Flex
        align='center'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        px={{ base: 4, md: 8 }}
        py={{ base: 2, md: 4 }}
      >
        <Heading as='h5' fontSize={{ base: 'md', md: 'lg' }} fontWeight={800}>
          {title}
        </Heading>
        <Heading as='h5' fontSize={{ base: 'md', md: 'lg' }} fontWeight={800}>
          $ {getFormattedMoney(amount)}
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' px={{ base: 4, md: 8 }}>
        <Flex
          direction='row'
          justify='space-between'
          align='center'
          borderBottomWidth={1}
          borderBottomColor='gray.200'
          py={5}
        >
          <Box w='25%'>
            <Text color='gray.500' fontSize='sm'>
              DATE
            </Text>
          </Box>
          <Box w='25%'>
            <Text color='gray.500' fontSize='sm'>
              TASK
            </Text>
          </Box>
          <Box w='25%'>
            <Text color='gray.500' fontSize='sm'>
              AMOUNT
            </Text>
          </Box>
          <Box w='25%'>
            <Text color='gray.500' fontSize='sm'>
              {' '}
            </Text>
          </Box>
        </Flex>
        {data?.ScheduledTasks?.map((_key, index) => {
          return (
            <Flex
              key={_key._id}
              direction='row'
              justify='space-between'
              align='center'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              py={{ base: 2, md: 5 }}
            >
              <Box w='25%'>
                <Heading textAlign='left' fontSize='lg'>
                  {new Date(
                    _key.actual_endDate || _key.endDate
                  ).toLocaleDateString()}
                </Heading>
              </Box>
              <Box w='25%'>
                <Heading textAlign='left' fontSize='lg'>
                  {_key?.task?.title}
                </Heading>
              </Box>
              <Box w='25%'>
                <Heading textAlign='left' fontSize='lg'>
                  {_key?.task?.budget}
                </Heading>
              </Box>
              <Flex w='25%'>
                <Button
                  color='cf.green'
                  onError={() => error}
                  onClick={() => _downloadPDF(_key)}
                  isLoading={loading}
                  isDisabled={loading}
                  bg='white'
                  mr={{ md: 5 }}
                  _hover={{ backgroundColor: 'white' }}
                >
                  Receipt
                </Button>
                {viewDoc && (
                  <Button
                    bg='white'
                    _hover={{ backgroundColor: 'white' }}
                    color='cf.green'
                    onClick={() => {
                      setSelectedTask(_key)
                      onOpen('viewdocuments')
                    }}
                    isDisabled={loading}
                  >
                    Documents
                  </Button>
                )}
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}

DocumentActivityReceiptsCard.propTypes = {
  data: PropTypes.any,
  title: PropTypes.any,
  amount: PropTypes.any,
  digitalFarmerFarm: PropTypes.any,
  viewDoc: PropTypes.bool,
  farmfeeds: PropTypes.any
}
