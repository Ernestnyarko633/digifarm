import React from 'react'
import { Box, Flex, Avatar, Heading, Text, Icon, Image, Tag } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  Icon,
  Image,
  Grid
} from '@chakra-ui/react'
import { MdFavoriteBorder } from 'react-icons/md'
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin
} from 'react-icons/ai'
import { RiShareForwardLine } from 'react-icons/ri'
import Button from 'components/Button'
import { Fragment } from 'react'
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton
} from 'react-share'

const FarmBoardCard = ({
  status,
  avatar,
  firstName,
  location,
  level,
  timestamp,
  actionTitle,
  actionTag,
  actionText,
  actionBtnTitle
}) => {
  const Detail = () => {
    return (
      <Flex
        justify='space-between'
        align='center'
        borderBottomWidth={1}
        borderBottomColor='gray.200'
        pb={5}
      >
        <Flex align='center'>
          <Avatar size='lg' src={avatar} />
          <Box ml={4}>
            <Heading as='h4' fontSize={{ md: '2xl' }} fontWeight={700}>
              {firstName}’s Farm
            </Heading>
            <Text color='gray.600'>{location}</Text>
          </Box>
          <Box ml={12}>
            <Tag bg='cf.200' color='cf.400' rounded='xl' px={6} fontWeight='bold'>
              {level}
            </Tag>
          </Box>
        </Flex>

        <Box>
          <Text color='gray.500'>{timestamp}</Text>
        </Box>
      </Flex>
    )
  }

  return (
    <Box rounded='xl' w='100%' bg='white' mb={{ md: 10 }} shadow='sm'>
      {status === 'farm' && (
        <>
          <Box py={{ md: status === 'news' || status === 'action' ? 8 : 10 }} px={{ md: 16 }}>
            <Detail />
            <Box mt={6}>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={Flower} /> {actionTitle}
              </Text>
              <Text color='gray.500' mt={3}>
                {actionText}
              </Text>
            </Box>
          </Box>

          <Box>
            <Image w='100%' src={require('../../assets/images/Bitmap.png').default} />
          </Box>
        </>
      )}

      {status === 'news' && (
        <Box py={{ md: status === 'news' || status === 'action' ? 8 : 10 }} px={{ md: 16 }}>
          <Detail />
          <Box mt={6}>
            <Flex>
              <Text textTransform='uppercase' fontWeight='bold'>
                <Icon as={Flower} /> {actionTitle}
              </Text>

              <Box ml={12}>
                <Tag
                  bg='cf.200'
                  color='cf.400'
                  rounded='xl'
                  px={6}
                  fontWeight='bold'
                  textTransform='uppercase'
                >
                  {actionTag}
                </Tag>
              </Box>
              <Divider borderColor='gray.300' w />
              <Box p={5}>
                <Flex
                  pr={25}
                  pl={25}
                  direction='column'
                  align='center'
                  w='100%'
                >
                  <Box pl={10}>
                    <Flex justify='space-between' w='70%'>
                      <Flex direction='row'>
                        {headingImage ? (
                          <Image
                            src={headingImage}
                            alt={headingImageAlt}
                            boxSize={5}
                            mr={5}
                          />
                        ) : (
                          <Icon as={headingIcon} mr={5} boxSize={5} />
                        )}
                        <Heading as='h4' fontSize='lg'>
                          {headingText}
                        </Heading>
                      </Flex>
                      <Flex align='center' justify='center'>
                        <Box pos='relative'>
                          <Flex
                            rounded={15}
                            pr={5}
                            pl={5}
                            mb={5}
                            bg='rgba(155, 155, 155, 0.2)'
                            minW={10}
                            align='center'
                            justify='center'
                          >
                            <Text color='cf.400' fontSize='sm'>
                              {postType}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                    <Grid
                      templateColumns={{
                        md: btntitle ? 'repeat(2, 1fr)' : 'repeat(1, 1fr'
                      }}
                    >
                      <Text color='gray.500' fontSize='sm'>
                        {postContentText}
                      </Text>
                      {btntitle ? (
                        <Flex align='center' justify='center'>
                          <Button
                            w={buttonWidth}
                            mr={buttonMr}
                            ml={buttonMl}
                            btntitle={btntitle}
                            colorScheme={buttonColorScheme}
                            color={buttonColor}
                          />
                        </Flex>
                      ) : null}
                    </Grid>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex align='center'>
              <Box w={{ md: '60%' }} mr={{ md: '10%' }}>
                <Text color='gray.500' mt={3}>
                  {actionText}
                </Text>
              </Box>

              <Box>
                <Box p={15}>
                  <Flex
                    direction='row'
                    align='center'
                    justify='flex-start'
                    pl={10}
                  >
                    <Flex align='center' justify='center' mr={2}>
                      <Icon boxSize={8} as={MdFavoriteBorder} mr={2} />
                      <Text fontSize='xs' color='gray.500'>
                        {likeCount}
                      </Text>
                    </Flex>
                    {/*  */}
                    <Icon
                      boxSize={8}
                      as={RiShareForwardLine}
                      onClick={onOpen}
                    />
                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      mt={10}
                      variant='outline'
                      borderColor='black'
                      borderWidth={5}
                      colorScheme='white'
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <Flex mt={2} mb={3}>
                          <Box ml={10}>
                            <Heading
                              as='h4'
                              fontWeight='bold'
                              fontSize={{ md: 'xl' }}
                            >
                              Share
                            </Heading>
                          </Box>
                          <ModalCloseButton />
                        </Flex>
                        <Divider
                          orientation='horizontal'
                          borderColor='gray.400'
                        />
                        <ModalBody>
                          <Flex direction='row' justify='center' align='center'>
                            <Box
                              as={TwitterShareButton}
                              boxSize={50}
                              title={postContentText}
                              url={shareUrl}
                              via={postContentText}
                            >
                              <Icon boxSize={8} as={AiFillTwitterCircle} />
                            </Box>
                            <Box
                              as={LinkedinShareButton}
                              source={shareUrl}
                              boxSize={50}
                              title={postContentText}
                              url={shareUrl}
                              via={postContentText}
                            >
                              <Icon boxSize={8} as={AiFillLinkedin} />
                            </Box>
                            <Box
                              as={FacebookShareButton}
                              boxSize={50}
                              title={postContentText}
                              url={shareUrl}
                              via={postContentText}
                            >
                              <Icon boxSize={8} as={AiFillFacebook} />
                            </Box>
                          </Flex>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}

      <Flex
        align='center'
        py={{ md: status === 'farm' && 6 }}
        pb={{ md: status === 'news' || status === 'action' ? 6 : 8 }}
        px={{ md: 16 }}
      >
        <Flex>
          <Box>
            <Icon as={BsHeart} mr={2} boxSize={5} />
          </Box>
          <Text>123</Text>
        </Flex>

        <Box ml={{ md: 6 }}>
          <Icon boxSize={6} as={RiShareForwardLine} />
        </Box>
      </Flex>
    </Box>
  )
}

FarmBoardCard.propTypes = {
  status: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  level: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  actionTitle: PropTypes.string.isRequired,
  actionTag: PropTypes.string,
  actionText: PropTypes.string,
  actionBtnTitle: PropTypes.string
}

export default FarmBoardCard
