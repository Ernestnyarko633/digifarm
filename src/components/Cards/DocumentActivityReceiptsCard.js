/* eslint-disable no-console */
import React, { useState } from 'react'
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import useApi from 'context/api'
import PropTypes from 'prop-types'
import useAuth from 'context/auth'
import ReceiptModal from 'components/Modals/ReceiptModal'
import TasksDocuments from 'components/Modals/TasksDocuments'

export default function FarmDocumentCard({
  data,
  digitalFarmerFarm,
  title,
  amount,
  viewDoc
}) {
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
    } catch (error) {
      setError(error)
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
            data={selectedTask?.media.filter(media => media.type === 'pdf')}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box
      w={{ md: '687px' }}
      h={{ md: '390px' }}
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
        px={{ md: 8 }}
        py={4}
      >
        <Heading as='h5' fontSize='lg' fontWeight={800}>
          {title}
        </Heading>
        <Heading as='h5' fontSize='lg' fontWeight={800}>
          $ {amount}
        </Heading>
      </Flex>
      <Flex direction='column' w='100%' px={{ md: 8 }}>
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
        {data?.map((_key, index) => {
          return (
            <Flex
              key={_key._id}
              direction='row'
              justify='space-between'
              align='center'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              py={5}
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
                  {_key?.taskId?.name}
                </Heading>
              </Box>
              <Box w='25%'>
                <Heading textAlign='left' fontSize='lg'>
                  {_key?.taskId?.budget}
                </Heading>
              </Box>
              <Flex w='25%'>
                <Button
                  color='cf.400'
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
                    color='cf.400'
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

FarmDocumentCard.propTypes = {
  data: PropTypes.any,
  title: PropTypes.any,
  amount: PropTypes.any,
  digitalFarmerFarm: PropTypes.any,
  viewDoc: PropTypes.bool
}
