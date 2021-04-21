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
import FetchCard from 'components/FetchCard'

export default function Gallery({
  farmfeeds,
  farmFeedsIsLoading,
  farmFeedsHasError
}) {
  return (
    <Grid
      templateRows='repeat(1 1fr)'
      pos='relative'
      fontFamily='body'
      fontSize={{ md: 'md' }}
      d={{ base: 'block', md: 'grid' }}
    >
      <GridItem>
        <Box
          minW={{ lg: '95%' }}
          as='main'
          color='gray.800'
          fontFamily='body'
          overflowX='hidden'
          py={{ md: 56 }}
          minH={{ lg: '100vh' }}
          px={{ base: 4, md: 20 }}
        >
          {farmFeedsIsLoading || farmFeedsHasError ? (
            <FetchCard
              w='100%'
              direction='column'
              align='center'
              justify='center'
              mx='auto'
              // FIX ME
              reload={null}
              loading={farmFeedsIsLoading}
              error={farmFeedsHasError}
              text='Standby as we load your gallery'
            />
          ) : (
            <Grid
              templateColumns={{ md: 'repeat(2, 1fr)' }}
              gap={20}
              mt={{ base: 40, md: 0 }}
              mb={{ base: 16, md: 0 }}
            >
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

          {farmfeeds?.length === 0 && !farmFeedsIsLoading && (
            <Flex
              w='100%'
              justify='center'
              align='center'
              direction='column'
              py={{ md: 40 }}
              h={{ base: '100vh', md: '100%' }}
            >
              <Image src={Gal} py={{ base: 6, md: 10 }} />
              <Heading
                as='h6'
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight={800}
                mb={{ md: 5 }}
              >
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
  farmFeedsIsLoading: PropTypes.bool.isRequired,
  farmFeedsHasError: PropTypes.any
}
