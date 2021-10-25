import React from 'react'
import { Box, Image, Icon, Flex } from '@chakra-ui/react'
import VideoPlayer from '../../VideoPlayer'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import useNews from '../News/useNews'
import PropTypes from 'prop-types'

const NewsCardButtons = ({ content, loading }) => {
  const {
    selectedItem,
    items,
    setActiveIndex,
    setSelectedItem,
    handleClick,
    activeIndex
  } = useNews({
    content
  })
  return (
    <Box pos='relative'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Image
          h={{ md: 85 }}
          w='100%'
          objectFit='cover'
          src={selectedItem?.image?.url}
        />
      )}

      {selectedItem?.slice_type === 'video' && (
        <VideoPlayer
          url={selectedItem?.primary?.video_url?.embed_url}
          muted
          playing={false}
        />
      )}
      {content?.data?.body?.length > 1 && (
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
              background: 'cf.green',
              color: 'white'
            }}
            rounded='100%'
            color='white'
            outlineColor='none'
            outline='none'
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
      )}
    </Box>
  )
}

NewsCardButtons.propTypes = {
  loading: PropTypes.bool,
  content: PropTypes.any
}

export default NewsCardButtons
