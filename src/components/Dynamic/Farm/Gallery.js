import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Heading
} from '@chakra-ui/react'
import Gal from 'assets/images/gallery.png'
import ImageGallery from '../Cards/ImageGallery'
import PropTypes from 'prop-types'

export default function Gallery({ farmfeeds, loading }) {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
    >
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
          {!loading && farmfeeds && (
            <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={20}>
              {farmfeeds?.map(_feed => {
                return (
                  <ImageGallery
                    key={_feed._id}
                    title={_feed.title}
                    farmfeeds={_feed?.data}
                    activityName={_feed?.title}
                  />
                )
              })}
            </Grid>
          )}
          {farmfeeds?.length === 0 && !loading && (
            <Flex
              w='100%'
              justify='center'
              align='center'
              direction='column'
              py={{ md: 40 }}
            >
              <Image src={Gal} py={{ md: 10 }} />
              <Heading as='h6' fontSize={18} fontWeight={800} mb={{ md: 5 }}>
                Gallery is empty
              </Heading>
              <Text fontSize='xs'>
                Photos of farm and farm activities will show up here
              </Text>
            </Flex>
          )}
        </Box>
      </GridItem>
    </Grid>
  )
}

Gallery.propTypes = {
  farmfeeds: PropTypes.array.isRequired,
  loading: PropTypes.any
}
