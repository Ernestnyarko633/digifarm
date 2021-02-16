import React from 'react'
import { Avatar, Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'

export default function FarmDocumentCard({
  title,
  subtitle,
  receipt,
  date,
  amount
}) {
  return (
    <Box
      bg='white'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      py={8}
      px={{ md: 12 }}
    >
      <Flex
        align='center'
        justify='space-between'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        pb={5}
      >
        <Flex align='center'>
          <Avatar
            src={require('../../../assets/images/avatar.png').default}
            size='lg'
          />
          <Box ml={4}>
            <Heading as='h5' fontSize='xl' fontWeight={800}>
              {title}
            </Heading>
            <Text color='gray.500' fontSize='sm'>
              {subtitle}
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button btntitle='View receipt' rounded='30px' h={12} w={40} />
        </Box>
      </Flex>
      <Grid
        templateColumns={{ md: 'repeat(3, 1fr)' }}
        gap={8}
        w={{ md: 115 }}
        mt={{ md: 6 }}
      >
        <Box>
          <Heading fontSize='lg'>{receipt}</Heading>
          <Text color='gray.500' fontSize='sm'>
            Receipt no
          </Text>
        </Box>
        <Box>
          <Heading fontSize='lg'>{date}</Heading>
          <Text color='gray.500' fontSize='sm'>
            Date of transaction
          </Text>
        </Box>
        <Box>
          <Heading fontSize='lg'>$ {amount}</Heading>
          <Text color='gray.500' fontSize='sm'>
            Amount used
          </Text>
        </Box>
      </Grid>
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
