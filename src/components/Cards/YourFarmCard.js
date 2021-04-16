import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  Link,
  Tag,
  Button as ChakraButton
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Button from 'components/Button/index'
//import Bitmap from 'assets/images/Bitmap.png'
import PropTypes from 'prop-types'
//import { Link as ReachRouter } from 'react-router-dom'

const YourFarmCard = ({
  farms,
  setFarmIndex,
  activeFarmIndex,
  setFilter,
  filter
}) => {
  const dummyFarms = [
    { color: '#FF9F9F' },
    { color: '#76B1F6' },
    { color: '#FF9F9F' },
    { color: '#76B1F6' },
    { color: '#FF9F9F' },
    { color: '#76B1F6' },
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

        <Flex
          direction='column'
          align='center'
          justify='flex-start'
          w='70%'
          my={10}
        >
          <Flex w='100%'>
            {farms?.map((farm, index) => (
              <Flex
                direction='column'
                align='center'
                justify='center'
                m={4}
                key={farm}
                onClick={() => {
                  filter === 'combined' && setFarmIndex(index)
                }}
              >
                <Text
                  fontSize='sm'
                  color={
                    activeFarmIndex === index && filter === 'combined'
                      ? 'cf.400'
                      : 'gray.200'
                  }
                  mb={3}
                >
                  {farm.name}
                </Text>
                <Box
                  w={24}
                  h={24}
                  rounded='100%'
                  borderWidth='1px'
                  pos='relative'
                  borderColor={
                    index === activeFarmIndex ? 'cf.400' : 'gray.200'
                  }
                >
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
                    bg={
                      activeFarmIndex === index
                        ? 'cf.400'
                        : dummyFarms[index]?.color || '#ff0000'
                    }
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

          <Flex direction='row' w='100%'>
            <Tag
              my={2}
              as={ChakraButton}
              onClick={() => {
                setFilter('combined')
                setFarmIndex(0)
              }}
              color={filter === 'combined' ? 'cf.400' : 'gray.400'}
              justifyContent='center'
              bgGradient={
                filter === 'combined'
                  ? 'linear(to-l, #DEECDC,#EFF6ED)'
                  : 'linear(to-l, #fff)'
              }
              rounded={20}
              minW='12'
              maxH='5'
              px={5}
              py={3}
              mr={2}
            >
              <Text fontWeight={600}>All Feeds</Text>
            </Tag>
            <Tag
              my={2}
              as={ChakraButton}
              onClick={() => {
                setFarmIndex(null)

                setFilter('weekly videos')
              }}
              color={filter === 'weekly videos' ? 'cf.400' : 'gray.400'}
              justifyContent='center'
              bgGradient={
                filter === 'weekly videos'
                  ? 'linear(to-l, #DEECDC,#EFF6ED)'
                  : 'linear(to-l, #fff)'
              }
              rounded={20}
              minW='12'
              maxH='5'
              px={5}
              py={3}
              mr={2}
            >
              <Text fontWeight={600}>Weekly Videos</Text>
            </Tag>
            <Tag
              my={2}
              onClick={() => {
                setFarmIndex(null)
                setFilter('news')
              }}
              as={ChakraButton}
              color={filter === 'news' ? 'cf.400' : 'gray.400'}
              justifyContent='center'
              bgGradient={
                filter === 'news'
                  ? 'linear(to-l, #DEECDC,#EFF6ED)'
                  : 'linear(to-l, #fff)'
              }
              rounded={20}
              minW='12'
              maxH='5'
              px={5}
              py={3}
              mr={2}
            >
              <Text fontWeight={600}>News</Text>
            </Tag>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

YourFarmCard.propTypes = {
  farms: PropTypes.any,
  setFarmIndex: PropTypes.any,
  activeFarmIndex: PropTypes.any,
  setFilter: PropTypes.any,
  filter: PropTypes.any
}

export default YourFarmCard
