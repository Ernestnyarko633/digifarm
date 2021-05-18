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

const ItemTag = ({
  setFilter,
  setActiveFarmIndex,
  filter,
  title,
  id,
  text
}) => (
  <Tag
    my={2}
    onClick={() => {
      setFilter(text)
      setActiveFarmIndex(id)
    }}
    color={filter === text ? 'cf.800' : 'gray.500'}
    textAlign='center'
    bg={filter === text ? 'cf.200' : 'gray.100'}
    rounded={20}
    px={5}
    py={3}
    mr={2}
    cursor='pointer'
  >
    <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight={600}>
      {title}
    </Text>
  </Tag>
)

const YourFarmCard = ({
  farms,
  setActiveFarmIndex,
  farmName,
  setFarmName,
  setFilter,
  filter
}) => {
  const mapKey = i => i
  const items = [
    { id: 0, title: 'All Feeds', filter: 'all' },
    { id: 1, title: 'Weekly Videos', filter: 'weekly videos' },
    { id: 2, title: 'News', filter: 'news' }
  ]

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
            Your Farm(s)
          </Heading>
          <Link as={ReachLink} to='/start-farm' _hover={{ textDecor: 'none' }}>
            <Button rounded='30px' btntitle='Start a farm' />
          </Link>
        </Flex>

        <Box
          pos={{ md: 'absolute' }}
          left={{ md: -12 }}
          d={farms.length > 8 ? 'block' : 'none'}
        >
          <ArrowButton handleClick={handleClick} />
        </Box>

        <Flex
          direction='column'
          align='center'
          justify='flex-start'
          maxW={{ md: 130 }}
          w={{ md: 130 }}
          overflow='hidden'
          my={10}
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
                    key={mapKey(index)}
                    direction='column'
                    align='center'
                    justify='center'
                    mr={4}
                    onClick={() => {
                      setFarmName(farm.name)
                      setFilter('all')
                    }}
                  >
                    <Text
                      fontSize='sm'
                      color={farmName === farm.name ? 'cf.800' : 'gray.200'}
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
                        farmName === farm.name ? 'cf.800' : 'gray.200'
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
                          farmName === farm.name
                            ? 'cf.800'
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
          {!farms.length && (
            <Flex>
              <Text> You currently have no farms </Text>
            </Flex>
          )}

          <Flex direction='row' p={{ md: 15, '2xl': 0 }} w='100%' mt={1}>
            {items.map(item => {
              if (item.title === 'All Feeds' && farms.length) {
                return (
                  <ItemTag
                    key={item.id}
                    setFilter={setFilter}
                    setActiveFarmIndex={setActiveFarmIndex}
                    id={item.id}
                    title={item.title}
                    text={item.filter}
                    filter={filter}
                  />
                )
              }
              if (item.title !== 'All Feeds') {
                return (
                  <ItemTag
                    key={item.id}
                    setFilter={setFilter}
                    setActiveFarmIndex={setActiveFarmIndex}
                    id={item.id}
                    title={item.title}
                    text={item.filter}
                    filter={filter}
                  />
                )
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
  setActiveFarmIndex: PropTypes.func,
  filter: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
}

YourFarmCard.propTypes = {
  farms: PropTypes.any,
  setActiveFarmIndex: PropTypes.func,
  farmName: PropTypes.any,
  setFarmName: PropTypes.func,
  setFilter: PropTypes.func,
  filter: PropTypes.any
}

export default YourFarmCard
