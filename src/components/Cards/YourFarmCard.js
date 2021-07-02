import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Badge,
  Link,
  Tag
} from '@chakra-ui/react'
import React from 'react'
import { Link as ReachLink } from 'react-router-dom'
import Button from 'components/Button/index'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import ArrowButton from '../Button/ArrowButton'

const MotionFlex = motion(Flex)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const ItemTag = ({ setFilter, filter, title, setActiveFarmIndex, text }) => {
  return (
    <Tag
      my={2}
      onClick={() => {
        setFilter(text)
        setActiveFarmIndex(text === 'feeds' ? 0 : null)
      }}
      color={filter === text ? 'cf.green' : 'gray.500'}
      textAlign='center'
      d='flex'
      alignItems='center'
      justifyContent='center'
      bg={filter === text ? 'cf.200' : 'gray.100'}
      rounded={20}
      px={5}
      py={3}
      mr={2}
      cursor='pointer'
      minW={32}
    >
      <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight={600}>
        {title}
      </Text>
    </Tag>
  )
}

const items = [
  { id: 0, title: 'All Feeds', filter: 'feeds' },
  { id: 1, title: 'Weekly Videos', filter: 'videos' },
  { id: 2, title: 'News', filter: 'news' },
  { id: 3, title: 'Blog Posts', filter: 'blogs' }
]

const YourFarmCard = ({
  farms,
  setActiveFarmIndex,
  setFarmName,
  activeFarmIndex,
  setFilter,
  filter
}) => {
  const mapKeys = i => i
  const randomColors = [
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

  const [currentSlide, setCurrentSlide] = React.useState(0)

  // let arr = new Array(10).fill({
  //   name: "Jeff's farm",
  //   img: "https://completefarmer.s3.us-east-2.amazonaws.com/app/images/crops/solo-gold.png",
  //   _id: "606f58a1cf286d001193cf93",
  // });

  const handleClick = direction => {
    setCurrentSlide(prevState => {
      return (farms.length + prevState + direction) % farms.length
    })
  }

  return (
    <Box bg='white' w='100%' p={{ base: 0, md: 16 }}>
      <Flex
        align='center'
        justify='center'
        direction='column'
        w='100%'
        pos='relative'
        pt={{ base: 16, md: 0 }}
      >
        <Flex align='center' direction='row' justify='space-around' w='100%'>
          <Heading as='h6' fontSize='lg'>
            {farms.length ? 'Your Farm(s)' : ''}
          </Heading>
          <Link as={ReachLink} to='/start-farm' _hover={{ textDecor: 'none' }}>
            <Button rounded='30px' btntitle='Start a farm' />
          </Link>
        </Flex>

        <Flex
          direction='column'
          align='center'
          justify='flex-start'
          maxW={{ md: 127 }}
          w={{ md: 127 }}
          overflow='hidden'
          my={10}
          px={{ base: 6, md: 0 }}
        >
          <MotionFlex
            align='center'
            animate={{
              x: `-${7 * currentSlide}rem`,
              transition: { duration: 0.6, ...transition }
            }}
            pos='relative'
            w='100%'
          >
            {farms?.map((farm, index) => (
              <>
                {farm?.order?.product?._id && (
                  <Flex
                    key={mapKeys(index)}
                    direction='column'
                    align='center'
                    justify='center'
                    mr={4}
                    onClick={() => {
                      setFarmName(farm.name)
                      setFilter('feeds')
                      setActiveFarmIndex(index)
                    }}
                  >
                    <Text
                      fontSize='sm'
                      color={
                        index === activeFarmIndex ? 'cf.green' : 'gray.200'
                      }
                      mb={3}
                    >
                      {farm.name}
                    </Text>
                    <Box
                      w={{ base: 20, md: 24 }}
                      h={{ base: 20, md: 24 }}
                      rounded='100%'
                      borderWidth='1px'
                      pos='relative'
                      borderColor={
                        index === activeFarmIndex ? 'cf.green' : 'gray.200'
                      }
                    >
                      <Image
                        w='100%'
                        h='100%'
                        rounded='100%'
                        src={farm?.order?.product?.cropVariety?.imageUrl}
                      />
                      <Badge
                        position='absolute'
                        top={0}
                        left={2}
                        bg={
                          index === activeFarmIndex
                            ? 'cf.green'
                            : randomColors[index]?.color || '#ff0000'
                        }
                        rounded='25px'
                        w={5}
                        h={5}
                      >
                        <Box rounded='25px' w='25px' h='25px' />
                      </Badge>
                    </Box>
                  </Flex>
                )}
              </>
            ))}
          </MotionFlex>

          <Box
            pos={{ md: 'absolute' }}
            left={{ md: -2 }}
            d={farms.length > 8 ? 'block' : 'none'}
            mt={{ base: 6, md: 0 }}
          >
            <ArrowButton handleClick={handleClick} />
          </Box>

          <Flex
            align='center'
            // justify='flex-start'
            // direction='row'
            w={{ base: 82, sm: '100%' }}
            mt={3}
            overflowX={{
              base: items.length > 3 && 'scroll',
              md: items.length > 6 && 'scroll'
            }}
          >
            {items.map(item => {
              if (farms.length && item.filter === 'feeds') {
                return (
                  <ItemTag
                    key={item.id}
                    setFilter={setFilter}
                    setActiveFarmIndex={setActiveFarmIndex}
                    title={item.title}
                    text={item.filter}
                    filter={filter}
                  />
                )
              } else {
                if (item.filter !== 'feeds') {
                  return (
                    <Box>
                      <ItemTag
                        key={item.id}
                        setFilter={setFilter}
                        setActiveFarmIndex={setActiveFarmIndex}
                        title={item.title}
                        text={item.filter}
                        filter={filter}
                      />
                    </Box>
                  )
                }
              }

              return null
            })}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

ItemTag.propTypes = {
  id: PropTypes.number,
  setFilter: PropTypes.func,
  setFarmIndex: PropTypes.func,
  filter: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  activeFarmIndex: PropTypes.any,
  setActiveFarmIndex: PropTypes.any
}

YourFarmCard.propTypes = {
  farms: PropTypes.any,
  setActiveFarmIndex: PropTypes.func,
  activeFarmIndex: PropTypes.any,
  farmName: PropTypes.any,
  setFarmName: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.any
}

export default YourFarmCard
