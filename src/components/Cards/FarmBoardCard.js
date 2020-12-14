import React from 'react'
import {
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
//import Bitmap from 'assets/images/Bitmap.png'

import { MdFavoriteBorder } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'
import Button from 'components/Button'
import { Fragment } from 'react'

const FarmBoardCard = ({
  w,
  mr,
  ml,
  btntitle,
  buttonColor,
  buttonWidth,
  buttonMl,
  buttonMr,
  buttonColorScheme,
  likeCount,
  levelColor,
  postImageAlt,
  headingImageAlt,
  datePosted,
  level,
  whoseFarm,
  farmLocation,
  headingText,
  headingIcon,
  headingImage,
  postType,
  postContentText,
  postImage,
  buttonLabel,
  redesign,
  children,
  AvatarSRC,
  ...rest
}) => {
  return (
    <Box w={{ md: '100%' }}>
      <Flex justify='center' align='center'>
        <Box rounded='lg'
          bg='white'
          mr={mr}
          ml={ml}
          w={{ md: w || '80%' }}
          boxShadow='0px 0px 15px 5px #ccc'
          {...rest}>
          {redesign ? (
            { children }
          ) : (
            <Fragment>
              <Box p={5} w='100%'>
                <Flex direction='row' align='center' justify='space-around'>
                  <Box>
                    <Flex direction='row' align='center'>
                      <Avatar src={AvatarSRC} alt='noname' mr={6} />
                      <Box pos='relative' mr={6}>
                        <Heading as='h6' fontSize='lg'>
                          {whoseFarm}
                        </Heading>
                        <Text fontSize='sm' color='rgba(155, 155, 155, 0.8)'>
                          {farmLocation}
                        </Text>
                      </Box>
                      <Flex rounded={15}
                        mb={5}
                        bg='rgba(155, 155, 155, 0.2)'
                        minW={10}
                        align='center'
                        justify='center'>
                        <Text color={levelColor || 'cf.400'} fontSize='sm'>
                          Lv {level}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Box>
                    <Box>
                      <Text fontSize='sm' color='rgba(155, 155, 155, 0.8)'>
                        {datePosted}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Divider borderColor='gray.300' w />
              <Box p={5}>
                <Flex pr={25}
                  pl={25}
                  direction='column'
                  align='center'
                  w='100%'>
                  <Box pl={10}>
                    <Flex justify='space-between' w='70%'>
                      <Flex direction='row'>
                        {headingImage ? (
                          <Image src={headingImage}
                            alt={headingImageAlt}
                            boxSize={5}
                            mr={5} />
                        ) : (
                          <Icon as={headingIcon} mr={5} boxSize={5} />
                        )}
                        <Heading as='h4' fontSize='lg'>
                          {headingText}
                        </Heading>
                      </Flex>
                      <Flex align='center' justify='center'>
                        <Box pos='relative'>
                          <Flex rounded={15}
                            pr={5}
                            pl={5}
                            mb={5}
                            bg='rgba(155, 155, 155, 0.2)'
                            minW={10}
                            align='center'
                            justify='center'>
                            <Text color='cf.400' fontSize='sm'>
                              {postType}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                    <Grid templateColumns={{
                        md: btntitle ? 'repeat(2, 1fr)' : 'repeat(1, 1fr',
                      }}>
                      <Text color='gray.500' fontSize='sm'>
                        {postContentText}
                      </Text>
                      {btntitle ? (
                        <Flex align='center' justify='center'>
                          <Button w={buttonWidth}
                            mr={buttonMr}
                            ml={buttonMl}
                            btntitle={btntitle}
                            colorScheme={buttonColorScheme}
                            color={buttonColor} />
                        </Flex>
                      ) : null}
                    </Grid>
                  </Box>
                </Flex>
              </Box>
              {postImageAlt ? (
                <Box>
                  <Image minW='100%' src={postImage} alt={postImageAlt} />
                </Box>
              ) : null}
              <Box>
                <Box p={15}>
                  <Flex direction='row'
                    align='center'
                    justify='flex-start'
                    pl={10}>
                    <Flex align='center' justify='center' mr={2}>
                      <Icon boxSize={8} as={MdFavoriteBorder} mr={2} />
                      <Text fontSize='xs' color='gray.400'>
                        {likeCount}
                      </Text>
                    </Flex>
                    <Icon boxSize={8} as={RiShareForwardLine} />
                  </Flex>
                </Box>
              </Box>
            </Fragment>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default FarmBoardCard
