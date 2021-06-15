import React from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import CooperativeFAQCard from 'components/Cards/CooperativeFAQCard'
import Button from 'components/Button'

const CooperativeFAQ = ({ cooperativeFaqs }) => {
  return (
    <Box py={20} bg='white'>
      <Box textAlign='center'>
        <Heading as='h4' fontSize={{ base: '2xl', lg: '5xl' }}>
          Frequently Asked Questions
        </Heading>
        <Text fontSize={{ base: 'md', lg: '2xl' }} mt={4}>
          What other interested users have asked us.
        </Text>
      </Box>
      <CooperativeFAQCard cooperativeFaqs={cooperativeFaqs} />
      <Flex direction='column' justify='center' align='center' mt={20}>
        <Link
          href='https://www.completefarmer.com/support/faq/cooperative/'
          d='flex'
          color='cf.400'
          //   isExternal
          _hover={{ textDecor: 'none' }}
        >
          <Button
            rightIcon={<ArrowForwardIcon ml={2} />}
            btntitle='Show more on FAQ'
            fontWeight={700}
            bg='white'
            color='cf.400'
            colorScheme='none'
            variant='outline'
            border='1px'
            w={{ base: 60, md: 52, lg: 60 }}
            h={{ base: 10, md: 12, lg: 12 }}
            fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}
            mr={{ md: 6 }}
            _focus={{ outline: 'none' }}
          />
        </Link>
      </Flex>
    </Box>
  )
}

CooperativeFAQ.propTypes = {
  cooperativeFaqs: PropTypes.array.isRequired
}

export default CooperativeFAQ
