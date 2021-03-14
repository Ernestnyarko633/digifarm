import React from 'react'
import { Box, Flex, Heading, Text, Link } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export default function FarmDocumentCard({ data, title, amount }) {
  // const keys = [
  //   {
  //     name: 'Start Date',
  //     data: {
  //       date: new Date().toLocaleDateString(),
  //       task: 'Riding',
  //       amount: `$ ${amount}`
  //     }
  //   },
  //   {
  //     name: 'End Date',
  //     data: {
  //       date: new Date().toLocaleDateString(),
  //       task: 'Riding',
  //       amount: `$ ${amount}`
  //     }
  //   },
  //   {
  //     name: 'Total Tasks',
  //     data: {
  //       date: new Date().toLocaleDateString(),
  //       task: 'Riding',
  //       amount: `$ ${amount}`
  //     }
  //   },
  //   {
  //     name: 'Total Cost',
  //     data: {
  //       date: new Date().toLocaleDateString(),
  //       task: 'Riding',
  //       amount: `$ ${amount}`
  //     }
  //   }
  // ]
  return (
    <Box
      w='687px'
      h='390px'
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
                <Link color='cf.400'>Download</Link>
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
  amount: PropTypes.any
}
