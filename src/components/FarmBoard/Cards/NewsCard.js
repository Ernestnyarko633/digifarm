/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { Box, Flex, Heading, Text, Image, Collapse } from '@chakra-ui/react'
import ReactPlayer from 'react-player/lazy'
import { urlify } from 'helpers/misc'
//import { urlify } from 'helpers/misc'
const NewsCard = ({ timestamp, content, status }) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

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
          {timestamp}
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
        <Box>
          {content?.data?.body[0]?.primary?.image?.url ? (
            <Image
              w='100%'
              h={{ md: 90 }}
              objectFit='cover'
              src={content?.data?.body[0]?.primary?.image?.url}
            />
          ) : (
            <YoutubeSlide url={content?.data?.body[0]?.primary?.video?.url} />
          )}
        </Box>
        <Box py={4} px={{ base: 4, md: 10 }}>
          <Box mt={6}>
            <Heading as='h5' fontSize={{ md: 'lg' }}>
              {content?.data?.headline[0]?.text}
            </Heading>
            <Collapse startingHeight={85} in={show} cursor='pointer'>
              {content?.data?.body[0]?.primary?.description?.map(item => (
                <>
                  <Text
                    color='gray.500'
                    mt={3}
                    key={item.text}
                    dangerouslySetInnerHTML={{ __html: urlify(item.text) }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </>
              ))}
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
  timestamp: PropTypes.any,
  content: PropTypes.any,
  status: PropTypes.any
}

export default NewsCard
