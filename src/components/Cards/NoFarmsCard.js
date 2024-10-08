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

const NoFarmsCard = () => (
  <Flex direction='column' p={{ md: 16 }} bg='cf-dark.300'>
    <Box textAlign='center'>
      <Heading as='h3' fontSize={{ md: '3xl' }} mt={{ md: 6 }}>
        You currently have no farm(s)
      </Heading>
      <Text>
        Start a farm as an individual or a cooperative and earn long term
        rewards
      </Text>
    </Box>

    <Box my={{ md: 10 }} textAlign='center'>
      <Link _hover={{ textDecor: 'none' }} color='cf.green' d='block' mb={4}>
        Learn more <Icon as={MdKeyboardArrowRight} />
      </Link>

      <Link as={ReachLink} _hover={{ textDecor: 'none' }} to='/start-farm'>
        <Button colorScheme='linear' rounded='30px' w={64} h={12} shadow='md'>
          Start a farm
        </Button>
      </Link>
    </Box>

    <Flex justify='center' align='center' mx='auto' w='80%' my={{ md: 16 }}>
      <Image src={CorporateIllustration} />
    </Flex>
  </Flex>
)

export default NoFarmsCard
