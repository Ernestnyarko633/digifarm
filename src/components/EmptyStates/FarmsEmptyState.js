import React from 'react'
import { Box, Button, Heading, Image, Link, Text } from '@chakra-ui/react'
import CorporateIllustration from '../../assets/images/emptystate/corporate.png'
// import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link as ReachLink } from 'react-router-dom'

const FarmsEmptyState = () => {
  return (
    <Box bg='#F5F5F5'>
      <Box bg='#F5F5F5' p={{ md: 10 }}>
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
