import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import YouTube from 'react-youtube'

const GuideCard = () => {
  const opts = {
    height: '420',
    width: '840',
    margin: 'auto',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  return (
    <Flex
      my={{ md: 32 }}
      w={{ md: '80%' }}
      mx='auto'
      rounded={20}
      justify='space-between'
      flexWrap='wrap'
    >
      <Box>
        <YouTube videoId='oQwlBXImKxU' opts={opts} />
        <Box mt={2}>
          <Heading as='h4' fontSize='lg'>
            How to Sign Up
          </Heading>
          <Text>
            Before you access any feature on the dashboard, you first need to be
            signed up. Check how
          </Text>
        </Box>
      </Box>
      <Box mt={20}>
        <YouTube videoId='oQwlBXImKxU' opts={opts} />
        <Box mt={2}>
          <Heading as='h4' fontSize='lg'>
            How to Sign Up
          </Heading>
          <Text>
            Before you access any feature on the dashboard, you first need to be
            signed up. Check how
          </Text>
        </Box>
      </Box>
      <Box mt={20}>
        <YouTube videoId='oQwlBXImKxU' opts={opts} />
        <Box mt={2}>
          <Heading as='h4' fontSize='lg'>
            How to Sign Up
          </Heading>
          <Text>
            Before you access any feature on the dashboard, you first need to be
            signed up. Check how
          </Text>
        </Box>
      </Box>
      <Box mt={20}>
        <YouTube videoId='oQwlBXImKxU' opts={opts} />
        <Box mt={2}>
          <Heading as='h4' fontSize='lg'>
            How to Sign Up
          </Heading>
          <Text>
            Before you access any feature on the dashboard, you first need to be
            signed up. Check how
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default GuideCard
