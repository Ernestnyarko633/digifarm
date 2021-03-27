import React, { useState } from 'react'
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import useApi from 'context/api'
import PropTypes from 'prop-types'
import useAuth from 'context/auth'
import useComponent from 'context/component'
import { useHistory } from 'react-router-dom'
/*eslint-disable */
export default function FarmDocumentCard({
  data,
  digitalFarmerFarm,
  title,
  amount,
  viewDoc
}) {
  const { _xclip, handleModalClick } = useComponent()
  const history = useHistory()
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { downloadTaskReceipt } = useApi()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { _receipt, setReceipt } = useState({})
  const _downloadPDF = async (task) => {
    // try {
    //   setLoading(true)
    //   setError(null)
    //   const res = await downloadTaskReceipt({
    //     digitalfarmer: user?._id,
    //     task: task?._id,
    //     farm: digitalFarmerFarm?._id
    //   })
    //   setReceipt(res.data)
    //   console.log(res.data, 'datafromspace')
    //   _xclip(res.data)
    //   setLoading(false)
    //   history.push(`/documents/${_receipt?.reference.trim()}/receipt`)
    // } catch (error) {
    //   setError(error)
    //   setLoading(false)
    // }

  handleModalClick("viewreceipt")
      
  }
  return (
    <Box
      w={{ md: '687px' }}
      h={{ md: '390px' }}
      bg='white'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
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
              <Box w='25%'>
               { <Button
                  color='cf.400'
                  onClick={() => !viewDoc ?  _downloadPDF(_key) : null}
                  isLoading={loading}
                  isDisabled={loading}
                >
                 {!viewDoc ? 'View Receipt' : 'View Document'}
                </Button>}
              </Box>
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
