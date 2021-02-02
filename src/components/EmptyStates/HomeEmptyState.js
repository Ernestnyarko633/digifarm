import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import useStartFarm from 'context/start-farm'

import FarmDetails from 'components/StartFarmProcess/CropSelection/FarmDetails'

const HomeEmptyState = () => {
  const { handleNext, isSellOn } = useStartFarm()
  const history = useHistory()

  const handleGoToNext = () => {
    handleNext()
    history.push('/start-farm/individual')
  }

  return (
    isSellOn && (
      <Box textAlign='center' p={{ md: 16 }}>
        <Box pb={{ md: 16 }}>
          <Heading as='h4' fontSize={{ md: 'xl' }}>
            New and exciting crops to start with
          </Heading>
          <Text fontSize='sm'>
            With over 7 crops farmed and over 2,000 trusted
            <br /> digital farmers, we continue to change the world together
            with you
          </Text>
        </Box>

        <Flex align='center' justify='space-between' mb={5}>
          <Text fontSize={{ md: '2xl' }}>Choose a crop to start farming</Text>
        </Flex>

        <FarmDetails catName='Top Selling' handleNext={handleGoToNext} />
      </Box>
    )
  )
}

export default HomeEmptyState
