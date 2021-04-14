import 'react-responsive-carousel/lib/styles/carousel.min.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { Carousel } from 'react-responsive-carousel'

//import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import ReactPlayer from 'react-player/lazy'

const WeeklyVideoCard = ({ activeFarm, status, timestamp, content }) => {
  const mapKey = i => i
  const [activeVideoIndex, setVideoActiveIndex] = React.useState(0)

  const YoutubeSlide = ({ url, isSelected }) => (
    <ReactPlayer
      width='100%'
      controls={true}
      loop={true}
      url={url}
      playing={isSelected === activeVideoIndex}
    />
  )
  YoutubeSlide.propTypes = {
    url: PropTypes.any,
    isSelected: PropTypes.any
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

      <Box>
        <Text color='gray.500'>{timestamp}</Text>
      </Box>
    </Flex>
  )

  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  )

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <Box>
        <Box pt={{ base: 4 }} pb={2} px={{ base: 4, md: 8 }}>
          <NewHead />
        </Box>
        <Box w='100%' h={{ md: 90 }}>
          <Carousel
            width='100%'
            autoPlay={false}
            emulateTouch={true}
            showArrows={true}
            showThumbs={true}
            showStatus={false}
            infiniteLoop={true}
            renderItem={customRenderItem}
            onChange={e => setVideoActiveIndex(e)}
          >
            {content?.data?.body[0].items.map((v, i) => {
              return (
                <YoutubeSlide
                  url={v?.weekly_video?.embed_url}
                  muted
                  isSelected={i}
                  playing={false}
                  key={mapKey(i)}
                />
              )
            })}
          </Carousel>
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
