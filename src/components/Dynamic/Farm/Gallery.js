import React from 'react'
import { Box, Flex, Grid, GridItem, Icon } from '@chakra-ui/react'

import { Weather, Calendar, Crop, FarmSchedule, Updates } from 'theme/Icons'
import ImageGallery from '../Cards/ImageGallery'

const menus = [
  { id: 1, icon: Calendar, state: 'compA' },
  { id: 2, icon: Weather, state: 'compB' },
  { id: 3, icon: Crop, state: 'compC' },
  { id: 4, icon: FarmSchedule, state: 'compD' },
  { id: 5, icon: Updates, state: 'compE' }
]

const images = [
  { id: 1, img: 'Bitmap.png' },
  { id: 2, img: 'Bitmap.png' },
  { id: 3, img: 'Bitmap.png' },
  { id: 4, img: 'Bitmap.png' },
  { id: 5, img: 'Bitmap.png' }
]

// const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState(images[0])
  // const [currentSlide, setCurrentSlide] = React.useState(images[0].id)

  // const handleClick = direction => {
  //   setCurrentSlide(prevState => {
  //     return (images.length + prevState + direction) % images.length
  //   })
  // }

  return (
    <Grid
      templateRows='repeat(1 1fr)'
      templateColumns='5% 95%'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
      <GridItem>
        <Box
          as='aside'
          pos='fixed'
          bottom={0}
          left={0}
          h={{ lg: '84vh' }}
          w={{ md: '5%' }}
          bg='white'
          zIndex={50}
          pt={10}
          shadow='md'
          px={{ md: 8 }}
          color='gray.600'
        >
          <Box as='ul'>
            {menus.map(item => (
              <Flex
                as='button'
                role='button'
                aria-label={`${item.icon} button`}
                key={item.id}
                align='center'
                pb={6}
              >
                <Icon as={item.icon} />
              </Flex>
            ))}
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          minW={{ lg: '95%' }}
          as='main'
          color='gray.800'
          bg='gray.50'
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          px={{ md: 24 }}
          minH={{ lg: '100vh' }}
        >
          <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={20}>
            <ImageGallery
              title='Land preparation'
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <ImageGallery
              title='Harrowing'
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <ImageGallery
              title='Planting'
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </Grid>
        </Box>
      </GridItem>
    </Grid>
  )
}
