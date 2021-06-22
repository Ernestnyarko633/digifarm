/* eslint-disable no-console */
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

//import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import ReactPlayer from 'react-player/youtube'

const WeeklyVideoCard = ({ status, timestamp, content }) => {
  const [activeVideoIndex, setVideoActiveIndex] = React.useState(0)
  const [selectedVideo, setSelectedVideo] = React.useState(
    content?.data?.body[0].items[0]
  )

  const handleClick = (value, array, index, indexFunc, selectedItemFunc) => {
    const comparant =
      index + value === 0 ||
      index + value > array?.length - 1 ||
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
      SameSite
    />
  )
  YoutubeSlide.propTypes = {
    url: PropTypes.any
  }

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            Weekly Videos
          </Heading>
        </Box>
      </Flex>

      <Flex direction='column' justify='center' align='center'>
        <Box mx={{ base: 4 }}>
          <Text color='cf.green' fontWeight={700}>
            {status ? 'VIDEOS' : null}
          </Text>
        </Box>
        <Text color='gray.500' fontSize={{ base: 'xs', md: 'sm' }} mt={-1}>
          {timestamp}
        </Text>
      </Flex>
    </Flex>
  )

  // const customRenderItem = (item, props) => (
  //   <item.type {...item.props} {...props} />
  // )

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <Box>
        <Box pt={{ base: 4 }} pb={2} px={{ base: 4, md: 8 }}>
          <NewHead />
        </Box>
        <Box w='100%' h={{ md: 90 }}>
          <YoutubeSlide
            url={selectedVideo?.weekly_video?.embed_url}
            muted
            playing={false}
          />
          {content?.data?.body[0].items?.length > 1 ? (
            <Flex
              w='100%'
              align='center'
              justify='space-between'
              pos='absolute'
              bottom={{ base: '50%' }}
              left={{ base: '0%' }}
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
                _hover={{
                  background: 'cf.green',
                  color: 'white'
                }}
                color='white'
                mr={2}
                outlineColor='none'
                outline='none'
                disabled={activeVideoIndex === 0}
                onClick={() => {
                  return handleClick(
                    -1,
                    content?.data?.body[0].items,
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
                _hover={{
                  background: 'cf.green',
                  color: 'white'
                }}
                rounded='100%'
                color='white'
                outlineColor='none'
                outline='none'
                disabled={activeVideoIndex === content?.data?.body[0].items - 1}
                ml={2}
                onClick={() => {
                  return handleClick(
                    +1,
                    content?.data?.body[0].items,
                    activeVideoIndex,
                    setVideoActiveIndex,
                    setSelectedVideo
                  )
                }}
              >
                <Icon as={BsChevronRight} />
              </Flex>
            </Flex>
          ) : null}
        </Box>
      </Box>
    </FarmBoardCardWrapper>
  )
}

WeeklyVideoCard.propTypes = {
  activeFarm: PropTypes.object,
  status: PropTypes.any,
  timestamp: PropTypes.any,
  content: PropTypes.any
}

export default WeeklyVideoCard
