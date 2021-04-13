import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiOutlineShareAlt } from 'react-icons/ai'
import useComponent from 'context/component'
import { BsHeart } from 'react-icons/bs'

const FarmBoardCardWrapper = ({ children, status, content }) => {
  const { handleModalClick } = useComponent()
  //   const [isLiked, setIsLiked ] = React.useState(false)

  //   const handleLike = () => {

  //   }
  return (
    <Box
      rounded='xl'
      w={{ base: 82, md: '80%' }}
      mx='auto'
      bg='white'
      mb={10}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      {children}
      <Flex
        align='center'
        py={{
          base: 4,
          md: status !== 'news' && status !== 'weekly_videos' && 6
        }}
        pb={{
          base: 4,
          md: status === 'news' || status === 'action' ? 3 : 3
        }}
        px={{ base: 4, md: 16 }}
      >
        {status !== 'news' && status !== 'weekly_videos' && false && (
          <Flex>
            <Text color='cf.400'>123</Text>
          </Flex>
        )}

        <Flex justify='flex-end' textAlign='right' w='100%' ml={{ md: 6 }}>
          {status !== 'news' && status !== 'weekly_videos' && false && (
            <Box>
              <Icon
                //onClick={() => handleLike()}
                color='cf.400'
                as={BsHeart}
                mr={2}
                boxSize={5}
              />
            </Box>
          )}
          <Icon
            boxSize={6}
            color='cf.400'
            as={AiOutlineShareAlt}
            onClick={
              () =>
                handleModalClick(
                  'share',
                  content?.status === 'news'
                    ? {
                        url: window.location.href,
                        title:
                          content?.data?.body[0]?.primary?.conclusion[0]?.text,
                        quote: `Check out Complete Farmer's Youtube Channel ${content?.data?.body[0].items[0].weekly_video.author_url}`
                      }
                    : content?.status === 'weekly_videos'
                    ? {
                        url: window.location.href,
                        title:
                          content?.data?.body[0].items[0].weekly_video
                            .author_name,
                        quote: `Check out Complete Farmer's Youtube Channel ${content?.data?.body[0].items[0].weekly_video.author_url}`
                      }
                    : {
                        url: window.location.href,
                        title: content?.title,
                        quote: content?.description
                      }
                )
              // eslint-disable-next-line react/jsx-curly-newline
            }
          />
        </Flex>
      </Flex>
    </Box>
  )
}

FarmBoardCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.any,
  content: PropTypes.any
}

export default FarmBoardCardWrapper
