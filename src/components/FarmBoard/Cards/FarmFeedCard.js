/* eslint-disable no-console */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import {
  Box,
  Tag,
  Flex,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Collapse
} from '@chakra-ui/react'
import useAuth from 'context/auth'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FirstLettersToUpperCase } from 'helpers/misc'
import ReactPlayer from 'react-player/lazy'

const FarmFeedCard = ({ activeFarm, status, content, timestamp }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const [selectedItem, setSelectedItem] = React.useState({})

  const [activeIndex, setActiveIndex] = React.useState(0)

  const [items, setItems] = React.useState([])
  const handleClick = (value, array, index, indexFunc, selectedItemFunc) => {
    const comparant =
      index + value === 0 ||
      index + value > array.length - 1 ||
      index + value < 0
        ? 0
        : index + value

    indexFunc(comparant)
    selectedItemFunc(array[comparant])
  }

  const YoutubeSlide = ({ url }) => (
    <ReactPlayer
      width='100%'
      controls={true}
      loop={true}
      volume={0.3}
      url={url}
      playing={false}
    />
  )
  YoutubeSlide.propTypes = {
    url: PropTypes.any
  }

  React.useEffect(() => {
    let array = []
    const _feeds = feed => {
      return feed?.media?.forEach(_media => {
        if (_media?.type === 'image' || _media?.type === 'video')
          array.push(_media)
      })
    }
    const feeds = () =>
      content?.data?.map(feed => {
        return _feeds(feed?.feed)
      })

    if (status !== 'news' && status !== 'weekly_videos') {
      feeds()
    }

    if (array.length) {
      setItems(array)
      setSelectedItem(array[0])
    }
  }, [content, status])
  const Detail = () => {
    return (
      <Flex
        align='center'
        borderBottomWidth={1}
        justify='space-between'
        borderBottomColor='gray.200'
        px={{ base: 4, md: 0 }}
        py={{ base: 4, md: 0 }}
        pb={5}
      >
        <Flex align='center'>
          <Avatar
            size='md'
            src={activeFarm?.order?.product?.cropVariety?.imageUrl}
          />
          <Box ml={{ base: 2, md: 4 }}>
            <Heading
              as='h4'
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={700}
            >
              {user?.firstName}’s Farm
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
              {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
            </Text>
          </Box>
        </Flex>

        <Flex direction='column' justify='center' align='center'>
          <Box mx={{ base: 4 }}>
            <Text color='cf.400'>
              {status !== 'news' || status !== 'weekly_videos'
                ? 'FARM FEED'
                : null}
            </Text>
          </Box>
          <Text fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
            {timestamp}
          </Text>
        </Flex>
      </Flex>
    )
  }

  const FarmContent = () => {
    const mapKey = i => i
    if (items?.length) {
      return (
        <>
          <Box py={{ base: 4 }} px={{ base: 4, md: 8 }}>
            <Detail />
          </Box>
          <Box pos='relative'>
            {selectedItem?.type === 'image' && (
              <Image
                rounded='lg'
                h={{ md: 85 }}
                w='100%'
                objectFit='cover'
                src={selectedItem?.url}
              />
            )}

            {selectedItem?.type === 'video' && (
              <YoutubeSlide url={selectedItem?.url} muted playing={false} />
            )}
            <Flex
              align='center'
              justify='center'
              pos='absolute'
              bottom={6}
              left={{ base: '45%', xl: '42%' }}
            >
              <Flex
                as='button'
                role='button'
                aria-label='prev button'
                align='center'
                justify='center'
                w={10}
                h={10}
                rounded='100%'
                borderWidth={1}
                borderColor='transparent'
                _hover={{
                  background: 'white',
                  color: 'cf.400'
                }}
                color='white'
                mr={2}
                onClick={() => {
                  return handleClick(
                    -1,
                    items,
                    activeIndex,
                    setActiveIndex,
                    setSelectedItem
                  )
                }}
              >
                <Icon as={BsChevronLeft} />
              </Flex>
              <Flex
                as='button'
                role='button'
                aria-label='next button'
                align='center'
                justify='center'
                w={10}
                h={10}
                _hover={{
                  background: 'white',
                  color: 'cf.400'
                }}
                rounded='100%'
                borderWidth={1}
                borderColor='transparent'
                color='white'
                ml={2}
                onClick={() => {
                  return handleClick(
                    +1,
                    items,
                    activeIndex,
                    setActiveIndex,
                    setSelectedItem
                  )
                }}
              >
                <Icon as={BsChevronRight} />
              </Flex>
            </Flex>
          </Box>
          <Box px={{ base: 4, md: 16 }}>
            <Box mt={6}>
              <Flex direction='row' align='center'>
                <Tag
                  color='cf.400'
                  justifyContent='center'
                  bgGradient='linear(to-l, #DEECDC,#EFF6ED)'
                  rounded={20}
                  minW='12'
                  maxH='5'
                  px={5}
                  py={3}
                  mr={2}
                >
                  <Text fontWeight={600}>Activity</Text>
                </Tag>
                <Text fontWeight={400}>
                  {FirstLettersToUpperCase(content?.title)}
                </Text>
              </Flex>

              <Collapse
                startingHeight={85}
                in={show}
                onClick={handleToggle}
                cursor='pointer'
              >
                {
                  // content?.data[0]?.feed?.summary?.replace(/<[^>]*>/g, '')
                  content?.data?.map((body, i) => {
                    return (
                      <Fragment key={mapKey(i)}>
                        <Heading
                          as='h6'
                          mt={6}
                          fontSize={{ base: 'sm', md: 'xl' }}
                        >
                          {body?.task?.title}
                        </Heading>
                        <Text
                          color='gray.500'
                          mt={3}
                          fontSize={{ base: 'sm', md: 'md' }}
                        >
                          {body?.feed?.summary?.replace(/<[^>]*>/g, '')}
                        </Text>
                      </Fragment>
                    )
                  })
                }
              </Collapse>
              <Box as='button' onClick={handleToggle}>
                <Text color='cf.400' py={{ base: 1 }}>
                  {!show ? 'Read More' : 'Collapse'}
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )
    }

    return null
  }

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <FarmContent />
    </FarmBoardCardWrapper>
  )
}

FarmFeedCard.propTypes = {
  activeFarm: PropTypes.object,
  status: PropTypes.any,
  content: PropTypes.any,
  timestamp: PropTypes
}

export default FarmFeedCard
