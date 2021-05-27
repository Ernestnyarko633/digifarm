/* eslint-disable no-console */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Collapse,
  Icon
} from '@chakra-ui/react'
import ReactPlayer from 'react-player/lazy'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
// import { urlify } from 'helpers/misc'

const NewsCard = ({ content, status }) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)
  const [items, setItems] = React.useState([])
  const [selectedItem, setSelectedItem] = React.useState({})
  const [activeIndex, setActiveIndex] = React.useState(0)

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

  useEffect(() => {
    let array = []
    let temp = content?.data?.body || []

    const slice = () => temp.forEach(item => array.push(item))

    slice()

    if (array.length) {
      setItems(array)
      setSelectedItem(array[0])
    }
  }, [content?.data?.body])

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            Weekly News
          </Heading>
        </Box>
      </Flex>

      <Flex direction='column' justify='center' align='center'>
        <Box mx={{ base: 4 }}>
          <Text color='cf.800' fontWeight={700}>
            {status === 'news' ? status.toUpperCase() : null}
          </Text>
        </Box>
        <Text color='gray.500' fontSize={{ base: 'xs', md: 'sm' }} mt={-1}>
          {new Date(content?.first_publication_date)?.toLocaleDateString()}
        </Text>
      </Flex>
    </Flex>
  )

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <Box>
        <Box pt={{ base: 4 }} pb={2} px={{ base: 4, md: 8 }}>
          <NewHead />
        </Box>
        <Box pos='relative'>
          {selectedItem?.slice_type !== 'video' && (
            <Image
              h={{ md: 85 }}
              w='100%'
              objectFit='cover'
              src={selectedItem?.primary?.image?.url}
            />
          )}

          {selectedItem?.slice_type === 'video' && (
            <YoutubeSlide
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
                  background: 'cf.800',
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
                  background: 'cf.800',
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
        <Box py={4} px={{ base: 4, md: 10 }}>
          <Box mt={6}>
            <Heading as='h5' fontSize={{ md: 'lg' }}>
              {content?.data?.headline[0]?.text}
            </Heading>
            <Collapse
              startingHeight={85}
              in={show}
              cursor='pointer'
              onClick={handleToggle}
            >
              {content?.data?.body?.map((details, index) => (
                <>
                  {index > 0 && (
                    <Box p={15}>
                      <Image
                        h={{ md: 85 }}
                        w='100%'
                        objectFit='cover'
                        src={details?.primary?.image?.url}
                      />
                    </Box>
                  )}
                  {details?.slice_type === 'details' &&
                    details?.primary?.description?.map(item => (
                      <>
                        <Text
                          color='gray.500'
                          mt={3}
                          key={item.text}
                          dangerouslySetInnerHTML={{
                            __html: item.text
                          }}
                          fontSize={{ base: 'sm', md: 'md' }}
                        />
                      </>
                    ))}
                </>
              ))}
              {/* {content?.data?.body[0]?.primary?.description?.map(item => (
                <>
                  <Text
                    color='gray.500'
                    mt={3}
                    key={item.text}
                    dangerouslySetInnerHTML={{ __html: urlify(item.text) }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </>
              ))} */}
            </Collapse>
            <Box as='button' onClick={handleToggle}>
              <Text color='cf.800' py={{ base: 1 }}>
                {!show ? 'Read More' : 'Collapse'}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </FarmBoardCardWrapper>
  )
}

NewsCard.propTypes = {
  activeFarm: PropTypes.object,
  content: PropTypes.any,
  status: PropTypes.any
}

export default NewsCard
