import React from 'react'
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { IoEllipsisVertical } from 'react-icons/io5'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/lazy'

const MotionFlex = motion(Flex)

export default function ImageGallery({ title, farmfeeds, activityName }) {
  const [images, setImages] = React.useState([])
  const [selectedImage, setSelectedImage] = React.useState({})
  const [activeIndex, setActiveIndex] = React.useState(0)
  const mapKey = i => i
  const handleClick = value => {
    const comparant =
      activeIndex + value === 0 ||
      activeIndex + value > images.length - 1 ||
      activeIndex + value < 0
        ? 0
        : activeIndex + value

    setActiveIndex(comparant)
    setSelectedImage(images[comparant])
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
      farmfeeds?.forEach(feed => {
        return _feeds(feed?.feed)
      })
    feeds()

    setImages(array)
    setSelectedImage(array[0])
  }, [farmfeeds, activityName])
  return (
    <Box>
      <Flex align='center' justify='space-between'>
        <Text fontWeight={800}>{title}</Text>
        <Box>
          <Icon as={IoEllipsisVertical} />
        </Box>
      </Flex>

      <Box mt={6}>
        <Box pos='relative' overflow='hidden'>
          {selectedImage?.type === 'image' && (
            <Image
              rounded='lg'
              h={{ md: 85 }}
              w='100%'
              objectFit='cover'
              src={selectedImage?.url}
            />
          )}

          {selectedImage?.type === 'video' && (
            <YoutubeSlide url={selectedImage?.url} muted playing={false} />
          )}
          <Flex
            align='center'
            justify='center'
            pos='absolute'
            bottom={6}
            left={{ base: '20%', md: '45%' }}
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
              onClick={() => handleClick(-1)}
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
              color='cf.800'
              bg='white'
              ml={2}
              onClick={() => handleClick(+1)}
            >
              <Icon as={BsChevronRight} />
            </Flex>
          </Flex>
        </Box>

        <MotionFlex pos='relative' w={120} mt={4} overflowX='scroll'>
          {images.map((item, index) => (
            <Box
              key={mapKey(index)}
              as='button'
              role='button'
              aria-label='image button'
              onClick={() => {
                setSelectedImage(item)
                setActiveIndex(index)
              }}
              mr={6}
              borderWidth={activeIndex === index ? 4 : 0}
              rounded='md'
              borderColor='cf.800'
            >
              <Image
                h={20}
                w={{ base: 32, md: 32 }}
                objectFit='cover'
                rounded='md'
                src={item.url}
              />
            </Box>
          ))}
        </MotionFlex>
      </Box>
    </Box>
  )
}

ImageGallery.propTypes = {
  title: PropTypes.string,
  farmfeeds: PropTypes.array.isRequired,
  activityName: PropTypes.string.isRequired
}
