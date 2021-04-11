import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import useStartFarm from 'context/start-farm'

import FarmDetails from 'components/StartFarmProcess/CropSelection/FarmDetails'
import Fade from 'react-reveal/Fade'

const HomeEmptyState = () => {
  const { handleNext, isSellOn } = useStartFarm()
  const history = useHistory()

  const handleGoToNext = () => {
    handleNext()
    history.push('/start-farm/individual')
  }

  return (
    isSellOn && (
      <Box textAlign='center' p={{ base: 6, md: 16 }}>
        <Fade>
          <Box pb={{ base: 12, md: 16 }}>
            <Fade left>
              <Heading
                as='h4'
                fontSize={{ base: 'lg', md: 'xl' }}
                mb={{ base: 4, md: 0 }}
              >
                New and exciting crops to start with
              </Heading>
            </Fade>
            <Fade right>
              <Text fontSize='sm'>
                With over 7 crops farmed and over 2,000 trusted
                <br /> digital farmers, we continue to change the world together
                with you
              </Text>
            </Fade>
          </Box>
        </Fade>

        <Flex
          align='center'
          justify='space-between'
          mb={5}
          mt={{ base: 4, md: 0 }}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }}>
            Choose a crop to start farming
          </Text>
        </Flex>
        <Fade bottom>
          <FarmDetails catName='Top Selling' handleNext={handleGoToNext} />
        </Fade>
      </Box>
    )
  )
}

export default HomeEmptyState
