import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import useComponent from 'context/component'

import FarmDetails from 'components/StartFarmProcess/CropSelection/FarmDetails'

const HomeEmptyState = () => {
  const { step, handleNext } = useComponent()
  const history = useHistory()

  return (
    <Box textAlign='center' px={{ md: 16 }}>
      <Box py={{ md: 16 }}>
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

      <FarmDetails
        handleNext={() => {
          handleNext()
          !step && history.push('/start-farm/individual')
        }}
        query={{}}
      />
    </Box>
  )
}

export default HomeEmptyState
