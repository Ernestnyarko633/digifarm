import React from 'react'
import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  Flex
} from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import CorporateIllustration from '../../assets/images/emptystate/corporate.png'

const GetStartedNowCard = () => (
  <Box
    bg='#ECECEC'
    px={{ base: 4, md: 16 }}
    pt={{ base: 4, md: 16 }}
    pb={{ base: 16 }}
    mt={{ base: 16, md: 0 }}
  >
    <Box textAlign='center'>
      <Heading as='h3' fontSize={{ base: 'xl', md: '3xl' }} mt={6}>
        We are connecting the world through agriculture
      </Heading>
      <Text fontSize={{ base: 'sm', md: 'md' }}>
        Be part of a cooperative where you can connect to people around the
        <Box as='br' d={{ base: 'none', md: 'block' }} />
        world and co-own a farm in Africa.
      </Text>
    </Box>

    <Box my={{ md: 4 }} textAlign='center'>
      <Link
        _hover={{ textDecor: 'none' }}
        fontSize={{ base: 'sm', md: 'md' }}
        color='cf.800'
        d='block'
        mb={4}
      >
        Learn more <Icon as={MdKeyboardArrowRight} />
      </Link>

      <Link as={ReachLink} _hover={{ textDecor: 'none' }} to='/start-farm'>
        <Button
          colorScheme='linear'
          rounded='30px'
          fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          px={{ base: 5, md: 8 }}
          py={{ md: 7 }}
          shadow='md'
        >
          Get me started now
        </Button>
      </Link>
    </Box>

    <Flex mx='auto' align='center' justify='center' my={{ base: 4, md: 16 }}>
      <Image src={CorporateIllustration} />
    </Flex>
  </Box>
)

export default GetStartedNowCard
