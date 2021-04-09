/* eslint-disable no-console */
import { Box, Flex, Heading, Text, Image, Badge, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Button from 'components/Button/index'
//import Bitmap from 'assets/images/Bitmap.png'
import PropTypes from 'prop-types'
import { Link as ReachRouter } from 'react-router-dom'

const YourFarmCard = ({ farms }) => {
  console.log(farms)
  const dummyFarms = [
    { color: '#FF9F9F' },
    { color: '#76B1F6' },
    { color: '#FF9F9F' },
    { color: '#76B1F6' },
    { color: '#FF9F9F' },
    { color: '#76B1F6' }
  ]
  return (
    <Box bg='white' w='100%' p={{ base: 4, md: 16 }}>
      <Flex align='center' justify='center' direction='column' w='100%'>
        <Flex align='center' direction='row' justify='space-around' w='100%'>
          <Heading as='h6' fontSize='lg'>
            Your Farm(s)
          </Heading>
          <Link as={ReachLink} to='/start-farm' _hover={{ textDecor: 'none' }}>
            <Button rounded='30px' btntitle='Start a farm' />
          </Link>
        </Flex>
        <Flex direction='row' align='center' justify='center' my={10}>
          {farms?.map((farm, index) => (
            <Flex
              as={ReachRouter}
              direction='column'
              align='center'
              justify='center'
              m={4}
              key={farm}
              to={`/farms/${farm?._id}`}
            >
              <Text fontSize='sm' mb={3}>
                {farm.name}
              </Text>
              <Box w={24} h={24} rounded='100%' pos='relative'>
                <Image
                  w='100%'
                  h='100%'
                  rounded='100%'
                  src={farm?.order.product?.cropVariety?.imageUrl}
                />
                <Badge
                  position='absolute'
                  top={0}
                  left={2}
                  bg={dummyFarms[index].color}
                  rounded='25px'
                  w={5}
                  h={5}
                >
                  <Box rounded='25px' w='25px' h='25px'></Box>
                </Badge>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

YourFarmCard.propTypes = {
  farms: PropTypes.any
}

export default YourFarmCard
