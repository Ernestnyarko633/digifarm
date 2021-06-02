import React from 'react'
import PropTypes from 'prop-types'
import { Box, Avatar, Flex, Text } from '@chakra-ui/react'

const Details = ({ title, subtitle, image, name, variety, cropCode }) => {
  return (
    <Box>
      {image ? (
        <Flex p={2}>
          <Avatar name={name} src={image} size='sm' mt={2} />
          <Box px={3}>
            <Text fontWeight='bold'>{name}</Text>
            <Text fontSize='12px'>
              ( {variety} ) <Text as='span'> #{cropCode}</Text>
            </Text>
          </Box>
        </Flex>
      ) : (
        <Box borderTopWidth={1} borderColor='gray.300'>
          <Flex p={2}>
            <Text fontSize='16px'>{title}: </Text>
            <Text fontSize='16px' fontWeight='bold' ml={2}>
              {subtitle}
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

Details.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  image: PropTypes.any,
  name: PropTypes.any,
  variety: PropTypes.any,
  cropCode: PropTypes.any
}
export default Details
