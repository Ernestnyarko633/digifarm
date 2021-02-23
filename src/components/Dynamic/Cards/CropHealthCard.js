import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  Text
} from '@chakra-ui/react'
import React from 'react'

const CropHealthCard = () => {
  return (
    <Grid
      templateColumns={{ md: 'repeat(3, 1fr)' }}
      gap={4}
      bg='white'
      rounded='xl'
      filter='drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.1))'
      p={6}
    >
      <Box>
        <Text mb={4} fontSize='sm'>
          Plant population
        </Text>
        <CircularProgress value={40} size='100px' color='cf.400'>
          <CircularProgressLabel rounded='lg'>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box>
        <Text mb={4} fontSize='sm'>
          Plant health
        </Text>
        <CircularProgress value={40} size='100px' color='cf.400'>
          <CircularProgressLabel rounded='lg'>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box>
        <Text mb={4} fontSize='sm'>
          Growing stage
        </Text>
        <CircularProgress value={40} size='100px' color='cf.400'>
          <CircularProgressLabel rounded='lg'>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box>
        <Text mb={4} fontSize='sm'>
          Crop productivity
        </Text>
        <CircularProgress value={40} size='100px' color='cf.400'>
          <CircularProgressLabel rounded='lg'>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box>
        <Text mb={4} fontSize='sm'>
          Chlorophyl index
        </Text>
        <CircularProgress value={40} size='100px' color='cf.400'>
          <CircularProgressLabel rounded='lg'>40%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Grid>
  )
}

export default CropHealthCard
