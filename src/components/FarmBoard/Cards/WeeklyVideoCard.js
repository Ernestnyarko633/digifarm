import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Collapse,
  Icon
} from '@chakra-ui/react'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import useAuth from 'context/auth'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const WeeklyVideoCard = ({ activeFarm, status, timestamp, content }) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [activeVideoIndex, setVideoActiveIndex] = React.useState(0)
  const [selectedVideo, setSelectedVideo] = React.useState(
    content?.data?.body[0].items[0]
  )

  const _handleClick = value => {
    const comparant =
      activeVideoIndex + value === 0 ||
      activeVideoIndex + value > content?.data?.body[0].items.length - 1 ||
      activeVideoIndex + value < 0
        ? 0
        : activeVideoIndex + value

    setVideoActiveIndex(comparant)
    setSelectedVideo(content?.data?.body[0].items[comparant])
  }

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Avatar
          size='md'
          src={activeFarm?.order?.product?.cropVariety?.imageUrl}
        />
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            {`${user?.firstName}'s farm`}
          </Heading>
          <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
            {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text color='gray.500'>{timestamp}</Text>
      </Box>
    </Flex>
  )

  return (
    <FarmBoardCardWrapper status={status}>
      <Box>
        <Box pt={{ base: 4, md: 8 }} pb={2} px={{ base: 4, md: 16 }}>
          <NewHead />
        </Box>
        <Box as='video' w='100%' h={{ md: 90 }} autoPlay loop controls>
          <Box
            as='source'
            w='100%'
            h={{ md: 90 }}
            objectFit='cover'
            src={selectedVideo?.weekly_video?.embed_url}
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
              onClick={() => _handleClick(-1)}
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
              onClick={() => _handleClick(+1)}
            >
              <Icon as={BsChevronRight} />
            </Flex>
          </Flex>
        </Box>
        <Box py={4} px={{ base: 4, md: 10 }}>
          <Box mt={6}>
            <Heading as='h5' fontSize={{ md: 'lg' }}>
              {selectedVideo?.weekly_video?.author_name}
            </Heading>
            <Collapse
              startingHeight={85}
              in={show}
              onClick={handleToggle}
              cursor='pointer'
            >
              <Text
                color='gray.500'
                mt={3}
                //key={item.text}
                fontSize={{ base: 'sm', md: 'md' }}
              >
                {selectedVideo?.weekly_video?.title}
              </Text>
            </Collapse>
          </Box>
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
