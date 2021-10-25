import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
const NewsHead = ({ content, status }) => (
  <Flex align='center' justify='space-between'>
    <Flex align='center'>
      <Box ml={4}>
        <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
          {['BLOGS'].includes(status) ? 'Blog Post' : 'Weekly News'}
        </Heading>
      </Box>
    </Flex>

    <Flex direction='column' justify='center' align='center'>
      <Box mx={{ base: 4 }}>
        <Text color='cf.green' fontWeight={700}>
          {['BLOGS'].includes(status)
            ? 'BLOGS'
            : status === 'NEWS'
            ? status.toUpperCase()
            : null}
        </Text>
      </Box>
      <Text color='gray.500' fontSize={{ base: 'xs', md: 'sm' }} mt={-1}>
        {new Date(content?.first_publication_date)?.toLocaleDateString()}
      </Text>
    </Flex>
  </Flex>
)

NewsHead.propTypes = {
  content: PropTypes.object,
  status: PropTypes.string
}

export default NewsHead
