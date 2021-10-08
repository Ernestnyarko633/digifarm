import React from 'react'
import { Box, Flex, Avatar, Text, Heading, Link } from '@chakra-ui/react'
import { Link as ReachRouter } from 'react-router-dom'
import Button from 'components/Button'
import PropTypes from 'prop-types'

const CooperativesCard = ({ coop }) => {
  return (
    <Box
      borderWidth={1}
      borderColor='gray.300'
      borderRadius='10px'
      key={coop._id}
      my={{ base: 4, lg: 4 }}
    >
      <Flex p={{ base: 4, xl: 4 }}>
        <Avatar name={coop?.name} src={coop?.imageUrl} size='md' />
        <Box ml={3}>
          <Heading as='h3' fontSize={{ md: 'sm', xl: 'md', '3xl': 'lg' }}>
            {coop?.name}
          </Heading>
          <Text fontSize='xs' pt={2} lineHeight='shorter'>
            {coop?.product?.cropVariety?.crop?.name} (
            {coop?.product?.cropVariety?.crop?.sciName}) #{coop?.product?.name}
          </Text>
          <Text fontSize='sm' pt={{ base: 1, lg: 2 }}>
            {coop?.users?.length} members
          </Text>
        </Box>
      </Flex>
      <Flex justify='center' pb={{ base: 2, xl: 2 }}>
        <Link
          as={ReachRouter}
          to={{
            pathname: `/cooperative-main/${coop?._id}`,
            state: { _id: coop?._id }
          }}
          _hover={{ textDecor: 'none' }}
          width='80%'
        >
          <Button
            btntitle='View details'
            color='#31BC2E'
            colorScheme='none'
            borderWidth={1}
            width='100%'
            borderColor='gray.300'
            borderRadius='md'
            fontSize='14px'
          />
        </Link>
      </Flex>
    </Box>
  )
}

CooperativesCard.propTypes = {
  coop: PropTypes.any
}

export default CooperativesCard
