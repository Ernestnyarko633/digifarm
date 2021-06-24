import React from 'react'
import PropTypes from 'prop-types'
import { Box, Avatar, Flex, Text } from '@chakra-ui/react'

const Details = ({
  title,
  subtitle,
  image,
  name,
  variety,
  cropCode,
  color
}) => {
  return (
    <Box>
      {image ? (
        <Flex p={2}>
          <Avatar name={name} src={image} size='sm' mt={2} />
          <Box px={3}>
            <Text fontWeight='bold' fontSize={{ base: 16, xl: 16 }}>
              {name}
            </Text>
            <Text fontSize='12px'>
              ( {variety} ) <Text as='span'> #{cropCode}</Text>
            </Text>
          </Box>
        </Flex>
      ) : (
        <Box borderTopWidth={1} borderColor='gray.300'>
          <Flex p={2}>
            <Text fontSize={{ base: 12, xl: 16 }}>{title}: </Text>
            <Text
              fontSize={{ base: 12, xl: 16 }}
              fontWeight='bold'
              ml={2}
              color={color || 'black'}
            >
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
  cropCode: PropTypes.any,
  color: PropTypes.any
}
export default Details
