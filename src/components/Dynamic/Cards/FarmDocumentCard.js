import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import useComponent from 'context/component'

export default function FarmDocumentCard({
  title,
  subtitle,
  receipt,
  date,
  amount
}) {
  const { handleModalClick } = useComponent()
  const thisData = {
    title,
    subtitle,
    receipt,
    date,
    amount
  }
  const keys = [
    { name: 'Start Date', data: new Date().toLocaleDateString() },
    {
      name: 'End Date',
      data: new Date(
        new Date().setDate(new Date().getDate() + 30)
      ).toLocaleDateString()
    },
    { name: 'Total Tasks', data: 0 },
    { name: 'Total Cost', data: `$ ${amount}` }
  ]
  return (
    <Box
      w='408px'
      h='336px'
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
        <Button
          btntitle='View all receipts'
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
          onClick={() => handleModalClick('activity-receipts', thisData)}
        />
      </Flex>
    </Box>
  )
}

FarmDocumentCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  receipt: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.string
}
