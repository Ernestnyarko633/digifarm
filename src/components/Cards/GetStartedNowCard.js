import React from 'react'
import { Box, Button, Heading, Icon, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import CorporateIllustration from '../../assets/images/emptystate/corporate.png'

const GetStartedNowCard = () => (
  <Box p={{ base: 4, md: 16 }} bg='#ECECEC' mt={{ base: 16, md: 0 }}>
    <Box textAlign='center'>
      <Heading as='h3' fontSize={{ base: 'xl', md: '3xl' }} mt={6}>
        We are connecting the world through agriculture
      </Heading>
      <Text>
        Be part of a cooperative where you can connect to people around the
        <Box as='br' d={{ base: 'none', md: 'block' }} />
        world and co-own a farm in Africa.
      </Text>
    </Box>

    <Box my={{ md: 10 }} textAlign='center'>
      <Link _hover={{ textDecor: 'none' }} color='cf.400' d='block' mb={4}>
        Learn more <Icon as={MdKeyboardArrowRight} />
      </Link>

      <Link as={ReachLink} _hover={{ textDecor: 'none' }} to='#'>
        <Button
          colorScheme='linear'
          rounded='30px'
          w={{ base: 56, md: 64 }}
          h={12}
          shadow='md'
          disabled
        >
          Get me started now
        </Button>
      </Link>
    </Box>

    <Box mx='auto' w={{ md: '80%' }} my={{ md: 16 }}>
      <Image src={CorporateIllustration} />
    </Box>
  </Box>
)

export default GetStartedNowCard
