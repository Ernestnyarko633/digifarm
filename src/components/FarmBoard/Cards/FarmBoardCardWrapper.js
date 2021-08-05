import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BsHeart } from 'react-icons/bs'
import { texTrancator } from 'helpers/misc'
import { FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { RiCloseFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share'

const MotionFlex = motion(Flex)

const FarmBoardCardWrapper = ({ children, status, content, ref }) => {
  const arrayToString = (array = ['']) => {
    let aneow = []
    array.forEach(text => aneow.push(text.text))

    const string = aneow.join()
    return string.replace(/,/g, '')
  }

  const [show, setShow] = React.useState(false)
  const [data, setData] = React.useState({
    url: '',
    title: '',
    quote: ''
  })

  React.useEffect(() => {
    let mounted = true
    const shareData = () => {
      status === 'news'
        ? setData({
            url: window.location.href,
            title: content?.data?.headline[0]?.text,
            quote:
              texTrancator(
                100,
                arrayToString(content?.data?.body[0]?.primary?.description)
              ) + '... https://digitalfarmer.completefarmer.com' ||
              content?.data?.body[0]?.primary?.description[0]?.text
          })
        : status === 'weekly_videos'
        ? setData({
            url: window.location.href,
            title: content?.data?.body[0].items[0].weekly_video.author_name,
            quote: `Check out Complete Farmer's Youtube Channel ${content?.data?.body[0].items[0].weekly_video.author_url}`
          })
        : setData({
            url: window.location.href,
            title: content?.title,
            quote: content?.description
          })
    }
    if (mounted) shareData()
    return () => (mounted = false)
  }, [
    content?.data?.body,
    content?.data?.headline,
    content?.description,
    content?.title,
    status
  ])

  return (
    <Box
      ref={ref}
      rounded='xl'
      w={{ base: 82, md: '550px', xl: 125 }}
      mx='auto'
      ml={{ md: 0, lg: 16, xl: 0 }}
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
          md: 3
        }}
        px={{ base: 4, md: 3 }}
      >
        {status !== 'news' && status !== 'weekly_videos' && false && (
          <Flex>
            <Text color='cf.green'>123</Text>
          </Flex>
        )}

        <Flex
          justify='flex-end'
          textAlign='right'
          w='100%'
          ml={{ md: 6 }}
          cursor='pointer'
        >
          {status !== 'news' && status !== 'weekly_videos' && false && (
            <Box>
              <Icon
                //onClick={() => handleLike()}
                color='cf.green'
                as={BsHeart}
                mr={2}
                boxSize={5}
              />
            </Box>
          )}
          <Flex pos='relative' align='center'>
            <AnimatePresence>
              {show && (
                <MotionFlex
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: 1,
                    width: '11rem',
                    transition: { duration: 0.4 }
                  }}
                  exit={{ opacity: 0, width: 0, transition: { duration: 0.4 } }}
                  align='center'
                  justify='center'
                  bg='cf.green'
                  color='white'
                  rounded='3xl'
                  w={40}
                  h={10}
                  pos='absolute'
                  right={0}
                  pr={8}
                >
                  <FacebookShareButton
                    url={data.url}
                    title={data.title}
                    quote={data.quote}
                  >
                    <Icon
                      as={FaFacebookF}
                      boxSize={5}
                      onClick={() => setShow(false)}
                    />
                  </FacebookShareButton>

                  <LinkedinShareButton
                    url={data.url}
                    title={data.title}
                    source={data.url}
                  >
                    <Icon
                      as={FaLinkedinIn}
                      boxSize={5}
                      mx={3}
                      onClick={() => setShow(false)}
                    />
                  </LinkedinShareButton>

                  <TwitterShareButton
                    title={data.title || 'This is a feed from complete farmer'}
                    url={data.url}
                    via={`completefarmer ${data.quote}`}
                    related={['@completefarmer']}
                  >
                    <Icon
                      as={FaTwitter}
                      boxSize={5}
                      onClick={() => setShow(false)}
                    />
                  </TwitterShareButton>
                </MotionFlex>
              )}
            </AnimatePresence>
            <Flex
              align='center'
              justify='center'
              w={10}
              h={10}
              rounded='100%'
              bg='cf.green'
              color='white'
              filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
              borderWidth={1}
              borderColor='cf.green'
              onClick={() => setShow(!show)}
            >
              <Icon as={show ? RiCloseFill : AiOutlineShareAlt} boxSize={6} />
            </Flex>
          </Flex>
          {/*<Icon*/}
          {/*  boxSize={6}*/}
          {/*  color="cf.green"*/}
          {/*  as={AiOutlineShareAlt}*/}
          {/*  onClick={*/}
          {/*    () =>*/}
          {/*      handleModalClick(*/}
          {/*        "share",*/}
          {/*        status === "news"*/}
          {/*          ? {*/}
          {/*              url: window.location.href,*/}
          {/*              title: content?.data?.headline[0]?.text,*/}
          {/*              quote:*/}
          {/*                texTrancator(*/}
          {/*                  100,*/}
          {/*                  arrayToString(*/}
          {/*                    content?.data?.body[0]?.primary?.description*/}
          {/*                  )*/}
          {/*                ) + "... https://digitalfarmer.completefarmer.com" ||*/}
          {/*                content?.data?.body[0]?.primary?.description[0]?.text,*/}
          {/*            }*/}
          {/*          : status === "weekly_videos"*/}
          {/*          ? {*/}
          {/*              url: window.location.href,*/}
          {/*              title:*/}
          {/*                content?.data?.body[0].items[0].weekly_video*/}
          {/*                  .author_name,*/}
          {/*              quote: `Check out Complete Farmer's Youtube Channel ${content?.data?.body[0].items[0].weekly_video.author_url}`,*/}
          {/*            }*/}
          {/*          : {*/}
          {/*              url: window.location.href,*/}
          {/*              title: content?.title,*/}
          {/*              quote: content?.description,*/}
          {/*            }*/}
          {/*      )*/}
          {/*    // eslint-disable-next-line react/jsx-curly-newline*/}
          {/*  }*/}
          {/*/>*/}
        </Flex>
      </Flex>
    </Box>
  )
}

FarmBoardCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.any,
  ref: PropTypes.any,
  content: PropTypes.any
}

export default FarmBoardCardWrapper
