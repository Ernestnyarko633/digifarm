import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
  Grid
} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'

const CropHealthCard = ({ eosStat, _error, date }) => {
  const health = value => {
    if (value >= 0.2 && value <= 1.0) return true
    return false
  }
  return (
    <React.Fragment>
      <Box w='100%' py={{ md: 5 }}>
        <Flex w='100%' justify='flex-end'>
          <Text>{new Date(date).toLocaleDateString()}</Text>
        </Flex>
        <Grid
          templateColumns={{ md: 'repeat(3, 1fr)' }}
          gap={4}
          bg='white'
          rounded='xl'
          filter='drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.1))'
          p={6}
        >
          {/* <Box>
            <Text mb={4} fontSize='sm'>
              Plant population
            </Text>
            <CircularProgress
              value={(eosStat?.indexes?.NDVI?.average * 100).toFixed(0)}
              size='100px'
              color='cf.400'
            >
              <CircularProgressLabel rounded='lg'>
                {(eosStat?.indexes?.NDVI?.average).toFixed(2)}
              </CircularProgressLabel>
            </CircularProgress>
          </Box> */}

          <Box>
            <Text mb={4} fontSize='sm'>
              Plant health
            </Text>
            <CircularProgress
              value={(eosStat?.indexes?.EVI?.average * 100).toFixed(0)}
              size='100px'
              color={
                health(eosStat?.indexes?.EVI?.average) ? 'cf.400' : '#ff0000'
              }
            >
              <CircularProgressLabel rounded='lg'>
                {(eosStat?.indexes?.EVI?.average).toFixed(2)}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>

          {/* <Box>
        <Text mb={4} fontSize='sm'>
          Growing stage
        </Text>
        <CircularProgress
          value={(eosStat?.indexes?.NDVI?.average * 100).toFixed(0)}
          size='100px'
          color='cf.400'
        >
          <CircularProgressLabel rounded='lg'>
            {(eosStat?.indexes?.NDVI?.average * 100).toFixed(0)}
          </CircularProgressLabel>
        </CircularProgress>
      </Box> */}

          <Box>
            <Text mb={4} fontSize='sm'>
              Crop productivity
            </Text>
            <CircularProgress
              value={(eosStat?.indexes?.NDVI?.average * 100).toFixed(0)}
              size='100px'
              color='cf.400'
            >
              <CircularProgressLabel rounded='lg'>
                {(eosStat?.indexes?.NDVI?.average).toFixed(2)}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>

          <Box>
            <Text mb={4} fontSize='sm'>
              Chlorophyl index
            </Text>
            <CircularProgress
              value={(eosStat?.indexes?.NDVI?.average * 100).toFixed(0)}
              size='100px'
              color='cf.400'
            >
              <CircularProgressLabel rounded='lg'>
                {(eosStat?.indexes?.NDVI?.average).toFixed(2)}
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

CropHealthCard.propTypes = {
  eosStat: PropTypes.any,
  _error: PropTypes.any,
  date: PropTypes.string
}
export default CropHealthCard
