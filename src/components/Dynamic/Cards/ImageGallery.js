import React from 'react'
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import { IoEllipsisVertical } from 'react-icons/io5'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const MotionFlex = motion.custom(Flex)

export default function ImageGallery({
  title,
  images,
  selectedImage,
  setSelectedImage
}) {
  return (
    <Box>
      <Flex align='center' justify='space-between'>
        <Text fontWeight={800}>{title}</Text>
        <Box>
          <Icon as={IoEllipsisVertical} />
        </Box>
      </Flex>

      <Box mt={6}>
        <Box pos='relative'>
          <Image
            rounded='lg'
            h={{ md: 85 }}
            w='100%'
            objectFit='cover'
            src={require(`../../../assets/images/${selectedImage.img}`).default}
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
              // onClick={() => handleClick(-1)}
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
              // onClick={() => handleClick(+1)}
            >
              <Icon as={BsChevronRight} />
            </Flex>
          </Flex>
        </Box>

        <MotionFlex pos='relative' minW={120} mt={4}>
          {images.map(item => (
            <Box
              as='button'
              role='button'
              aria-label='image button'
              onClick={() => setSelectedImage(item)}
              mr={6}
              key={item.id}
              borderWidth={selectedImage.id === item.id ? 4 : 0}
              rounded='md'
              borderColor='cf.400'
            >
              <Image
                h={20}
                w={32}
                objectFit='cover'
                rounded='md'
                src={require(`../../../assets/images/${item.img}`).default}
              />
            </Box>
          ))}
        </MotionFlex>
      </Box>
    </Box>
  )
}

ImageGallery.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  selectedImage: PropTypes.object,
  setSelectedImage: PropTypes.func
}
