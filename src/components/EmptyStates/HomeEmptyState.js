import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import CropCategorySelection from 'components/Cards/CropCategorySelection'
import React from 'react'

const HomeEmptyState = () => (
  <Box>
    <Box textAlign='center' px={{ md: 16 }}>
      <Box py={{ md: 20 }}>
        <Heading as='h4' fontSize={{ md: 'xl' }}>
          New and exciting crops to start with
        </Heading>
        <Text fontSize='sm'>
          With over 7 crops farmed and over 2,000 trusted
          <br /> digital farmers, we continue to change the world together with
          you
        </Text>
      </Box>

      <Flex align='center' justify='space-between' mb={5}>
        <Text fontSize={{ md: '2xl' }}>Choose a crop to start farming</Text>
      </Flex>

      <CropCategorySelection />
    </Box>
  </Box>
)

export default HomeEmptyState
