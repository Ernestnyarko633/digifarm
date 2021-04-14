import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import {
  Box,
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

const FarmFeedCard = ({ activeFarm, status, content, timestamp }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const [selectedImage, setSelectedImage] = React.useState({})
  const [selectedVideo, setSelectedVideo] = React.useState({})

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [activeVideoIndex, setVideoActiveIndex] = React.useState(0)

  const [images, setImages] = React.useState([])
  const [videos, setVideos] = React.useState([])

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

  React.useEffect(() => {
    let array = []
    let _array = []
    const _feeds = feed => {
      return feed?.media?.forEach(_media => {
        if (_media?.type === 'image') array.push(_media)
        if (_media?.type === 'video') _array.push(_media)
      })
    }
    const feeds = () =>
      content?.data?.map(feed => {
        return _feeds(feed?.feed)
      })

    if (status !== 'news' && status !== 'weekly_videos') {
      feeds()
    }
    if (_array.length) {
      setVideos(_array)

      setSelectedVideo(_array[0])
    }
    if (array.length) {
      setImages(array)
      setSelectedImage(array[0])
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
          {/* {status !== 'news' && (
            // <Box ml={{ base: 5, md: 12 }} d={{ base: 'none', md: 'block' }}>
            //   <Tag
            //     bg='cf.200'
            //     color='cf.400'
            //     rounded='xl'
            //     px={{ base: 4, md: 6 }}
            //     fontWeight='bold'
            //     fontSize={{ base: 'sm', md: 'md' }}
            //   >
            //     {level}
            //   </Tag>
            // </Box>
          )} */}
        </Flex>

        <Box>
          <Text fontSize={{ base: 'sm', md: 'md' }} color='gray.500'>
            {timestamp}
          </Text>
        </Box>
      </Flex>
    )
  }

  const FarmContent = () => {
    if (images?.length) {
      return (
        <>
          <Box py={{ base: 4 }} px={{ base: 4, md: 8 }}>
            <Detail />
          </Box>
          <Box pos='relative'>
            <Image
              rounded='lg'
              h={{ md: 85 }}
              w='100%'
              objectFit='cover'
              src={selectedImage?.url}
            />
            <Flex
              align='center'
              justify='center'
              pos='absolute'
              bottom={6}
              left='45%'
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
                borderColor='white'
                color='white'
                mr={2}
                onClick={() => {
                  return handleClick(
                    -1,
                    images,
                    activeIndex,
                    setActiveIndex,
                    setSelectedImage
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
                rounded='100%'
                borderWidth={1}
                borderColor='white'
                color='cf.400'
                bg='white'
                ml={2}
                onClick={() => {
                  return handleClick(
                    +1,
                    images,
                    activeIndex,
                    setActiveIndex,
                    setSelectedImage
                  )
                }}
              >
                <Icon as={BsChevronRight} />
              </Flex>
            </Flex>
          </Box>
          <Box px={{ base: 4, md: 16 }}>
            <Box mt={6}>
              {/* <Text textTransform='uppercase' fontWeight='bold'>
                    <Icon as={Flower} /> {actionTitle}
                  </Text> */}
              <Collapse
                startingHeight={85}
                in={show}
                onClick={handleToggle}
                cursor='pointer'
              >
                <Text
                  color='gray.500'
                  mt={3}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {content?.data[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
                </Text>
              </Collapse>
            </Box>
          </Box>
        </>
      )
    }

    if (videos.length === 90) {
      return (
        <>
          <Box py={{ base: 4, md: 10 }} px={{ base: 4, md: 16 }}>
            <Detail />
          </Box>
          <Box pos='relative' as='video' autoPlay loop>
            <Box
              as='source'
              rounded='lg'
              h={{ md: 85 }}
              w='100%'
              objectFit='cover'
              src={selectedVideo?.url}
            />
            <Flex
              align='center'
              justify='center'
              pos='absolute'
              bottom={6}
              left='45%'
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
                borderColor='white'
                color='white'
                mr={2}
                onClick={() => {
                  return handleClick(
                    -1,
                    videos,
                    activeVideoIndex,
                    setVideoActiveIndex,
                    setSelectedVideo
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
                rounded='100%'
                borderWidth={1}
                borderColor='white'
                color='cf.400'
                bg='white'
                ml={2}
                onClick={() => {
                  return handleClick(
                    -1,
                    videos,
                    activeVideoIndex,
                    setVideoActiveIndex,
                    setSelectedVideo
                  )
                }}
              >
                <Icon as={BsChevronRight} />
              </Flex>
            </Flex>
          </Box>
          <Box px={{ base: 4, md: 16 }}>
            <Box mt={6}>
              {/* <Text textTransform='uppercase' fontWeight='bold'>
                    <Icon as={Flower} /> {actionTitle}
                  </Text> */}
              <Text color='gray.500' mt={3} fontSize={{ base: 'sm', md: 'md' }}>
                {content?.data[0]?.feed?.summary?.replace(/<[^>]*>/g, '')}
              </Text>
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
