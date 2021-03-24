import React from 'react'
import { Box, Button, Heading, Icon, Image, Link, Text } from '@chakra-ui/react'
import CorporateIllustration from '../../assets/images/emptystate/corporate.png'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link as ReachLink } from 'react-router-dom'

const FarmsEmptyState = () => {
  return (
    <Box bg='rgba(155, 155, 155, 0.1)'>
      <Box bg='rgba(155, 155, 155, 0.1)' p={{ md: 10 }}>
        <Box textAlign='center'>
          <Heading as='h3' fontSize={{ md: '3xl' }} mt={{ md: 6 }} mb={4}>
            You currently have no farm(s)
          </Heading>
          <Text>
            Start a farm as an individual or a cooperative and earn long term
            rewards
          </Text>
        </Box>

        <Box my={{ md: 10 }} textAlign='center'>
          <Link _hover={{ textDecor: 'none' }} color='cf.400' d='block' mb={4}>
            Learn more <Icon as={MdKeyboardArrowRight} />
          </Link>

          <Link as={ReachLink} _hover={{ textDecor: 'none' }} to='/start-farm'>
            <Button
              colorScheme='linear'
              rounded='30px'
              w={64}
              h={12}
              shadow='md'
            >
              Start a farm
            </Button>
          </Link>
        </Box>

        <Box mx='auto' w={{ md: '50%' }} my={{ md: 16 }}>
          <Image src={CorporateIllustration} />
        </Box>
      </Box>
    </Box>
  )
}

export default FarmsEmptyState
